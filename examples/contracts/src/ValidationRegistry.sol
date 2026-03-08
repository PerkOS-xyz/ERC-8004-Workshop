// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IIdentityRegistryV {
    function agentExists(uint256 agentId) external view returns (bool);
    function getAgentOwner(uint256 agentId) external view returns (address);
}

/**
 * @title ValidationRegistry
 * @notice ERC-8004 Validation Registry - Independent verification of agent work
 * @dev Supports multiple validation models: re-execution, stake-based, TEE attestations, zkML
 */
contract ValidationRegistry {
    struct ValidationRequest {
        bytes32 requestHash;       // Unique request identifier
        address requester;         // Who requested validation
        string validationType;     // "re-execution", "stake-based", "tee-attestation", "zkml"
        string requestURI;         // Off-chain request details
        uint256 timestamp;         // When requested
        bool fulfilled;            // Whether validation has been provided
    }
    
    struct ValidationResponse {
        bytes32 requestHash;       // Links to request
        address validator;         // Who validated
        uint8 result;             // 0-100 confidence score
        string responseURI;       // Detailed validation report
        bytes32 responseHash;     // Integrity check
        uint256 timestamp;        // When validated
        uint256 stake;            // Amount staked (if applicable)
    }
    
    // Events
    event ValidationRequested(
        bytes32 indexed requestHash,
        address indexed requester,
        string validationType
    );
    event ValidationSubmitted(
        bytes32 indexed requestHash,
        address indexed validator,
        uint8 result
    );
    event StakeSlashed(
        bytes32 indexed requestHash,
        address indexed validator,
        uint256 amount
    );
    
    // Storage
    mapping(bytes32 => ValidationRequest) public validationRequests;
    mapping(bytes32 => ValidationResponse[]) public validationResponses;
    mapping(address => uint256) public validatorStakes; // For stake-based validation
    mapping(address => uint256) public validatorReputations; // Validator reputation scores
    
    // Configuration
    uint256 public constant MIN_STAKE = 0.1 ether;
    uint256 public constant SLASH_PERCENTAGE = 50; // Slash 50% of stake for bad validation
    
    IIdentityRegistryV public immutable identityRegistry;
    
    constructor(address _identityRegistry) {
        identityRegistry = IIdentityRegistryV(_identityRegistry);
    }
    
    /**
     * @notice Request validation of agent work
     * @param requestHash Unique identifier for this validation request
     * @param validationType Type of validation requested
     * @param requestURI URI pointing to detailed request information
     */
    function requestValidation(
        bytes32 requestHash,
        string calldata validationType,
        string calldata requestURI
    ) external {
        require(validationRequests[requestHash].requester == address(0), "Request already exists");
        require(bytes(validationType).length > 0, "Validation type required");
        require(bytes(requestURI).length > 0, "Request URI required");
        
        validationRequests[requestHash] = ValidationRequest({
            requestHash: requestHash,
            requester: msg.sender,
            validationType: validationType,
            requestURI: requestURI,
            timestamp: block.timestamp,
            fulfilled: false
        });
        
        emit ValidationRequested(requestHash, msg.sender, validationType);
    }
    
    /**
     * @notice Submit validation result
     * @param requestHash The validation request to respond to
     * @param result Confidence score (0-100)
     * @param responseURI URI pointing to detailed validation report
     * @param responseHash Hash of the validation report
     */
    function submitValidation(
        bytes32 requestHash,
        uint8 result,
        string calldata responseURI,
        bytes32 responseHash
    ) external {
        ValidationRequest storage request = validationRequests[requestHash];
        require(request.requester != address(0), "Request does not exist");
        require(result <= 100, "Result must be 0-100");
        require(bytes(responseURI).length > 0, "Response URI required");
        
        // For stake-based validation, check minimum stake
        if (_isStakeBasedValidation(request.validationType)) {
            require(validatorStakes[msg.sender] >= MIN_STAKE, "Insufficient stake");
        }
        
        // Create validation response
        validationResponses[requestHash].push(ValidationResponse({
            requestHash: requestHash,
            validator: msg.sender,
            result: result,
            responseURI: responseURI,
            responseHash: responseHash,
            timestamp: block.timestamp,
            stake: validatorStakes[msg.sender]
        }));
        
        // Update request status
        request.fulfilled = true;
        
        // Update validator reputation based on consensus (simplified)
        _updateValidatorReputation(msg.sender, requestHash);
        
        emit ValidationSubmitted(requestHash, msg.sender, result);
    }
    
    /**
     * @notice Stake tokens to become a validator (for stake-based validation)
     */
    function stakeAsValidator() external payable {
        require(msg.value >= MIN_STAKE, "Minimum stake not met");
        validatorStakes[msg.sender] += msg.value;
    }
    
    /**
     * @notice Unstake tokens (if no active validations)
     * @param amount Amount to unstake
     */
    function unstake(uint256 amount) external {
        require(validatorStakes[msg.sender] >= amount, "Insufficient stake");
        require(_canUnstake(msg.sender), "Cannot unstake with active validations");
        
        validatorStakes[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
    
    /**
     * @notice Slash validator stake for incorrect validation
     * @param requestHash The validation request
     * @param validator The validator to slash
     * @param evidence Evidence of incorrect validation
     */
    function slashValidator(
        bytes32 requestHash,
        address validator,
        string calldata evidence
    ) external {
        // Only request owner can initiate slashing
        require(validationRequests[requestHash].requester == msg.sender, "Only requester can slash");
        
        ValidationResponse[] memory responses = validationResponses[requestHash];
        bool foundValidator = false;
        
        // Find the validator's response
        for (uint256 i = 0; i < responses.length; i++) {
            if (responses[i].validator == validator) {
                foundValidator = true;
                break;
            }
        }
        
        require(foundValidator, "Validator did not respond to this request");
        require(validatorStakes[validator] > 0, "Validator has no stake");
        
        // Slash percentage of stake
        uint256 slashAmount = (validatorStakes[validator] * SLASH_PERCENTAGE) / 100;
        validatorStakes[validator] -= slashAmount;
        
        // Update validator reputation negatively
        if (validatorReputations[validator] >= 10) {
            validatorReputations[validator] -= 10;
        } else {
            validatorReputations[validator] = 0;
        }
        
        emit StakeSlashed(requestHash, validator, slashAmount);
    }
    
    /**
     * @notice Get all validation responses for a request
     * @param requestHash The validation request
     * @return Array of validation responses
     */
    function getValidationResponses(bytes32 requestHash) 
        external 
        view 
        returns (ValidationResponse[] memory) 
    {
        return validationResponses[requestHash];
    }
    
    /**
     * @notice Get consensus result for a validation request
     * @param requestHash The validation request
     * @return Consensus confidence score (0-100)
     */
    function getConsensusResult(bytes32 requestHash) external view returns (uint8) {
        ValidationResponse[] memory responses = validationResponses[requestHash];
        if (responses.length == 0) return 0;
        
        uint256 totalScore = 0;
        uint256 totalWeight = 0;
        
        for (uint256 i = 0; i < responses.length; i++) {
            // Weight by validator reputation and stake
            uint256 weight = validatorReputations[responses[i].validator] + 1;
            if (responses[i].stake > 0) {
                weight += responses[i].stake / MIN_STAKE; // Stake-based weight
            }
            
            totalScore += responses[i].result * weight;
            totalWeight += weight;
        }
        
        return totalWeight > 0 ? uint8(totalScore / totalWeight) : 0;
    }
    
    /**
     * @notice Get validator reputation score
     * @param validator The validator address
     * @return Reputation score
     */
    function getValidatorReputation(address validator) external view returns (uint256) {
        return validatorReputations[validator];
    }
    
    /**
     * @notice Check if validation type is stake-based
     */
    function _isStakeBasedValidation(string memory validationType) internal pure returns (bool) {
        return keccak256(bytes(validationType)) == keccak256(bytes("stake-based"));
    }
    
    /**
     * @notice Check if validator can unstake (simplified)
     */
    function _canUnstake(address validator) internal pure returns (bool) {
        // In production, this would check for active validation commitments
        // For this demo, we always allow unstaking
        return true;
    }
    
    /**
     * @notice Update validator reputation based on consensus (simplified)
     */
    function _updateValidatorReputation(address validator, bytes32 requestHash) internal {
        // Simplified reputation update - in production this would be more sophisticated
        ValidationResponse[] memory responses = validationResponses[requestHash];
        
        if (responses.length >= 3) { // Only update if we have enough responses
            uint8 consensus = this.getConsensusResult(requestHash);
            uint8 validatorResult = 0;
            
            // Find validator's result
            for (uint256 i = 0; i < responses.length; i++) {
                if (responses[i].validator == validator) {
                    validatorResult = responses[i].result;
                    break;
                }
            }
            
            // Update reputation based on how close to consensus
            uint256 difference = validatorResult > consensus ? 
                validatorResult - consensus : consensus - validatorResult;
                
            if (difference <= 5) { // Close to consensus
                validatorReputations[validator] += 1;
            } else if (difference >= 20) { // Far from consensus
                if (validatorReputations[validator] > 0) {
                    validatorReputations[validator] -= 1;
                }
            }
        } else {
            // Early participant bonus
            validatorReputations[validator] += 1;
        }
    }
}