// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title IdentityRegistry
 * @notice ERC-8004 Identity Registry - Portable agent identifiers based on ERC-721
 * @dev Each agent gets an NFT token that resolves to their registration metadata
 */
contract IdentityRegistry is ERC721URIStorage, Ownable {
    uint256 private _nextAgentId = 1;
    
    // Events
    event Registered(uint256 indexed agentId, string tokenURI, address indexed owner);
    event MetadataSet(uint256 indexed agentId, string indexed key, bytes value);
    
    // Optional on-chain metadata storage (agentId => key => bytes)
    mapping(uint256 => mapping(string => bytes)) private _metadata;
    
    constructor(string memory name_, string memory symbol_) 
        ERC721(name_, symbol_) 
        Ownable(msg.sender)
    {}
    
    /**
     * @notice Register a new agent identity
     * @param tokenURI_ URI pointing to agent registration file (JSON)
     * @return agentId The unique ID assigned to this agent
     */
    function register(string calldata tokenURI_) external returns (uint256) {
        require(bytes(tokenURI_).length > 0, "TokenURI cannot be empty");
        
        uint256 agentId = _nextAgentId++;
        _safeMint(msg.sender, agentId);
        _setTokenURI(agentId, tokenURI_);
        
        emit Registered(agentId, tokenURI_, msg.sender);
        return agentId;
    }
    
    /**
     * @notice Set optional on-chain metadata for an agent
     * @param agentId The agent ID
     * @param key Metadata key
     * @param value Metadata value (encoded bytes)
     */
    function setMetadata(
        uint256 agentId, 
        string calldata key, 
        bytes calldata value
    ) external {
        require(
            ownerOf(agentId) == msg.sender || 
            getApproved(agentId) == msg.sender || 
            isApprovedForAll(ownerOf(agentId), msg.sender), 
            "Not authorized"
        );
        
        _metadata[agentId][key] = value;
        emit MetadataSet(agentId, key, value);
    }
    
    /**
     * @notice Get on-chain metadata for an agent
     * @param agentId The agent ID
     * @param key Metadata key
     * @return Metadata value
     */
    function getMetadata(
        uint256 agentId, 
        string calldata key
    ) external view returns (bytes memory) {
        return _metadata[agentId][key];
    }
    
    /**
     * @notice Check if an agent ID exists
     * @param agentId The agent ID to check
     * @return True if the agent exists
     */
    function agentExists(uint256 agentId) external view returns (bool) {
        return _ownerOf(agentId) != address(0);
    }
    
    /**
     * @notice Get the owner of an agent
     * @param agentId The agent ID
     * @return The owner address
     */
    function getAgentOwner(uint256 agentId) external view returns (address) {
        return ownerOf(agentId);
    }
    
    /**
     * @notice Get the next agent ID that will be assigned
     * @return The next agent ID
     */
    function getNextAgentId() external view returns (uint256) {
        return _nextAgentId;
    }
    
    /**
     * @notice Update the token URI for an agent (only owner/approved)
     * @param agentId The agent ID
     * @param tokenURI_ New token URI
     */
    function updateTokenURI(uint256 agentId, string calldata tokenURI_) external {
        require(
            ownerOf(agentId) == msg.sender || 
            getApproved(agentId) == msg.sender || 
            isApprovedForAll(ownerOf(agentId), msg.sender), 
            "Not authorized"
        );
        require(bytes(tokenURI_).length > 0, "TokenURI cannot be empty");
        
        _setTokenURI(agentId, tokenURI_);
    }
}