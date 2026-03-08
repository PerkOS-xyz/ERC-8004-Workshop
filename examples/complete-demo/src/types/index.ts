export interface AgentMetadata {
  name: string;
  description: string;
  type: string;
  capabilities: string[];
  endpoint: string;
  version?: string;
  trustModels?: string[];
}

export interface AgentInfo {
  id: number;
  metadata: AgentMetadata;
  metadataUri: string;
  registrationTx: string;
  owner: string;
}

export interface MarketAnalysisRequest {
  pair: string;
  timeframe: string;
  analysisType: string;
  timestamp: number;
}

export interface MarketAnalysisResult {
  pair: string;
  currentPrice: number;
  prediction: {
    direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    confidence: number;
    targetPrice: number;
    timeframe: string;
  };
  recommendation: string;
  reasoning: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  analysisTimestamp: number;
}

export interface ValidationRequest {
  requestHash: string;
  requester: string;
  validationType: string;
  requestUri: string;
  timestamp: number;
}

export interface ValidationResult {
  confidence: number;
  methodologyScore: number;
  dataAccuracy: number;
  reasoningQuality: number;
  report: string;
  validator: string;
  timestamp: number;
}

export interface FeedbackData {
  agentId: number;
  score: number;
  tags: string[];
  reportUri: string;
  client: string;
  timestamp: number;
}

export interface ContractConfig {
  identityRegistry: string;
  reputationRegistry: string;
  validationRegistry: string;
}

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  chainId: number;
  blockExplorer?: string;
}

export interface DemoConfig {
  network: NetworkConfig;
  contracts: ContractConfig;
  privateKey: string;
  demoMode: 'development' | 'testnet' | 'mainnet';
  logLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
}

export interface ContractABI {
  inputs: Array<{
    internalType: string;
    name: string;
    type: string;
  }>;
  name: string;
  outputs?: Array<{
    internalType: string;
    name: string;
    type: string;
  }>;
  stateMutability: 'nonpayable' | 'payable' | 'view' | 'pure';
  type: 'function' | 'event' | 'constructor';
}

export interface TransactionReceipt {
  transactionHash: string;
  blockNumber: number;
  gasUsed: string;
  status: number;
}

export interface EventLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: number;
  transactionHash: string;
  args?: any[];
}