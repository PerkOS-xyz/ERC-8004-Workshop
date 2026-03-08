import { ethers } from 'ethers';
import { BlockchainClient } from '../utils/blockchain';
import { Logger } from '../utils/logger';
import { AgentMetadata, AgentInfo, ContractConfig } from '../types';

export abstract class BaseAgent {
  public blockchain: BlockchainClient;
  protected logger: Logger;
  protected contracts: ContractConfig;
  public agentInfo?: AgentInfo;

  constructor(
    blockchain: BlockchainClient,
    contracts: ContractConfig,
    logger: Logger = new Logger()
  ) {
    this.blockchain = blockchain;
    this.contracts = contracts;
    this.logger = logger;
  }

  abstract getMetadata(): AgentMetadata;

  async register(): Promise<number> {
    const metadata = this.getMetadata();
    const metadataUri = this.createMetadataUri(metadata);
    
    this.logger.info(`Registering ${metadata.name}...`);

    try {
      const identityContract = this.blockchain.getContract(
        this.contracts.identityRegistry,
        BlockchainClient.getContractABI('IdentityRegistry')
      );

      const receipt = await this.blockchain.sendTransaction(
        identityContract,
        'register',
        [metadataUri]
      );

      // Get agent ID from events (simplified - in production, parse logs properly)
      const agentId = await this.getNextAgentId() - 1;

      this.agentInfo = {
        id: agentId,
        metadata,
        metadataUri,
        registrationTx: receipt.transactionHash,
        owner: this.blockchain.getAddress()
      };

      this.logger.success(`${metadata.name} registered with ID: ${agentId}`);
      this.logger.transaction(receipt.transactionHash);
      this.logger.gasUsed(receipt.gasUsed);

      return agentId;
    } catch (error) {
      this.logger.error(`Failed to register ${metadata.name}`, error as Error);
      throw error;
    }
  }

  protected async getNextAgentId(): Promise<number> {
    // In production, this would query the identity registry contract
    // For now, we'll use a simple counter approach
    return Date.now() % 10000; // Simplified for demo
  }

  protected createMetadataUri(metadata: AgentMetadata): string {
    // In production, this would upload to IPFS or other decentralized storage
    const encodedMetadata = Buffer.from(JSON.stringify(metadata)).toString('base64');
    return `data:application/json;base64,${encodedMetadata}`;
  }

  async getReputation(): Promise<{ averageScore: number; feedbackCount: number }> {
    if (!this.agentInfo) {
      throw new Error('Agent not registered');
    }

    try {
      const reputationContract = this.blockchain.getContract(
        this.contracts.reputationRegistry,
        BlockchainClient.getContractABI('ReputationRegistry')
      );

      const [averageScore, feedbackCount] = await Promise.all([
        this.blockchain.callFunction(reputationContract, 'getAverageScore', [this.agentInfo.id]),
        this.blockchain.callFunction(reputationContract, 'getFeedbackCount', [this.agentInfo.id])
      ]);

      return {
        averageScore: Number(averageScore),
        feedbackCount: Number(feedbackCount)
      };
    } catch (error) {
      this.logger.error(`Failed to get reputation for agent ${this.agentInfo.id}`, error as Error);
      throw error;
    }
  }

  async createFeedbackAuthorization(clientAddress: string): Promise<string> {
    if (!this.agentInfo) {
      throw new Error('Agent not registered');
    }

    // Create a message for the client to use when submitting feedback
    const timestamp = Math.floor(Date.now() / 1000);
    const message = `feedback_${this.agentInfo.id}_${clientAddress}_${timestamp}`;
    
    try {
      const signature = await this.blockchain.signMessage(message);
      this.logger.debug(`Created feedback authorization for client ${clientAddress}`);
      return signature;
    } catch (error) {
      this.logger.error('Failed to create feedback authorization', error as Error);
      throw error;
    }
  }

  async submitFeedbackAsClient(
    targetAgentId: number, 
    score: number, 
    tags: string[],
    authorization: string
  ): Promise<void> {
    if (score < 0 || score > 100) {
      throw new Error('Score must be between 0 and 100');
    }

    this.logger.info(`Submitting feedback for agent ${targetAgentId}...`);

    try {
      const reputationContract = this.blockchain.getContract(
        this.contracts.reputationRegistry,
        BlockchainClient.getContractABI('ReputationRegistry')
      );

      const reportContent = {
        score,
        tags,
        timestamp: Date.now(),
        reviewer: this.agentInfo?.metadata.name || 'Anonymous'
      };

      const reportUri = `data:application/json;base64,${Buffer.from(JSON.stringify(reportContent)).toString('base64')}`;
      const reportHash = BlockchainClient.hashString(JSON.stringify(reportContent));

      const receipt = await this.blockchain.sendTransaction(
        reputationContract,
        'submitFeedback',
        [
          targetAgentId,
          score,
          tags,
          reportUri,
          reportHash,
          authorization
        ]
      );

      this.logger.success(`Feedback submitted: ${score}/100`);
      this.logger.result('Tags', tags.join(', '));
      this.logger.transaction(receipt.transactionHash);
      this.logger.gasUsed(receipt.gasUsed);

    } catch (error) {
      this.logger.error(`Failed to submit feedback for agent ${targetAgentId}`, error as Error);
      // Note: This might fail due to authorization verification in a real implementation
      this.logger.warn('Note: Feedback submission simulated (authorization verification might fail in real contracts)');
    }
  }

  async requestValidation(requestHash: string, validationType: string = 're-execution'): Promise<void> {
    this.logger.info(`Requesting ${validationType} validation...`);

    try {
      const validationContract = this.blockchain.getContract(
        this.contracts.validationRegistry,
        BlockchainClient.getContractABI('ValidationRegistry')
      );

      const requestUri = `data:application/json;base64,${Buffer.from(JSON.stringify({
        requestHash,
        requestedBy: this.agentInfo?.metadata.name || 'Unknown',
        timestamp: Date.now()
      })).toString('base64')}`;

      const receipt = await this.blockchain.sendTransaction(
        validationContract,
        'requestValidation',
        [ethers.keccak256(ethers.toUtf8Bytes(requestHash)), validationType, requestUri]
      );

      this.logger.success('Validation requested');
      this.logger.transaction(receipt.transactionHash);
      this.logger.gasUsed(receipt.gasUsed);

    } catch (error) {
      this.logger.error('Failed to request validation', error as Error);
      throw error;
    }
  }

  async submitValidationResult(
    requestHash: string, 
    confidence: number, 
    report: string
  ): Promise<void> {
    if (confidence < 0 || confidence > 100) {
      throw new Error('Confidence must be between 0 and 100');
    }

    this.logger.info(`Submitting validation result (${confidence}% confidence)...`);

    try {
      const validationContract = this.blockchain.getContract(
        this.contracts.validationRegistry,
        BlockchainClient.getContractABI('ValidationRegistry')
      );

      const responseContent = {
        confidence,
        report,
        validator: this.agentInfo?.metadata.name || 'Unknown',
        timestamp: Date.now()
      };

      const responseUri = `data:application/json;base64,${Buffer.from(JSON.stringify(responseContent)).toString('base64')}`;
      const responseHash = BlockchainClient.hashString(JSON.stringify(responseContent));

      const receipt = await this.blockchain.sendTransaction(
        validationContract,
        'submitValidation',
        [
          ethers.keccak256(ethers.toUtf8Bytes(requestHash)),
          confidence,
          responseUri,
          responseHash
        ]
      );

      this.logger.success(`Validation submitted: ${confidence}% confidence`);
      this.logger.transaction(receipt.transactionHash);
      this.logger.gasUsed(receipt.gasUsed);

    } catch (error) {
      this.logger.error('Failed to submit validation result', error as Error);
      throw error;
    }
  }

  // Utility method for simulating work with delays
  protected async simulateWork(description: string, durationMs: number = 2000): Promise<void> {
    const stopLoading = this.logger.loading(description);
    await new Promise(resolve => setTimeout(resolve, durationMs));
    stopLoading();
  }
}