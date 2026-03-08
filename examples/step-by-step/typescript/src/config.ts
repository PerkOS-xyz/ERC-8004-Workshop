import * as dotenv from 'dotenv';
dotenv.config();

export interface Config {
  rpcUrl: string;
  privateKey: string;
  contracts: {
    identityRegistry: string;
    reputationRegistry: string;
    validationRegistry: string;
  };
}

export function loadConfig(): Config {
  const requiredVars = [
    'RPC_URL',
    'PRIVATE_KEY', 
    'IDENTITY_REGISTRY',
    'REPUTATION_REGISTRY',
    'VALIDATION_REGISTRY'
  ];

  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}\nCopy .env.example to .env and fill in the values.`);
  }

  return {
    rpcUrl: process.env.RPC_URL!,
    privateKey: process.env.PRIVATE_KEY!,
    contracts: {
      identityRegistry: process.env.IDENTITY_REGISTRY!,
      reputationRegistry: process.env.REPUTATION_REGISTRY!,
      validationRegistry: process.env.VALIDATION_REGISTRY!
    }
  };
}