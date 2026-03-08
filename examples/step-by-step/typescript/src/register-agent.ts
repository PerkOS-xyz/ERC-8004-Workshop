#!/usr/bin/env node

import chalk from 'chalk';
import { BlockchainClient } from './blockchain-client';
import { IDENTITY_REGISTRY_ABI } from './contracts';
import { loadConfig } from './config';

interface AgentMetadata {
  name: string;
  description: string;
  type: string;
  capabilities: string[];
  endpoint: string;
  version: string;
}

async function createMetadataUri(metadata: AgentMetadata): Promise<string> {
  // In production, upload to IPFS. For tutorial, use data URI
  const jsonString = JSON.stringify(metadata, null, 2);
  const base64 = Buffer.from(jsonString).toString('base64');
  return `data:application/json;base64,${base64}`;
}

async function registerAgent(): Promise<void> {
  console.log(chalk.blue.bold('🤖 ERC-8004 Agent Registration Tutorial'));
  console.log('=====================================\n');

  try {
    // Load configuration
    const config = loadConfig();
    
    // Initialize blockchain client
    const blockchain = new BlockchainClient(config.rpcUrl, config.privateKey);
    await blockchain.connect();

    // Create agent metadata
    const metadata: AgentMetadata = {
      name: 'My First ERC-8004 Agent',
      description: 'A tutorial agent for learning ERC-8004 standard',
      type: 'tutorial-agent',
      capabilities: ['greeting', 'echo', 'basic-math'],
      endpoint: 'https://my-agent.example.com/webhook',
      version: '1.0.0'
    };

    console.log(chalk.cyan('\n📝 Agent Metadata:'));
    console.log(JSON.stringify(metadata, null, 2));

    // Create metadata URI
    const metadataUri = await createMetadataUri(metadata);
    console.log(chalk.gray(`\n🔗 Metadata URI length: ${metadataUri.length} chars`));

    // Get identity registry contract
    const identityRegistry = blockchain.getContract(
      config.contracts.identityRegistry,
      IDENTITY_REGISTRY_ABI
    );

    // Register the agent
    console.log(chalk.yellow('\n🚀 Registering agent on blockchain...'));
    const receipt = await blockchain.sendTransaction(
      identityRegistry, 
      'register',
      [metadataUri]
    );

    // Parse the registration event to get agent ID
    let agentId: number | null = null;
    for (const log of receipt.logs) {
      try {
        const parsedLog = identityRegistry.interface.parseLog(log);
        if (parsedLog?.name === 'Registered') {
          agentId = Number(parsedLog.args.agentId);
          break;
        }
      } catch (e) {
        // Skip non-matching logs
      }
    }

    if (agentId !== null) {
      console.log(chalk.green.bold(`\n🎉 SUCCESS! Agent registered with ID: ${agentId}`));
      console.log(chalk.gray(`📍 Owner: ${blockchain.getAddress()}`));
      console.log(chalk.gray(`📄 Transaction: ${receipt.hash}`));
      console.log(chalk.gray(`⛽ Gas used: ${receipt.gasUsed}`));

      // Verify registration by reading back the data
      console.log(chalk.cyan('\n🔍 Verifying registration...'));
      const storedUri = await blockchain.callFunction(identityRegistry, 'tokenURI', [agentId]);
      const owner = await blockchain.callFunction(identityRegistry, 'ownerOf', [agentId]);
      
      console.log(chalk.green('✅ Registration verified!'));
      console.log(chalk.gray(`   Agent ID: ${agentId}`));
      console.log(chalk.gray(`   Owner: ${owner}`));
      console.log(chalk.gray(`   Metadata URI matches: ${storedUri === metadataUri}`));

      // Next steps
      console.log(chalk.blue.bold('\n📋 Next Steps:'));
      console.log(chalk.white('1. Run feedback tutorial: npm run feedback'));
      console.log(chalk.white('2. Run validation tutorial: npm run validation')); 
      console.log(chalk.white('3. Run complete flow: npm run test-flow'));
      
    } else {
      console.log(chalk.red('❌ Could not determine agent ID from transaction logs'));
    }

  } catch (error) {
    console.error(chalk.red(`❌ Registration failed: ${error}`));
    console.log(chalk.yellow('\n🔧 Troubleshooting:'));
    console.log(chalk.white('1. Check .env file has correct contract addresses'));
    console.log(chalk.white('2. Ensure Anvil/blockchain is running'));
    console.log(chalk.white('3. Verify wallet has sufficient ETH balance'));
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  registerAgent().catch(console.error);
}

export { registerAgent, createMetadataUri };