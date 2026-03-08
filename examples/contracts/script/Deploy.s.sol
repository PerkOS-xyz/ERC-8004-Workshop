// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/IdentityRegistry.sol";
import "../src/ReputationRegistry.sol";
import "../src/ValidationRegistry.sol";

contract DeployERC8004 is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy Identity Registry first (other contracts depend on it)
        IdentityRegistry identityRegistry = new IdentityRegistry(
            "ERC8004 Agents",
            "AGENT"
        );
        
        console.log(" IdentityRegistry deployed at:", address(identityRegistry));
        
        // Deploy Reputation Registry
        ReputationRegistry reputationRegistry = new ReputationRegistry(
            address(identityRegistry)
        );
        
        console.log(" ReputationRegistry deployed at:", address(reputationRegistry));
        
        // Deploy Validation Registry
        ValidationRegistry validationRegistry = new ValidationRegistry(
            address(identityRegistry)
        );
        
        console.log(" ValidationRegistry deployed at:", address(validationRegistry));
        
        vm.stopBroadcast();
        
        // Save deployment addresses to file
        string memory deploymentInfo = string(abi.encodePacked(
            "IDENTITY_REGISTRY=", vm.toString(address(identityRegistry)), "\n",
            "REPUTATION_REGISTRY=", vm.toString(address(reputationRegistry)), "\n",
            "VALIDATION_REGISTRY=", vm.toString(address(validationRegistry)), "\n"
        ));
        
        vm.writeFile("deployment.env", deploymentInfo);
        console.log(" Deployment addresses saved to deployment.env");
    }
}