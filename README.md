# ERC-8004 Workshop: Trustless Agents

## Overview

Hands-on workshop for **ERC-8004: Trustless Agents** — the Ethereum standard for on-chain agent identity, reputation, and verification. Built by **PerkOS**.

This workshop uses **[PerkOS Stack](https://stack.perkos.xyz)** as the primary middleware — no direct contract interaction needed.

**Presentation:** [erc8004-workshop.netlify.app](https://erc8004-workshop.netlify.app)

## Quick Start (Stack API)

```bash
git clone https://github.com/PerkOS-xyz/ERC-8004-Workshop.git
cd ERC-8004-Workshop/examples/stack-api
npm install
```

### Step 1: Discover Stack Capabilities

```bash
npx tsx src/01-discover.ts
```

Fetches health check, agent card, ERC-8004 descriptor, x402 discovery, and LLM instructions from `stack.perkos.xyz`.

### Step 2: Look Up Agent Identity

```bash
npx tsx src/02-identity.ts
# Or with custom address:
npx tsx src/02-identity.ts 0xYOUR_ADDRESS base
```

Queries the ERC-8004 Identity Registry on Base. Returns registry contract info, agent NFT metadata, and spec version.

### Step 3: Query Agent Reputation

```bash
npx tsx src/03-reputation.ts
# Or with custom agent ID:
npx tsx src/03-reputation.ts 1 base
```

Returns on-chain feedback: scores, tag categories, client addresses, and revocation status.

### Step 4: Onboard a New Agent

```bash
npx tsx src/04-onboard.ts
```

Stack returns a complete onboarding package: registration transaction (ready to sign), x402 payment config, and ERC-8004 registry addresses.

### Step 5: x402 Payment Flow

```bash
npx tsx src/05-x402-flow.ts
```

Demonstrates the full x402 lifecycle: supported networks (38 chains), health with RPC latency, verify, and settle.

### Step 6: Full End-to-End Flow

```bash
npx tsx src/06-full-flow.ts
```

Complete sequence: discover → identity → reputation → onboard. This is how a real integration works.

## Stack API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check |
| `GET /.well-known/agent-card.json` | Agent discovery (A2A) |
| `GET /.well-known/erc-8004.json` | ERC-8004 descriptor |
| `GET /.well-known/x402-discovery.json` | x402 discovery |
| `GET /api/llms.txt` | LLM instructions |
| `GET /api/erc8004/identity` | Identity lookup |
| `GET /api/erc8004/reputation` | Reputation query |
| `POST /api/v2/agents/onboard` | Agent onboarding |
| `GET /api/v2/x402/supported` | Supported networks |
| `POST /api/v2/x402/verify` | Verify x402 payment |
| `POST /api/v2/x402/settle` | Settle x402 payment |

**Base URL:** `https://stack.perkos.xyz`

## Contract Addresses (All EVM Chains)

| Registry | Address |
|---|---|
| Identity | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| Reputation | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` |

Same addresses across Celo, Base, Avalanche, Ethereum, Polygon, Arbitrum, and Optimism (CREATE2 deployment).

## Prerequisites

- Node.js 18+ (for native `fetch`)
- npm
- No wallet or private key needed for read operations

## Advanced: Direct Contract Interaction

For developers who want to interact with ERC-8004 contracts directly:

- **[Step-by-Step Tutorial](./examples/step-by-step/)** — Build from scratch with ethers.js
- **[Complete Demo](./examples/complete-demo/)** — Multi-agent demo (Alice, Bob, Charlie)
- **[Smart Contracts](./examples/contracts/)** — Solidity examples with Foundry

## Workshop Docs

- [Introduction](./docs/01-introduction.md)
- [Architecture](./docs/03-architecture.md)
- [Next Steps](./docs/05-next-steps.md)
- [Ecosystem Research](./research/ecosystem.md)

## Links

- **Stack:** [stack.perkos.xyz](https://stack.perkos.xyz)
- **PerkOS:** [perkos.xyz](https://perkos.xyz)
- **Twitter:** [@perk_os](https://x.com/perk_os)
