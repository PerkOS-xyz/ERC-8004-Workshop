# Step-by-Step Tutorial: Build Your First ERC-8004 Agent

## 🎯 What You'll Build

In this tutorial, you'll create a simple but complete ERC-8004 agent system:

1. **Deploy** the three registries
2. **Register** your first agent
3. **Implement** basic reputation tracking
4. **Add** validation capabilities
5. **Test** the complete flow

## 📋 Prerequisites

- Basic knowledge of Solidity
- Familiarity with TypeScript/JavaScript
- Understanding of blockchain concepts
- Node.js 18+ installed

## 🚀 Step 1: Environment Setup

### Clone and Setup
```bash
git clone <repository-url>
cd ERC-8004-Workshop/examples/step-by-step
npm install
```

### Install Dependencies
```bash
# Install Foundry (if not already installed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install TypeScript dependencies
cd typescript
npm install
```

### Start Local Blockchain
```bash
# Start Anvil (Foundry's local node)
anvil
```

## 🏗️ Step 2: Deploy the Registries

### Understanding the Contracts

The ERC-8004 standard consists of three main contracts:

1. **IdentityRegistry** - Agent discovery and metadata
2. **ReputationRegistry** - Feedback and trust scores
3. **ValidationRegistry** - Independent verification

### Deploy Script
```bash
# Deploy all three contracts
forge script script/DeployStep1.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

**Expected Output:**
```
✅ IdentityRegistry deployed at: 0x5FbDB...
✅ ReputationRegistry deployed at: 0xe7f1...
✅ ValidationRegistry deployed at: 0x9fE4...
```

## 🆔 Step 3: Create Your First Agent

### Agent Metadata Structure

Create an agent metadata file:

```json
{
  "name": "My First Agent",
  "description": "A simple example agent for learning ERC-8004",
  "version": "1.0.0",
  "type": "example",
  "capabilities": ["greeting", "echo"],
  "endpoints": [
    {
      "type": "webhook",
      "url": "https://myagent.example.com/webhook"
    }
  ],
  "trust_models": ["reputation"]
}
```

### Register Agent
```typescript
import { BlockchainClient } from './blockchain-client';
import { IDENTITY_REGISTRY_ABI } from './contracts';

// Initialize blockchain client
const blockchain = new BlockchainClient(
  'http://localhost:8545', 
  'YOUR_PRIVATE_KEY_PLACEHOLDER'
);

// Create agent metadata
const metadata = {
  name: 'My First Agent',
  description: 'Tutorial agent for ERC-8004',
  type: 'tutorial',
  capabilities: ['greeting', 'echo'],
  endpoint: 'https://myagent.example.com/webhook'
};

// Get contract instance
const identityRegistry = blockchain.getContract(
  'CONTRACT_ADDRESS_PLACEHOLDER',
  IDENTITY_REGISTRY_ABI
);

// Register agent
const metadataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(metadata)).toString('base64')}`;
const receipt = await blockchain.sendTransaction(
  identityRegistry,
  'register', 
  [metadataUri]
);

console.log(`Agent registered! Transaction: ${receipt.hash}`);
```

## ⭐ Step 4: Implement Reputation System

### Request Service
Simulate requesting a service from your agent:

```python
# Simulate service request
request = {
    "type": "greeting",
    "message": "Hello, agent!",
    "timestamp": int(time.time())
}

# Agent processes request
response = {
    "reply": "Hello there! Nice to meet you!",
    "status": "success",
    "timestamp": int(time.time())
}
```

### Submit Feedback
After receiving service, submit feedback:

```typescript
import { ethers } from 'ethers';
import { REPUTATION_REGISTRY_ABI } from './contracts';

// Create feedback authorization (agent would provide this)
async function createFeedbackAuthorization(agentId: number, clientAddress: string): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const message = `feedback_${agentId}_${clientAddress}_${timestamp}`;
  return await blockchain.signMessage(message);
}

// Prepare feedback data
const feedbackScore = 85;  // 0-100 rating
const feedbackTags = ["helpful", "fast", "accurate"];
const authorization = await createFeedbackAuthorization(1, blockchain.getAddress());

// Create feedback report
const report = { score: feedbackScore, tags: feedbackTags, timestamp: Date.now() };
const reportUri = `data:application/json;base64,${Buffer.from(JSON.stringify(report)).toString('base64')}`;
const reportHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(report)));

// Submit to reputation registry
const reputationRegistry = blockchain.getContract(
  'CONTRACT_ADDRESS_PLACEHOLDER',
  REPUTATION_REGISTRY_ABI
);

const receipt = await blockchain.sendTransaction(
  reputationRegistry,
  'submitFeedback',
  [1, feedbackScore, feedbackTags, reportUri, reportHash, authorization]
);

console.log(`Feedback submitted! Score: ${feedbackScore}/100`);
```

## ✅ Step 5: Add Validation

### Request Validation
Ask for independent verification:

```typescript
import { ethers } from 'ethers';
import { VALIDATION_REGISTRY_ABI } from './contracts';

// Create unique request hash
const requestData = JSON.stringify(request, Object.keys(request).sort());
const requestHash = ethers.keccak256(ethers.toUtf8Bytes(requestData));

// Prepare request metadata
const requestUri = `data:application/json;base64,${Buffer.from(JSON.stringify({
  originalRequest: request,
  timestamp: Date.now(),
  requester: blockchain.getAddress()
})).toString('base64')}`;

// Request validation
const validationRegistry = blockchain.getContract(
  'CONTRACT_ADDRESS_PLACEHOLDER',
  VALIDATION_REGISTRY_ABI
);

const receipt = await blockchain.sendTransaction(
  validationRegistry,
  'requestValidation',
  [requestHash, "re-execution", requestUri]
);

console.log("Validation requested!");
```

### Submit Validation Result
A validator reviews and provides their assessment:

```typescript
// Validator creates validation report
const validationResult = {
  confidence: 90,
  methodology: "re-execution",
  findings: "Analysis verified through independent execution",
  validator: "tutorial-validator",
  timestamp: Date.now()
};

// Create validation response
const responseUri = `data:application/json;base64,${Buffer.from(JSON.stringify(validationResult)).toString('base64')}`;
const responseHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(validationResult)));

// Submit validation
const receipt = await blockchain.sendTransaction(
  validationRegistry,
  'submitValidation',
  [requestHash, validationResult.confidence, responseUri, responseHash]
);

console.log(`Validation submitted! Confidence: ${validationResult.confidence}/100`);
```

## 📊 Step 6: Query Results

### Check Agent Reputation
```typescript
// Get agent's current reputation
const avgScore = await blockchain.callFunction(reputationRegistry, 'getAverageScore', [1]);
const feedbackCount = await blockchain.callFunction(reputationRegistry, 'getFeedbackCount', [1]);

console.log(`Agent reputation: ${avgScore}/100 (${feedbackCount} reviews)`);
```

### View Validation History
```typescript
// Get consensus result for a validation request
const consensus = await blockchain.callFunction(
  validationRegistry, 
  'getConsensusResult', 
  [requestHash]
);

console.log(`Validation consensus: ${consensus}/100`);
```

## 🧪 Step 7: Test Complete Flow

Run the complete test script:

```bash
cd typescript
npm run test-flow
```

**Expected Output:**
```
🚀 Testing Complete ERC-8004 Flow
=====================================

✅ Agent registered successfully (ID: 1)
✅ Service request processed
✅ Feedback submitted (Score: 85/100)
✅ Validation requested
✅ Validation submitted (Confidence: 90/100)

📊 Final Results:
- Agent reputation: 85/100 (1 review)
- Validation confidence: 90/100
- System status: OPERATIONAL

🎉 Test completed successfully!
```

## 🎓 What You've Learned

- ✅ How to deploy ERC-8004 registries
- ✅ Agent registration and metadata management
- ✅ Reputation system implementation
- ✅ Validation request and response flow
- ✅ End-to-end testing of trustless interactions

## 🚀 Next Steps

1. **Customize** your agent's capabilities
2. **Add** multiple validators for better trust
3. **Implement** stake-based validation
4. **Connect** to real AI/ML models
5. **Deploy** to testnets and mainnet

## 📁 File Structure

```
step-by-step/
├── README.md                    # This guide
├── contracts/
│   ├── src/
│   │   ├── IdentityRegistry.sol # Simplified version
│   │   ├── ReputationRegistry.sol
│   │   └── ValidationRegistry.sol
│   └── script/
│       └── DeployStep1.s.sol    # Deployment script
├── typescript/                  # Main tutorial implementation
│   ├── src/
│   │   ├── register-agent.ts    # Agent registration
│   │   ├── submit-feedback.ts   # Feedback submission
│   │   ├── test-complete-flow.ts # Complete workflow test
│   │   ├── blockchain-client.ts # Web3 utilities
│   │   ├── contracts.ts         # Contract ABIs
│   │   └── config.ts           # Configuration loader
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript config
│   └── .env.example            # Environment template
└── javascript/
    └── agent-client.js          # Basic JS example
```

## 🤔 Common Issues

### "Contract not found"
Make sure you've deployed the contracts and updated the addresses in your scripts.

### "Invalid signature"
Check that you're signing the authorization with the correct private key (agent's key, not client's).

### "Insufficient funds"
Make sure your account has enough ETH for gas fees. Use `anvil` accounts which are pre-funded.

### "Function not found"
Verify you're using the correct contract ABI and the function exists in your deployed contract.

---

**Ready for the next challenge?** Check out the [Complete Demo](../complete-demo/) for a more sophisticated multi-agent example!
