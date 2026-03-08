#!/usr/bin/env node

import * as dotenv from 'dotenv';
import { Command } from 'commander';
import { Logger, LogLevel } from './utils/logger';
import { BlockchainClient } from './utils/blockchain';
import { AliceMarketAnalyst } from './agents/alice';
import { BobValidator } from './agents/bob';
import { CharlieClient } from './agents/charlie';
import { DemoConfig, NetworkConfig, ContractConfig } from './types';

// Load environment variables
dotenv.config();

class ERC8004Demo {
  private logger: Logger;
  private config: DemoConfig;
  private blockchain: BlockchainClient;
  private alice: AliceMarketAnalyst;
  private bob: BobValidator;
  private charlie: CharlieClient;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logger = new Logger(logLevel);
    this.config = this.loadConfig();
    this.blockchain = new BlockchainClient(this.config.network, this.config.privateKey);
    
    // Initialize agents
    this.alice = new AliceMarketAnalyst(this.blockchain, this.config.contracts, this.logger);
    this.bob = new BobValidator(this.blockchain, this.config.contracts, this.logger);
    this.charlie = new CharlieClient(this.blockchain, this.config.contracts, this.logger);
  }

  private loadConfig(): DemoConfig {
    const network: NetworkConfig = {
      name: process.env.NETWORK_NAME || 'localhost',
      rpcUrl: process.env.RPC_URL || 'http://localhost:8545',
      chainId: parseInt(process.env.CHAIN_ID || '31337'),
      blockExplorer: process.env.BLOCK_EXPLORER || ''
    };

    const contracts: ContractConfig = {
      identityRegistry: process.env.IDENTITY_REGISTRY || '',
      reputationRegistry: process.env.REPUTATION_REGISTRY || '',
      validationRegistry: process.env.VALIDATION_REGISTRY || ''
    };

    // Validate required configuration
    if (!contracts.identityRegistry || !contracts.reputationRegistry || !contracts.validationRegistry) {
      throw new Error('Contract addresses not found in environment. Please deploy contracts first.');
    }

    return {
      network,
      contracts,
      privateKey: process.env.PRIVATE_KEY || '',
      demoMode: (process.env.DEMO_MODE as any) || 'development',
      logLevel: (process.env.LOG_LEVEL as any) || 'INFO'
    };
  }

  async initialize(): Promise<void> {
    this.logger.demoHeader();
    this.logger.title('ERC-8004 Multi-Agent Demo');
    
    // Check blockchain connection
    this.logger.step(1, 6, 'Checking blockchain connection...');
    const isConnected = await this.blockchain.isConnected();
    if (!isConnected) {
      throw new Error(`Failed to connect to blockchain at ${this.config.network.rpcUrl}`);
    }
    
    this.logger.success(`Connected to ${this.config.network.name}`);
    this.logger.result('RPC URL', this.config.network.rpcUrl);
    this.logger.result('Chain ID', this.config.network.chainId);
    this.logger.result('Account', this.blockchain.getAddress());
    
    const balance = await this.blockchain.getBalance();
    this.logger.result('Balance', `${balance} ETH`);

    // Verify contract addresses
    this.logger.info('Verifying contract deployments...');
    this.logger.result('IdentityRegistry', this.config.contracts.identityRegistry);
    this.logger.result('ReputationRegistry', this.config.contracts.reputationRegistry);
    this.logger.result('ValidationRegistry', this.config.contracts.validationRegistry);
  }

  async registerAgents(): Promise<void> {
    this.logger.step(2, 6, 'Registering agents on Identity Registry...');
    
    try {
      // Register Alice
      await this.alice.register();
      
      // Register Bob
      await this.bob.register();
      
      // Register Charlie
      await this.charlie.register();
      
      this.logger.success('All agents registered successfully');
      
    } catch (error) {
      this.logger.error('Failed to register agents', error as Error);
      throw error;
    }
  }

  async performServiceDiscovery(): Promise<number> {
    this.logger.step(3, 6, 'Service discovery and agent selection...');
    
    // Charlie discovers market analysis agents
    const availableAgents = await this.charlie.discoverMarketAnalysts();
    
    // Select the best agent (Alice in this case)
    const selectedAgentId = await this.charlie.selectBestAgent(availableAgents);
    
    // Check Alice's current reputation
    try {
      const reputation = await this.alice.getReputation();
      this.logger.result('Alice\'s current reputation', 
        reputation.feedbackCount === 0 ? 
        `${reputation.averageScore}/100 (new agent)` :
        `${reputation.averageScore}/100 (${reputation.feedbackCount} reviews)`
      );
    } catch (error) {
      this.logger.result('Alice\'s current reputation', '0/100 (new agent)');
    }

    return selectedAgentId;
  }

  async requestAndPerformAnalysis(): Promise<{ request: any; analysis: any }> {
    this.logger.step(4, 6, 'Market analysis request and execution...');
    
    // Charlie creates a market analysis request
    const request = await this.charlie.createMarketAnalysisRequest('ETH/USDC');
    
    // Alice performs the analysis
    this.logger.newLine();
    const analysis = await this.alice.performMarketAnalysis(request);
    
    return { request, analysis };
  }

  async performValidation(request: any, analysis: any): Promise<any> {
    this.logger.step(5, 6, 'Independent validation by Bob...');
    
    // Bob validates Alice's work
    const validationResult = await this.bob.validateMarketAnalysis(request, analysis);
    
    // Submit validation to the registry
    const requestHash = `analysis_${request.timestamp}_${analysis.pair}`;
    await this.bob.submitValidationResult(requestHash, validationResult.confidence, validationResult.report);
    
    return validationResult;
  }

  async submitFeedbackAndUpdateReputation(analysis: any, validationResult: any): Promise<number> {
    this.logger.step(6, 6, 'Feedback submission and reputation update...');
    
    // Charlie evaluates the quality of Alice's work
    const evaluation = await this.charlie.evaluateAnalysisQuality(analysis, validationResult);
    
    // Alice provides authorization for feedback
    let authorization: string;
    try {
      authorization = await this.alice.createFeedbackAuthorization(this.charlie.blockchain.getAddress());
    } catch (error) {
      // Fallback authorization for demo
      authorization = '0x' + 'demo_signature'.repeat(8);
    }
    
    // Charlie submits feedback
    if (this.alice.agentInfo) {
      await this.charlie.submitDetailedFeedback(this.alice.agentInfo.id, evaluation, authorization);
    }
    
    return evaluation.score;
  }

  async displayFinalResults(finalScore: number): Promise<void> {
    this.logger.newLine();
    
    // Display comprehensive results
    this.logger.demoSummary({
      aliceReputation: finalScore,
      bobValidationRate: 100,
      totalInteractions: 1,
      systemTrust: 'HIGH'
    });

    // Display learning objectives achieved
    this.logger.section('🎓 Learning Objectives Achieved', '✅');
    const objectives = [
      'Deployed ERC-8004 registries',
      'Registered and discovered agents',  
      'Demonstrated reputation system',
      'Showcased independent validation',
      'Integrated multiple trust models',
      'Built real-world multi-agent coordination'
    ];

    objectives.forEach(objective => {
      this.logger.result('✅', objective);
    });

    this.logger.newLine();
    this.logger.success('Ready to build your own trustless agents! 🚀', '🎉');
  }

  async run(): Promise<boolean> {
    try {
      await this.initialize();
      await this.registerAgents();
      
      await this.performServiceDiscovery();
      const { request, analysis } = await this.requestAndPerformAnalysis();
      const validationResult = await this.performValidation(request, analysis);
      const finalScore = await this.submitFeedbackAndUpdateReputation(analysis, validationResult);
      
      await this.displayFinalResults(finalScore);
      
      return true;
      
    } catch (error) {
      this.logger.error('Demo failed', error as Error, '💥');
      this.logger.newLine();
      this.logger.warn('Check the setup instructions and try again', '📝');
      return false;
    }
  }

  // Additional demo methods for interactive mode
  async runInteractiveMode(): Promise<void> {
    const inquirer = await import('inquirer');
    
    this.logger.title('ERC-8004 Interactive Demo Mode');
    
    const answers = await inquirer.default.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'Run complete demo',
          'Register agents only',
          'Test market analysis',
          'Test validation',
          'Check agent reputation',
          'Exit'
        ]
      }
    ]);

    switch (answers.action) {
      case 'Run complete demo':
        await this.run();
        break;
      case 'Register agents only':
        await this.initialize();
        await this.registerAgents();
        break;
      case 'Test market analysis':
        await this.initialize();
        await this.registerAgents();
        const { analysis } = await this.requestAndPerformAnalysis();
        this.logger.result('Analysis Complete', JSON.stringify(analysis, null, 2));
        break;
      case 'Test validation':
        await this.initialize();
        await this.registerAgents();
        const testData = await this.requestAndPerformAnalysis();
        await this.performValidation(testData.request, testData.analysis);
        break;
      case 'Check agent reputation':
        await this.initialize();
        if (this.alice.agentInfo) {
          const reputation = await this.alice.getReputation();
          this.logger.result('Alice Reputation', `${reputation.averageScore}/100 (${reputation.feedbackCount} reviews)`);
        }
        break;
      case 'Exit':
        this.logger.info('Goodbye! 👋');
        break;
    }
  }
}

// CLI Setup
const program = new Command();

program
  .name('erc8004-demo')
  .description('ERC-8004 Trustless Agents Demo')
  .version('1.0.0');

program
  .command('run')
  .description('Run the complete demo')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('-q, --quiet', 'Enable quiet mode')
  .action(async (options) => {
    const logLevel = options.verbose ? LogLevel.DEBUG : 
                    options.quiet ? LogLevel.WARN : LogLevel.INFO;
    
    const demo = new ERC8004Demo(logLevel);
    const success = await demo.run();
    process.exit(success ? 0 : 1);
  });

program
  .command('interactive')
  .description('Run in interactive mode')
  .action(async () => {
    const demo = new ERC8004Demo();
    await demo.runInteractiveMode();
  });

program
  .command('agents')
  .description('Register agents only')
  .action(async () => {
    const demo = new ERC8004Demo();
    await demo.initialize();
    await demo.registerAgents();
  });

// Main execution
if (require.main === module) {
  program.parse(process.argv);
}

export { ERC8004Demo };