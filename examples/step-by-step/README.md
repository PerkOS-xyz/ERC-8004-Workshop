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
- Familiarity with Python or JavaScript
- Understanding of blockchain concepts

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

# Install Python dependencies
pip install -r requirements.txt
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
```python
from web3 import Web3
from eth_account import Account

# Connect to local blockchain
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

# Load your private key
account = Account.from_key('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')

# Get contract instance
identity_registry = w3.eth.contract(
    address='0x5FbDB...', # Your deployed contract address
    abi=identity_registry_abi
)

# Register agent
tx_hash = identity_registry.functions.register(
    "https://myagent.example.com/metadata.json"
).transact({'from': account.address})

# Wait for confirmation
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Agent registered! Transaction: {receipt.transactionHash.hex()}")
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

```python
# Agent provides signed authorization for feedback
def create_feedback_authorization(agent_id, client_address, timestamp):
    # Create message hash
    message = f"feedback_{agent_id}_{client_address}_{timestamp}"
    message_hash = w3.keccak(text=message)
    
    # Sign with agent's private key
    signature = account.signHash(message_hash)
    return signature.signature

# Submit feedback to reputation registry
feedback_score = 85  # 0-100 rating
feedback_tags = ["helpful", "fast"]
authorization = create_feedback_authorization(1, account.address, int(time.time()))

tx_hash = reputation_registry.functions.submitFeedback(
    1,  # agent_id
    feedback_score,
    feedback_tags,
    "https://feedback-report.example.com/report1.json",
    w3.keccak(text="feedback report content"),  # report hash
    authorization
).transact({'from': account.address})

print(f"Feedback submitted! Score: {feedback_score}/100")
```

## ✅ Step 5: Add Validation

### Request Validation
Ask for independent verification:

```python
import hashlib

# Create unique request hash
request_data = json.dumps(request, sort_keys=True)
request_hash = hashlib.sha256(request_data.encode()).digest()

# Request validation
tx_hash = validation_registry.functions.requestValidation(
    request_hash,
    "manual-review",  # validation type
    "https://validation-request.example.com/request1.json"
).transact({'from': account.address})

print("Validation requested!")
```

### Submit Validation Result
A validator reviews and provides their assessment:

```python
# Validator submits their result
validation_confidence = 90  # 0-100 confidence score
validation_report_hash = hashlib.sha256(b"validation report content").digest()

tx_hash = validation_registry.functions.submitValidation(
    request_hash,
    validation_confidence,
    "https://validation-response.example.com/response1.json",
    validation_report_hash
).transact({'from': validator_account.address})

print(f"Validation submitted! Confidence: {validation_confidence}/100")
```

## 📊 Step 6: Query Results

### Check Agent Reputation
```python
# Get agent's current reputation
avg_score = reputation_registry.functions.getAverageScore(1).call()
feedback_count = reputation_registry.functions.getFeedbackCount(1).call()

print(f"Agent reputation: {avg_score}/100 ({feedback_count} reviews)")
```

### View Validation History
```python
# Get validation responses
validations = validation_registry.functions.getValidationResponses(request_hash).call()

for validation in validations:
    print(f"Validator: {validation[1]}")
    print(f"Confidence: {validation[2]}/100")
    print(f"Timestamp: {validation[5]}")
    print("---")
```

## 🧪 Step 7: Test Complete Flow

Run the complete test script:

```bash
python test_complete_flow.py
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
├── python/
│   ├── agent_example.py         # Basic agent implementation
│   ├── register_agent.py        # Registration helper
│   ├── submit_feedback.py       # Feedback helper
│   ├── request_validation.py    # Validation helper
│   └── test_complete_flow.py    # Complete test
├── javascript/
│   ├── agent-client.js          # JS version of agent client
│   ├── web3-helpers.js          # Web3 utilities
│   └── frontend-example.html    # Simple web interface
└── requirements.txt             # Python dependencies
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
