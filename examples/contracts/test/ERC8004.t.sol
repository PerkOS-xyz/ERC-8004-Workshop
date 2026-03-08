// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/IdentityRegistry.sol";
import "../src/ReputationRegistry.sol";
import "../src/ValidationRegistry.sol";

contract ERC8004Test is Test {
    IdentityRegistry identityRegistry;
    ReputationRegistry reputationRegistry;
    ValidationRegistry validationRegistry;
    
    address alice = address(0x1);
    address bob = address(0x2);
    address charlie = address(0x3);
    
    function setUp() public {
        // Deploy contracts
        identityRegistry = new IdentityRegistry("ERC8004 Agents", "AGENT");
        reputationRegistry = new ReputationRegistry(address(identityRegistry));
        validationRegistry = new ValidationRegistry(address(identityRegistry));
        
        // Setup test accounts with ETH
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
        vm.deal(charlie, 10 ether);
    }
    
    function testAgentRegistration() public {
        vm.startPrank(alice);
        
        string memory metadataUri = "https://example.com/alice.json";
        uint256 agentId = identityRegistry.register(metadataUri);
        
        assertEq(agentId, 1);
        assertEq(identityRegistry.ownerOf(agentId), alice);
        assertEq(identityRegistry.tokenURI(agentId), metadataUri);
        assertTrue(identityRegistry.agentExists(agentId));
        
        vm.stopPrank();
    }
    
    function testMultipleAgentRegistration() public {
        // Alice registers
        vm.prank(alice);
        uint256 aliceId = identityRegistry.register("https://alice.com/metadata.json");
        
        // Bob registers
        vm.prank(bob);
        uint256 bobId = identityRegistry.register("https://bob.com/metadata.json");
        
        assertEq(aliceId, 1);
        assertEq(bobId, 2);
        assertEq(identityRegistry.ownerOf(aliceId), alice);
        assertEq(identityRegistry.ownerOf(bobId), bob);
    }
    
    function testReputationSystem() public {
        // First register an agent
        vm.prank(alice);
        uint256 agentId = identityRegistry.register("https://alice.com/metadata.json");
        
        // Initial reputation should be 0
        assertEq(reputationRegistry.getAverageScore(agentId), 0);
        assertEq(reputationRegistry.getFeedbackCount(agentId), 0);
        
        // TODO: Test feedback submission (requires authorization signature)
        // This would need proper signature generation in the test
    }
    
    function testValidationSystem() public {
        // Register validator
        vm.prank(bob);
        uint256 validatorId = identityRegistry.register("https://bob.com/validator.json");
        
        // Test validation request
        bytes32 requestHash = keccak256("test_request");
        string memory validationType = "re-execution";
        string memory requestUri = "https://example.com/request.json";
        
        vm.prank(charlie);
        validationRegistry.requestValidation(requestHash, validationType, requestUri);
        
        // Test validation submission
        vm.prank(bob);
        validationRegistry.submitValidation(
            requestHash,
            85, // confidence score
            "https://example.com/response.json",
            keccak256("validation_report")
        );
        
        // Check consensus result
        uint8 consensus = validationRegistry.getConsensusResult(requestHash);
        assertEq(consensus, 85);
    }
    
    function testStakeBasedValidation() public {
        // Register as validator with stake
        vm.prank(bob);
        validationRegistry.stakeAsValidator{value: 1 ether}();
        
        // Check validator has stake
        // Note: This would require exposing validatorStakes mapping or adding getter
        // For now, just test that the function doesn't revert
    }
    
    function testFailInvalidTokenURI() public {
        vm.prank(alice);
        // Should revert with empty token URI
        identityRegistry.register("");
    }
    
    function testFailUnauthorizedAccess() public {
        vm.prank(alice);
        uint256 agentId = identityRegistry.register("https://alice.com/metadata.json");
        
        vm.prank(bob);
        // Should revert - bob cannot update Alice's metadata
        identityRegistry.updateTokenURI(agentId, "https://malicious.com/metadata.json");
    }
}