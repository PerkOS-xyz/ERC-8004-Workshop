# ERC-8004 Workshop: Trustless Agents

## 🎯 Overview

This repository contains practical examples and tutorials for **ERC-8004: Trustless Agents** - the Ethereum standard that enables AI agents to discover, trust, and interact across organizational boundaries.

## 📚 Workshop Structure

### 1. [Introduction](./docs/01-introduction.md) (10 min)
- What is ERC-8004?
- Why Trustless Agents matter
- The Agentic Economy vision

### 2. [Live Demo](./examples/complete-demo/) (15 min)
- Multi-agent interaction in TypeScript
- Alice (Market Analysis) + Bob (Validation) + Charlie (Feedback)
- Real blockchain integration

### 3. [Architecture Deep Dive](./docs/03-architecture.md) (10 min)
- Identity Registry (ERC-721 + URI)
- Reputation Registry (Feedback system)
- Validation Registry (Independent verification)

### 4. [Hands-on Coding](./examples/step-by-step/) (20 min)
- TypeScript implementation tutorial
- Deploy your first agent
- Register on Identity Registry
- Create feedback loop

### 5. [Q&A & Next Steps](./docs/05-next-steps.md) (5 min)

## 🛠️ Examples

### [Complete Demo](./examples/complete-demo/)
Ready-to-run TypeScript example with 3 AI agents working together.

### [Step-by-Step Tutorial](./examples/step-by-step/)
Build your own ERC-8004 agent from scratch with TypeScript.

### [Smart Contracts](./examples/contracts/)
Solidity examples for the three registries with Foundry tests.

### [JavaScript Integration](./examples/javascript/)
Basic JavaScript integration examples.

### [TEE Integration](./examples/tee-agents/)
Trusted Execution Environment examples with Oasis ROFL.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd ERC-8004-Workshop

# Run complete demo
cd examples/complete-demo
./setup.sh
npm run demo

# Deploy contracts locally
cd ../contracts
./install-deps.sh
forge build
forge test
```

## 📋 Prerequisites

- **Node.js** 18+ with npm
- **TypeScript** knowledge helpful
- **Foundry** (for smart contracts)
- **Git** and **curl**

## 🌟 Key Features

- ✅ **Cross-organizational Discovery** - Find agents without pre-existing relationships
- ✅ **Modular Trust Models** - From reputation-based to cryptographic proofs
- ✅ **Gas Efficient** - Off-chain data with on-chain integrity
- ✅ **Standard Compliant** - Full ERC-721 compatibility
- ✅ **Real-world Examples** - Production-ready implementations

## 📖 Resources

- [Official ERC-8004 Specification](https://eips.ethereum.org/EIPS/eip-8004)
- [Ethereum Magicians Discussion](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098)
- [Awesome ERC-8004 Resources](https://github.com/sudeepb02/awesome-erc8004)
- [PerkOS Implementation](https://perkos.xyz)

## 🤝 Contributing

Found a bug or want to add an example? Please open an issue or submit a pull request!

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Built with ❤️ for the Ethereum ecosystem**