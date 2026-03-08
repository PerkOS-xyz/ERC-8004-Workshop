# Complete Demo: Multi-Agent ERC-8004 System

## 🎭 Meet the Agents

This demo showcases three AI agents working together using the ERC-8004 standard:

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Alice (Server)  │ │ Bob (Validator) │ │Charlie (Client) │
│                 │ │                 │ │                 │
│ • Market        │ │ • Validation    │ │ • Feedback      │
│   Analysis      │ │ • Quality       │ │ • Reputation    │
│ • Multi-agent   │ │   Assessment    │ │   Management    │
│   workflows     │ │ • Authorization │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                ┌─────────────────────┐
                │ ERC-8004 Registries │
                │                     │
                │ • Identity Registry │
                │ • Reputation Registry│
                │ • Validation Registry│
                └─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with npm  
- Foundry (for smart contracts)

### Installation
```bash
# Automated setup (recommended)
./setup.sh

# Or manual setup
pip install -r requirements.txt
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Deploy Contracts
```bash
cd contracts
forge install
forge build
anvil &  # Start local blockchain in background
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

### Run Demo
```bash
cp .env.example .env
# Edit .env with your configuration
python demo.py
```

## 📁 File Structure

```
complete-demo/
├── README.md                 # This file
├── setup.sh                 # Automated setup script
├── demo.py                   # Main demo orchestrator
├── requirements.txt          # Python dependencies
├── .env.example             # Environment template
├── agents/
│   ├── alice_server.py      # Market analysis agent
│   ├── bob_validator.py     # Validation agent
│   └── charlie_client.py    # Client agent
├── contracts/
│   ├── foundry.toml         # Foundry configuration
│   ├── src/
│   │   ├── IdentityRegistry.sol
│   │   ├── ReputationRegistry.sol
│   │   └── ValidationRegistry.sol
│   ├── script/
│   │   └── Deploy.s.sol     # Deployment script
│   └── test/
│       └── ERC8004.t.sol    # Contract tests
├── utils/
│   ├── blockchain.py        # Web3 utilities
│   ├── registry_client.py   # Registry interaction
│   └── agent_base.py        # Base agent class
└── data/
    ├── alice_metadata.json  # Agent registration files
    ├── bob_metadata.json
    └── charlie_metadata.json
```

## 🎯 Demo Flow

### 1. Contract Deployment
The demo starts by deploying the three ERC-8004 registries:
- **IdentityRegistry**: Agent discovery and metadata
- **ReputationRegistry**: Feedback and trust scores  
- **ValidationRegistry**: Independent verification

### 2. Agent Registration
Each agent registers itself in the Identity Registry:

```python
# Alice registers as a market analysis agent
alice_id = identity_registry.register("https://alice.agent/metadata.json")
print(f"Alice registered with ID: {alice_id}")

# Bob registers as a validator
bob_id = identity_registry.register("https://bob.validator/metadata.json") 
print(f"Bob registered with ID: {bob_id}")

# Charlie registers as a client
charlie_id = identity_registry.register("https://charlie.client/metadata.json")
print(f"Charlie registered with ID: {charlie_id}")
```

### 3. Service Discovery
Charlie needs market analysis and discovers Alice:

```python
# Find market analysis agents
trading_agents = registry_client.find_agents_by_capability("market-analysis")
print(f"Found {len(trading_agents)} trading agents")

# Check Alice's reputation
alice_reputation = reputation_registry.get_average_score(alice_id)
print(f"Alice's reputation: {alice_reputation}/100")
```

### 4. Work Request & Delivery
Charlie requests analysis from Alice:

```python
# Charlie requests ETH/USDC analysis
request = {
    "pair": "ETH/USDC", 
    "timeframe": "24h",
    "analysis_type": "technical"
}

# Alice performs multi-agent analysis
analysis = alice_agent.perform_analysis(request)
print(f"Analysis completed: {analysis['summary']}")

# Alice provides signed feedback authorization
auth_signature = alice_agent.sign_feedback_authorization(charlie_id)
```

### 5. Independent Validation  
Bob validates Alice's work:

```python
# Request validation
validation_hash = validation_registry.request_validation(
    request_hash=hash(request),
    validation_type="re-execution",
    request_uri="ipfs://Qm..."
)

# Bob validates by re-executing analysis
validation_result = bob_validator.validate_analysis(request, analysis)
print(f"Validation result: {validation_result['confidence']}/100")

# Submit validation to registry
validation_registry.submit_validation(
    validation_hash,
    validation_result['confidence'], 
    validation_result['report_uri']
)
```

### 6. Feedback & Reputation Update
Charlie submits feedback using Alice's authorization:

```python
# Submit positive feedback
reputation_registry.submit_feedback(
    agent_id=alice_id,
    score=92,
    tags=["accurate", "fast", "detailed"],
    report_uri="ipfs://Qm...",
    authorization=auth_signature
)

print("✅ Feedback submitted successfully!")
print(f"Alice's updated reputation: {reputation_registry.get_average_score(alice_id)}")
```

## 📊 Expected Output

```
🚀 Starting ERC-8004 Multi-Agent Demo
=====================================

📋 Deploying contracts...
✅ IdentityRegistry deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ ReputationRegistry deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  
✅ ValidationRegistry deployed at: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

🆔 Registering agents...
✅ Alice (Market Analyst) registered with ID: 1
✅ Bob (Validator) registered with ID: 2  
✅ Charlie (Client) registered with ID: 3

🔍 Service discovery...
Found 1 market analysis agents
Alice's reputation: 0/100 (new agent)

📈 Requesting market analysis...
Charlie: "I need ETH/USDC analysis for the next 24h"
Alice: "Analyzing ETH/USDC pair using CrewAI multi-agent workflow..."

✅ Analysis completed!
Summary: "ETH showing bullish momentum with 68% confidence"
Recommendation: "LONG with 2x leverage, target: $2,450"

🔍 Validation request...  
Bob: "Re-executing Alice's analysis for verification..."
Validation confidence: 89/100
Validation report: "Analysis methodology sound, data sources verified"

⭐ Submitting feedback...
Charlie rates Alice: 92/100 with tags: ["accurate", "fast", "detailed"]
✅ Feedback submitted successfully!

📊 Final Results:
- Alice's reputation: 92/100 (1 review)
- Bob's validation success rate: 100%  
- Total interactions: 1
- System trust score: HIGH

🎉 Demo completed successfully!
```

## 🧪 Customization

### Adding New Agents
1. Create agent class inheriting from `AgentBase`
2. Implement required methods: `register()`, `perform_work()`, `validate_work()`
3. Add agent metadata JSON file
4. Update `demo.py` to include your agent

### Different Validation Models
The demo supports multiple validation approaches:
- **Re-execution**: Validator re-runs the analysis
- **Stake-based**: Economic guarantees through crypto deposits
- **TEE-attestation**: Cryptographic proofs from trusted hardware
- **Reputation-based**: Trust scores from previous validations

### Custom Trust Models
Modify the reputation aggregation logic:

```python
# Custom reputation calculation
def calculate_custom_reputation(agent_id):
    feedbacks = reputation_registry.get_all_feedback(agent_id)
    
    # Weight recent feedback more heavily
    weighted_score = 0
    total_weight = 0
    
    for feedback in feedbacks:
        age_days = (now() - feedback.timestamp) / (24 * 60 * 60)
        weight = 1.0 / (1.0 + age_days * 0.1)  # Decay over time
        
        weighted_score += feedback.score * weight
        total_weight += weight
    
    return weighted_score / total_weight if total_weight > 0 else 0
```

## 🔧 Troubleshooting

### Common Issues

**1. "Connection refused" error**
```bash
# Make sure Anvil is running
anvil &
```

**2. "Insufficient funds" error**  
```bash
# Use the pre-funded Anvil accounts
export PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

**3. "Contract not deployed"**
```bash
# Re-deploy contracts
cd contracts && forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
```

### Advanced Configuration

**Environment Variables:**
```bash
# .env file
RPC_URL=http://localhost:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
IDENTITY_REGISTRY=0x5FbDB2315678afecb367f032d93F642f64180aa3
REPUTATION_REGISTRY=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
VALIDATION_REGISTRY=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
OPENAI_API_KEY=your_openai_key_here
```

## 🎓 Learning Objectives

After running this demo, you should understand:

- ✅ How to deploy ERC-8004 registries
- ✅ How agents register and discover each other  
- ✅ How reputation and feedback systems work
- ✅ How independent validation provides trust
- ✅ How to integrate multiple trust models
- ✅ Real-world multi-agent coordination patterns

**Ready to build your own trustless agents?** 🚀

---

**Next**: [Step-by-Step Tutorial →](../step-by-step/README.md)