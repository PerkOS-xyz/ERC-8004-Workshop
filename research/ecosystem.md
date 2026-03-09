# ERC-8004 Ecosystem Research

## Overview
As of March 2026, the ERC-8004 ecosystem is **rapidly growing** — 24,000+ agents registered on mainnet, x402 payments surpassing $50M, and 60+ public repositories on GitHub.

**Mainnet launched January 29, 2026** on Ethereum, marking the transition from testnet-only to production infrastructure. The Ethereum Foundation's dAI team has formally incorporated ERC-8004 into their 2026 roadmap.

---

## 📊 Key Numbers (Q1 2026)

| Metric | Value |
|--------|-------|
| Agents registered | **24,000+** (since mainnet launch) |
| EIP Status | Draft (Peer Review) → v1 Complete |
| Mainnet launch | **January 29, 2026** |
| x402 Volume | **$50M+** (Q1 2026) |
| x402 Transactions | 75M+ |
| GitHub repos | 60+ |
| Authors | Marco De Rossi (MetaMask), Davide Crapis (EF), Jordan Ellis (Google), Erik Reppel (Coinbase) |
| Created | Aug 13, 2025 |
| Backers | ENS, EigenLayer, The Graph, Taiko, Ethereum Foundation dAI team |
| Chains with registries | ETH Mainnet, ETH Sepolia, Base, Base Sepolia, Linea Sepolia, Hedera, SKALE, Avalanche, Solana (via SATI) |
| Standard Registry Address | `0x8004A818BFB912233c491871b3d84c89A494BD9e` |
| Identity Registry (mainnet) | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |

---

## 🔍 Discovery & Explorers

### 8004scan.io
- **URL:** https://www.8004scan.io
- **What:** First on-chain explorer for ERC-8004 — "Etherscan for AI Agents"
- **By:** Marco De Rossi (ERC-8004 co-author) + AltLayer infrastructure
- **Features:** Browse agents, filter by protocol/score/features, submit feedback, leaderboards
- **Docs:** https://docs.altlayer.io/altlayer-documentation/8004-scan/overview
- **Also:** Agentscan by Alias.AI — building a search engine layer on top

### 8004.org
- **URL:** http://8004.org
- **What:** Official website for ERC-8004: Trustless Agents

---

## 🛠️ Developer Tools & CLIs

### create-8004-agent (npx CLI)
- **URL:** https://github.com/Eversmile12/create-8004-agent
- **npm:** `create-trustless-agent`
- **What:** `npx create-8004-agent` — scaffolds a complete ERC-8004 agent with:
  - On-chain identity (ERC-721)
  - A2A communication server
  - MCP tool serving
  - x402 USDC micropayments
- **Chains:** EVM (ETH, Base, SKALE, Avalanche) + Solana
- **Status:** Very active, Mar 2026

### Ember AI Agent Node
- **npm:** `@emberai/agent-node`
- **What:** `npx -y @emberai/agent-node@latest init` — scaffolds agent with optional EIP-8004 registration
- **URL:** https://www.npmjs.com/package/@emberai/agent-node

### register-8004
- **URL:** https://github.com/clawdbotatg/register-8004
- **What:** One script, one tx — register your AI agent on ERC-8004. Minimal approach.

### ERC-8004 Official Contracts
- **URL:** https://github.com/erc-8004/erc-8004-contracts
- **What:** Registry contracts curated by the 8004 team
- **Solidity 0.8.28 + Foundry**
- **Deployed:** Ethereum Sepolia, Base Sepolia, Linea Sepolia, Hedera Testnet, + Mainnet

### ERC-8004 Rust SDK
- **URL:** https://github.com/qntx/erc8004
- **Stars:** ⭐ 163 (most starred ERC-8004 repo)
- **What:** Rust SDK for ERC-8004 Trustless Agents

### Praxis Protocol SDKs
- **Python:** https://github.com/prxs-ai/praxis-py-sdk
- **Go:** https://github.com/prxs-ai/praxis-go-sdk

### QuillAI Mandates Core
- **URL:** https://github.com/quillai-network/mandates-core
- **What:** Core SDK for Validation Mandates — create, canonicalize (JCS), hash, sign (EIP-191), verify mandate documents with CAIP-10 identities

### JavaScript/TypeScript Libraries
- **ChaosChain SDK:** https://github.com/ChaosChain/chaoschain/tree/main/packages/sdk
- **erc-8004-js:** https://github.com/tetratorus/erc-8004-js (lightweight)
- **erc-8004-py:** https://github.com/tetratorus/erc-8004-py (Python)
- **chaoschain-sdk:** https://pypi.org/project/chaoschain-sdk/ (PyPI)

### MCP Tools
- **@quantulabs/8004-mcp:** https://www.npmjs.com/package/@quantulabs/8004-mcp — MCP server for ERC-8004 operations
- **Chitin MCP Server:** `npx chitin-mcp-server` — verify agent identities, resolve DIDs, manage certificates

### Solana Ports
- **8004-solana:** https://github.com/QuantuLabs/8004-solana — Anchor programs porting ERC-8004 to Solana
- **8004-solana-ts:** https://github.com/QuantuLabs/8004-solana-ts — TypeScript SDK for Solana

---

## 🏗️ Infrastructure Platforms

### SATI (Cascade Protocol) — ERC-8004 on Solana
- **URL:** https://github.com/cascade-protocol/sati
- **What:** Trust infrastructure for million-agent economies on **Solana**
- **Features:**
  - Token-2022 NFTs for agent identity
  - Compressed attestations at ~$0.002 each
  - Blind feedback (agent commits before review)
  - Sub-second finality (~400ms)
  - 100% ERC-8004 compatible (same registration file format)
- **SDK:** `@cascade-fyi/sati-agent0-sdk`
- **Also:** `create-sati-agent` CLI, `agentbox`

### Oasis Protocol (ROFL)
- **URL:** https://github.com/oasisprotocol/erc-8004
- **What:** ROFL-powered agents conforming to ERC-8004 — truly trustless agents by separating creator from agent
- **Blog:** https://oasis.net/blog/erc-8004-trustless-agents
- **Key insight:** "v2 spec" in progress, focus on code trust over developer trust

### Ch40s Chain (ChaosChain)
- **URL:** https://github.com/ChaosChain/trustless-agents-erc-ri
- **Stars:** ⭐ 50
- **What:** Reference Implementation for ERC-8004
- **Also:** Genesis Studio — commercial prototype, Chaos Chain SDK
- **Docs:** https://docs.chaoscha.in/sdk/installation

### Azeth Protocol
- **URL:** https://github.com/azeth-protocol/common
- **What:** Trust infrastructure for the machine economy

### HodlAI Gateway
- **URL:** https://github.com/HodlAI/hodlai-gateway
- **What:** Gateway turning holdings into AI Compute Credits via ERC-8004 Identity

---

## 🪪 Identity & Trust

### Chitin ID (Base L2)
- **URL:** https://chitin.id
- **What:** Soul identity layer for AI agents on Base L2
- **Features:** ERC-8004 `register()` for agent passports, Soulbound Tokens (EIP-5192), W3C DID resolution, on-chain certificates, governance voting, A2A readiness verification
- **Contracts:** https://github.com/Tiida-Tech/chitin-contracts — Solidity 0.8.28, Foundry, 146 tests, verified on Basescan
- **Live on Base Mainnet**

---

## 🤖 Agent Platforms & Marketplaces

### AgentStore
- **URL:** https://agentstore.tools
- **What:** Open-source marketplace for AI agents using ERC-8004 identity + x402 payments for trustless discovery and USDC settlement
- **GitHub:** https://github.com/techgangboss/agentstore — MIT, monorepo with CLI, API, web frontend

### Khora — On-chain AI Agent Generator
- **URL:** https://github.com/0xmonas/Khora
- **What:** Create, mint, register AI agents with fully on-chain pixel art on **Base**

### Sperax ERC-8004 Agents
- **URL:** https://github.com/Sperax/erc8004-agents
- **What:** Zero-dependency standalone UI for registering agents on **any EVM chain** (Ethereum, BNB, Base, Arbitrum, Optimism, Polygon)

### AutonomiX
- **URL:** https://github.com/casaislabs/AutonomiX
- **What:** Web3 platform combining x402 micropayments + ERC-8004 agent NFTs on Base Sepolia

### KarmaKadabra (UltravioletaDAO)
- **URL:** https://github.com/UltravioletaDAO/karmakadabra
- **What:** Autonomous agents buy/sell data using ERC-8004 identity, x402 gasless micropayments, CrewAI orchestration on **Avalanche Fuji**

### Wispy
- **URL:** https://github.com/brn-mwai/wispy
- **What:** Autonomous AI Agent Platform — Marathon Mode, x402 Payments, ERC-8004 Identity, A2A Protocol, powered by Gemini

### AdPrompt.ai
- **What:** Agentic marketing solution registered under ERC-8004 for on-chain agent identity and reputation
- **Status:** Announced Feb 2026, live on mainnet

---

## 🤝 Collaboration Frameworks

### Ensemble Framework
- **URL:** https://x.com/EnsembleCodes
- **Docs:** https://docs.ensemble.codes

### ISEK
- **URL:** https://github.com/isekOS/ISEK — Decentralized agent network
- **Also:** https://github.com/isekOS/awesome-a2a-agents — curated A2A agents list

### Protocol Commons
- **What:** Standardized machine intent — canonical verbs and typed payloads for agent interop across chains
- **ERC-8004 aligned discovery + x402 execution support

---

## 💰 Payment Infrastructure

### x402.org
- **URL:** https://www.x402.org
- **What:** Open, internet-native payment standard using HTTP 402
- **Stats (Q1 2026):** $50M+ volume, 75M+ transactions, 94K buyers, 22K sellers
- **How:** One line of middleware → 402 response → client pays via stablecoins → access granted
- **Championed by:** Coinbase, Cloudflare

### Primev FastRPC x402 Facilitator
- **URL:** https://github.com/primev/mainnet-x402-facilitator
- **What:** Fee-free x402 payment facilitator on Ethereum mainnet with sub-200ms settlement via mev-commit preconfirmations
- **Registered as:** Agent #23175 on Identity Registry

### SafeLink
- **URL:** https://github.com/charliebot8888/SafeLink
- **What:** Security-first MCP skill for agent-to-agent hiring with escrowed USDC + x402

---

## 🔐 TEE / Verification

### Automata Network
- **DCAP Attestation:** Intel SGX and TDX onchain verification (RISC Zero, Succinct)
- **TDX SDK:** Intel TDX quotes across cloud providers with ZK proofs
- **SEV-SNP SDK:** AMD attestation with ZK support
- **Nitro Enclave:** AWS Nitro attestation CLI
- **SGX SDK:** Rust-native Intel SGX

### Phala Network TEE Agent
- **URL:** https://github.com/Phala-Network/erc-8004-tee-agent
- **What:** ERC-8004 compliant TEE Agent with TEE Registry Extension for Phala Cloud CVM

### Sparsity
- **URL:** https://github.com/sparsity-xyz/sparsity-demo
- **What:** ERC-8004 AI agent demo with TEE

### Vistara Labs
- **URL:** https://github.com/vistara-apps/agent-arena-v1
- **What:** Agent Arena SDK + ERC-8004 example

---

## 🌐 Multi-Chain Adoption

| Chain | Status | Notes |
|-------|--------|-------|
| Ethereum Mainnet | ✅ Live (Jan 29, 2026) | Primary deployment, 24K+ agents |
| Ethereum Sepolia | ✅ Live | Testnet, first deployment |
| Base | ✅ Live | Chitin ID, Khora, AutonomiX |
| Base Sepolia | ✅ Live | Testing ground |
| Linea Sepolia | ✅ Live | Official deployment |
| Hedera | ✅ Live | Official deployment |
| SKALE | ✅ Live | Zero gas fees |
| Avalanche C-Chain | ✅ Live (Feb 2026) | Adopted for on-chain AI identity |
| Solana | ✅ Via SATI | Cascade Protocol port, ~$0.002/attestation |

---

## 📚 Learning & Community Resources

### Curated Lists
- **awesome-erc8004:** https://github.com/sudeepb02/awesome-erc8004 (⭐ 50)
- **Intensive Co-Learning:** https://github.com/IntensiveCoLearning/trustless-agents (⭐ 18)

### Community Calls
- **Call #1:** https://youtu.be/kooO3DGzYek (Sep 23 2025)
- **Call #2:** https://youtube.com/watch?v=J3PkdQEZWK0
- **Trustless Agents Day @ Devconnect** (Nov 21, 2025) — full-day summit

### Courses & Workshops
- **Trustless Agents Course:** https://intensivecolearn.ing/en/programs/trustless-agents
- **Sparsity AI Workshop:** https://www.youtube.com/watch?v=jqOZj399BLE — Build ERC-8004 agent with TEE

### Key Articles & Blog Posts
- **Eco.com:** "What is ERC-8004?" — comprehensive breakdown with trust problem analysis
- **QuickNode:** "Developer's Guide to Trustless AI Agent Identity" (Mar 2026)
- **Ledger Academy:** ERC-8004 glossary entry (Mar 2026)
- **Allium:** "ERC-8004 Explained: Identity and Reputation for AI Agents" (Feb 2026)
- **Medium (Coinmonks):** "A Trustless Extension of Google's A2A Protocol" (Sep 2025)
- **Medium:** "ERC-8004 on Avalanche C-Chain" (Feb 2026)
- **DEV.to:** "Building Trustless Autonomous Agents with TEEs" (Oct 2025)
- **Oasis Blog:** "ERC-8004: Trustless Agents" — ROFL framework integration
- **PayRam:** "The Trust Layer for the AI Agent Economy"
- **Bitget News:** "How x402, AP2, and ERC-8004 Are Building the Machine Economy"

### Forums & Discussion
- **Ethereum Magicians:** https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098
- **Telegram:** http://t.me/ERC8004 (official builder community)
- **Builder Program:** http://bit.ly/8004builderprogram

---

## 🗓️ Timeline

| Date | Milestone |
|------|-----------|
| Aug 13, 2025 | EIP-8004 draft created |
| Sep 23, 2025 | First community call |
| Oct 2025 | EF dAI team endorses, incorporates into 2026 roadmap |
| Nov 21, 2025 | Trustless Agents Day @ DevConnect Buenos Aires |
| Jan 29, 2026 | **Mainnet launch on Ethereum** |
| Feb 2026 | Avalanche C-Chain adoption |
| Q1 2026 | 24,000+ agents registered, x402 > $50M |

---

## 🔗 Official Links

- **EIP:** https://eips.ethereum.org/EIPS/eip-8004
- **Discussion:** https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098
- **Website:** http://8004.org
- **Explorer:** https://www.8004scan.io
- **x402:** https://www.x402.org
- **A2A Protocol:** https://a2a-protocol.org
- **GitHub Org:** https://github.com/erc-8004
- **GitHub Topic:** https://github.com/topics/erc8004
- **Governance:** davide.crapis@ethereum.org
