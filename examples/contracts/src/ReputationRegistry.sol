// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title ReputationRegistry  
 * @notice ERC-8004 Reputation Registry - Structured feedback system with spam protection
 * @dev Clients submit feedback using signed authorizations from agents
 */
contract ReputationRegistry {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;
    
    struct FeedbackEntry {
        uint256 agentId;        // Target agent
        address client;         // Who gave feedback
        uint8 score;           // 0-100 rating
        string[] tags;         // Context labels
        string reportURI;      // Detailed off-chain report
        bytes32 reportHash;    // Integrity check
        uint256 timestamp;     // When feedback was given
        bool revoked;          // Can be revoked if disputed
    }
    
    // Events
    event FeedbackSubmitted(
        uint256 indexed agentId,
        address indexed client,
        uint8 score,
        uint256 feedbackId
    );
    event FeedbackRevoked(uint256 indexed feedbackId, string reason);
    
    // Storage
    FeedbackEntry[] public feedbackEntries;
    mapping(uint256 => uint256[]) public agentFeedback; // agentId => feedbackIds[]
    mapping(bytes32 => bool) public usedAuthorizations; // Prevent replay attacks
    
    // Interface for Identity Registry
    interface IIdentityRegistry {
        function getAgentOwner(uint256 agentId) external view returns (address);
        function agentExists(uint256 agentId) external view returns (bool);
    }
    
    IIdentityRegistry public immutable identityRegistry;
    
    constructor(address _identityRegistry) {
        identityRegistry = IIdentityRegistry(_identityRegistry);
    }
    
    /**
     * @notice Submit feedback for an agent with signed authorization
     * @param agentId Target agent ID
     * @param score Rating from 0-100
     * @param tags Context labels for the feedback
     * @param reportURI URI pointing to detailed feedback report
     * @param reportHash Hash of the report content for integrity
     * @param authorization Signed authorization from the agent
     */
    function submitFeedback(
        uint256 agentId,
        uint8 score,
        string[] calldata tags,
        string calldata reportURI,
        bytes32 reportHash,
        bytes calldata authorization
    ) external {
        require(identityRegistry.agentExists(agentId), "Agent does not exist");
        require(score <= 100, "Score must be 0-100");
        
        // Verify signed authorization from agent
        bytes32 authHash = _getAuthorizationHash(agentId, msg.sender, block.timestamp);
        require(!usedAuthorizations[authHash], "Authorization already used");
        require(_verifyAuthorization(agentId, authHash, authorization), "Invalid authorization");
        
        // Mark authorization as used
        usedAuthorizations[authHash] = true;
        
        // Create feedback entry
        uint256 feedbackId = feedbackEntries.length;
        feedbackEntries.push(FeedbackEntry({
            agentId: agentId,
            client: msg.sender,
            score: score,
            tags: tags,
            reportURI: reportURI,
            reportHash: reportHash,
            timestamp: block.timestamp,
            revoked: false
        }));
        
        // Add to agent's feedback list
        agentFeedback[agentId].push(feedbackId);
        
        emit FeedbackSubmitted(agentId, msg.sender, score, feedbackId);
    }
    
    /**
     * @notice Revoke feedback (only agent owner can revoke)
     * @param feedbackId The feedback entry to revoke
     * @param reason Reason for revocation
     */
    function revokeFeedback(uint256 feedbackId, string calldata reason) external {
        require(feedbackId < feedbackEntries.length, "Feedback does not exist");
        
        FeedbackEntry storage feedback = feedbackEntries[feedbackId];
        require(!feedback.revoked, "Feedback already revoked");
        
        // Only agent owner can revoke feedback about their agent
        address agentOwner = identityRegistry.getAgentOwner(feedback.agentId);
        require(msg.sender == agentOwner, "Only agent owner can revoke");
        
        feedback.revoked = true;
        emit FeedbackRevoked(feedbackId, reason);
    }
    
    /**
     * @notice Get average score for an agent
     * @param agentId The agent ID
     * @return Average score (0-100) excluding revoked feedback
     */
    function getAverageScore(uint256 agentId) external view returns (uint256) {
        uint256[] memory feedbackIds = agentFeedback[agentId];
        if (feedbackIds.length == 0) return 0;
        
        uint256 totalScore = 0;
        uint256 validFeedback = 0;
        
        for (uint256 i = 0; i < feedbackIds.length; i++) {
            FeedbackEntry memory feedback = feedbackEntries[feedbackIds[i]];
            if (!feedback.revoked) {
                totalScore += feedback.score;
                validFeedback++;
            }
        }
        
        return validFeedback > 0 ? totalScore / validFeedback : 0;
    }
    
    /**
     * @notice Get feedback count for an agent  
     * @param agentId The agent ID
     * @return Total feedback count (including revoked)
     */
    function getFeedbackCount(uint256 agentId) external view returns (uint256) {
        return agentFeedback[agentId].length;
    }
    
    /**
     * @notice Get active (non-revoked) feedback count for an agent
     * @param agentId The agent ID  
     * @return Active feedback count
     */
    function getActiveFeedbackCount(uint256 agentId) external view returns (uint256) {
        uint256[] memory feedbackIds = agentFeedback[agentId];
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < feedbackIds.length; i++) {
            if (!feedbackEntries[feedbackIds[i]].revoked) {
                activeCount++;
            }
        }
        
        return activeCount;
    }
    
    /**
     * @notice Get all feedback IDs for an agent
     * @param agentId The agent ID
     * @return Array of feedback IDs
     */
    function getAgentFeedbackIds(uint256 agentId) external view returns (uint256[] memory) {
        return agentFeedback[agentId];
    }
    
    /**
     * @notice Get feedback entry details
     * @param feedbackId The feedback ID
     * @return Full feedback entry
     */
    function getFeedback(uint256 feedbackId) external view returns (FeedbackEntry memory) {
        require(feedbackId < feedbackEntries.length, "Feedback does not exist");
        return feedbackEntries[feedbackId];
    }
    
    /**
     * @dev Generate authorization hash for signature verification
     */
    function _getAuthorizationHash(
        uint256 agentId,
        address client,
        uint256 timestamp
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(agentId, client, timestamp));
    }
    
    /**
     * @dev Verify that authorization was signed by agent owner
     */
    function _verifyAuthorization(
        uint256 agentId,
        bytes32 authHash,
        bytes memory signature
    ) internal view returns (bool) {
        address agentOwner = identityRegistry.getAgentOwner(agentId);
        address recoveredSigner = authHash.toEthSignedMessageHash().recover(signature);
        return recoveredSigner == agentOwner;
    }
}