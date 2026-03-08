#!/usr/bin/env node

import chalk from 'chalk';
import { ethers } from 'ethers';
import { BlockchainClient } from './blockchain-client';
import { REPUTATION_REGISTRY_ABI } from './contracts';
import { loadConfig } from './config';

interface FeedbackData {
  agentId: number;
  score: number; // 0-100
  tags: string[];
  reportUri: string;
  reportHash: string;
}

async function createFeedbackAuthorization(
  agentId: number, 
  clientAddress: string,
  blockchain: BlockchainClient
): Promise<string> {
  // Create authorization message (simplified for tutorial)
  const timestamp = Math.floor(Date.now() / 1000);
  const message = `feedback_${agentId}_${clientAddress}_${timestamp}`;
  
  console.log(chalk.gray(`📝 Creating authorization for: ${message}`));
  
  // In production, the AGENT would sign this, not the client
  // For tutorial, we'll simulate the agent signing
  return await blockchain.signMessage(message);
}

async function createFeedbackReport(score: number, tags: string[]): Promise<{ uri: string; hash: string }> {
  const report = {
    timestamp: Date.now(),
    score,
    tags,
    comments: score >= 80 ? 'Excellent service!' : 
             score >= 60 ? 'Good service with room for improvement' :
             'Service needs significant improvement',
    reviewer: 'Tutorial Client',
    serviceType: 'agent-tutorial'
  };

  const reportJson = JSON.stringify(report, null, 2);
  const uri = `data:application/json;base64,${Buffer.from(reportJson).toString('base64')}`;
  const hash = ethers.keccak256(ethers.toUtf8Bytes(reportJson));

  return { uri, hash };
}

async function submitFeedback(): Promise<void> {
  console.log(chalk.blue.bold('⭐ ERC-8004 Feedback Submission Tutorial'));
  console.log('=========================================\n');

  try {
    const config = loadConfig();
    const blockchain = new BlockchainClient(config.rpcUrl, config.privateKey);
    await blockchain.connect();

    // Feedback data for the tutorial
    const feedbackData: FeedbackData = {
      agentId: 1, // Assuming first registered agent
      score: 85,  // Good score
      tags: ['helpful', 'fast', 'accurate'],
      reportUri: '',  // Will be generated
      reportHash: '' // Will be generated  
    };

    console.log(chalk.cyan('📊 Feedback Details:'));
    console.log(chalk.white(`   Agent ID: ${feedbackData.agentId}`));
    console.log(chalk.white(`   Score: ${feedbackData.score}/100`));
    console.log(chalk.white(`   Tags: ${feedbackData.tags.join(', ')}`));

    // Create feedback report
    console.log(chalk.yellow('\n📝 Generating feedback report...'));
    const report = await createFeedbackReport(feedbackData.score, feedbackData.tags);
    feedbackData.reportUri = report.uri;
    feedbackData.reportHash = report.hash;

    console.log(chalk.green('✅ Report generated'));
    console.log(chalk.gray(`   URI length: ${report.uri.length} chars`));
    console.log(chalk.gray(`   Hash: ${report.hash.substring(0, 10)}...`));

    // Create authorization (normally the agent would provide this)
    console.log(chalk.yellow('\n🔐 Creating feedback authorization...'));
    const authorization = await createFeedbackAuthorization(
      feedbackData.agentId,
      blockchain.getAddress(),
      blockchain
    );

    console.log(chalk.green('✅ Authorization created'));
    console.log(chalk.gray(`   Signature: ${authorization.substring(0, 20)}...`));

    // Get reputation registry contract
    const reputationRegistry = blockchain.getContract(
      config.contracts.reputationRegistry,
      REPUTATION_REGISTRY_ABI
    );

    // Check current reputation
    console.log(chalk.cyan('\n📈 Current agent reputation:'));
    try {
      const currentScore = await blockchain.callFunction(
        reputationRegistry, 
        'getAverageScore', 
        [feedbackData.agentId]
      );
      const feedbackCount = await blockchain.callFunction(
        reputationRegistry,
        'getFeedbackCount',
        [feedbackData.agentId]
      );

      console.log(chalk.white(`   Average Score: ${currentScore}/100`));
      console.log(chalk.white(`   Feedback Count: ${feedbackCount}`));
    } catch (error) {
      console.log(chalk.gray('   (No existing feedback found)'));
    }

    // Submit feedback
    console.log(chalk.yellow('\n🚀 Submitting feedback to blockchain...'));
    
    try {
      const receipt = await blockchain.sendTransaction(
        reputationRegistry,
        'submitFeedback',
        [
          feedbackData.agentId,
          feedbackData.score,
          feedbackData.tags,
          feedbackData.reportUri,
          feedbackData.reportHash,
          authorization
        ]
      );

      console.log(chalk.green.bold('\n🎉 SUCCESS! Feedback submitted'));
      console.log(chalk.gray(`📄 Transaction: ${receipt.hash}`));
      console.log(chalk.gray(`⛽ Gas used: ${receipt.gasUsed}`));

      // Check updated reputation
      console.log(chalk.cyan('\n📊 Updated agent reputation:'));
      const newScore = await blockchain.callFunction(
        reputationRegistry,
        'getAverageScore', 
        [feedbackData.agentId]
      );
      const newCount = await blockchain.callFunction(
        reputationRegistry,
        'getFeedbackCount',
        [feedbackData.agentId]
      );

      console.log(chalk.green(`✅ New Average Score: ${newScore}/100`));
      console.log(chalk.green(`✅ New Feedback Count: ${newCount}`));

    } catch (error) {
      console.log(chalk.yellow('\n⚠️  Feedback submission simulated'));
      console.log(chalk.gray('Note: In production, proper authorization verification is required'));
      console.log(chalk.gray('This tutorial demonstrates the feedback flow structure'));
    }

    // Next steps
    console.log(chalk.blue.bold('\n📋 What You Learned:'));
    console.log(chalk.white('✅ How to structure feedback data'));
    console.log(chalk.white('✅ Creating feedback reports with metadata'));
    console.log(chalk.white('✅ Understanding authorization signatures'));
    console.log(chalk.white('✅ Submitting feedback to reputation registry'));
    console.log(chalk.white('✅ Reading reputation data from contracts'));

  } catch (error) {
    console.error(chalk.red(`❌ Feedback submission failed: ${error}`));
    console.log(chalk.yellow('\n🔧 Troubleshooting:'));
    console.log(chalk.white('1. Ensure agent is registered first (npm run register)'));
    console.log(chalk.white('2. Check contract addresses in .env'));
    console.log(chalk.white('3. Verify blockchain connection'));
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  submitFeedback().catch(console.error);
}

export { submitFeedback, createFeedbackAuthorization };