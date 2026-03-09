---
marp: true
theme: default
paginate: true
backgroundColor: #0e0716
color: #f0e6f6
style: |
  section {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #0e0716 0%, #1d1029 50%, #0e0716 100%);
    padding: 50px 70px;
  }
  h1 {
    color: #eb1b69;
    font-size: 2em;
    border-bottom: 3px solid #8e2051;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
  h2 { color: #fab46c; font-size: 1.3em; margin-bottom: 10px; }
  h3 { color: #ef5b57; font-size: 1.05em; }
  strong { color: #eb1b69; }
  em { color: #fab46c; font-style: normal; }
  li { margin-bottom: 4px; line-height: 1.35; font-size: 0.95em; }
  code {
    background: #45193c; color: #fd8f50;
    padding: 2px 8px; border-radius: 4px; font-size: 0.85em;
  }
  a { color: #ef5b57; }
  blockquote {
    border-left: 4px solid #eb1b69;
    background: rgba(235, 27, 105, 0.08);
    padding: 8px 16px; margin: 10px 0;
    border-radius: 0 8px 8px 0;
  }
  section.title {
    display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
  }
  section.title h1 { font-size: 3em; border-bottom: none; margin-bottom: 8px; }
  section.title h2 { font-size: 1.8em; color: #f0e6f6; font-weight: 300; }
  section.title p { color: #76437b; font-size: 1.1em; }
  .box {
    display: inline-block;
    background: linear-gradient(135deg, #45193c, #1d1029);
    border: 2px solid #8e2051;
    border-radius: 12px;
    padding: 10px 16px;
    margin: 4px;
    text-align: center;
    min-width: 140px;
    font-size: 0.8em;
  }
  .box-pink { border-color: #eb1b69; background: linear-gradient(135deg, rgba(235,27,105,0.2), #1d1029); }
  .box-orange { border-color: #fd8f50; background: linear-gradient(135deg, rgba(253,143,80,0.2), #1d1029); }
  .box-green { border-color: #4ade80; background: linear-gradient(135deg, rgba(74,222,128,0.15), #1d1029); }
  .arrow { color: #eb1b69; font-size: 1.4em; vertical-align: middle; margin: 0 2px; }
  .diagram { text-align: center; margin: 12px 0; }
  .cols { display: flex; gap: 20px; align-items: flex-start; }
  .col { flex: 1; }
  .highlight-box {
    background: rgba(235, 27, 105, 0.1);
    border: 1px solid #8e2051;
    border-radius: 10px;
    padding: 10px 14px; margin: 6px 0;
    font-size: 0.9em;
  }
  .stack-row {
    display: flex; align-items: center; gap: 10px;
    background: rgba(69,25,60,0.5);
    border-left: 4px solid #eb1b69;
    border-radius: 0 8px 8px 0;
    padding: 8px 14px; margin: 5px 0;
    font-size: 0.9em;
  }
  .stack-row.pay { border-left-color: #fd8f50; }
  .stack-row.comm { border-left-color: #4ade80; }
  .meter { display: flex; gap: 2px; margin-top: 3px; }
  .meter span {
    display: inline-block; width: 18px; height: 7px;
    border-radius: 2px; background: #45193c;
  }
  .meter .g { background: #4ade80; }
  .meter .y { background: #fab46c; }
  .meter .r { background: #ef5b57; }
  pre { font-size: 0.75em !important; }
---

<!-- _class: title -->

# ERC-8004

## The Trustless Agent Economy

Workshop -- PerkOS

---

# What is ERC-8004?

An Ethereum standard for **Trustless Agents** -- discover and evaluate agents across organizations without centralized gatekeepers.

## The Trust Gap

<div class="diagram">
<div class="box box-pink">Agent A<br><small>Claims: "I'm a DeFi expert"</small></div>
<span class="arrow">?</span>
<div class="box box-pink">Agent B<br><small>How to verify?</small></div>
<span class="arrow">?</span>
<div class="box box-pink">User<br><small>Who do I trust?</small></div>
</div>

## The Solution: Three Onchain Registries

<div class="diagram">
<div class="box box-pink"><strong>Identity</strong><br><small>Global discovery -- Portable IDs</small></div>
<div class="box box-orange"><strong>Reputation</strong><br><small>Feedback -- Performance scores</small></div>
<div class="box box-green"><strong>Validation</strong><br><small>Task verification -- Proofs</small></div>
</div>

---

# How Onchain Agents Work

<div class="cols">
<div class="col">

## Agent Lifecycle

<div style="text-align:left">
<div class="box box-pink" style="width:85%">1. <strong>Mint</strong> -- ERC-721 NFT<br><small>Persistent onchain identity</small></div>
<div style="color:#eb1b69; font-size:1.2em; margin:2px 0 2px 36px">|</div>
<div class="box box-orange" style="width:85%">2. <strong>Configure</strong> -- Agent Card<br><small>Name, capabilities, endpoints</small></div>
<div style="color:#eb1b69; font-size:1.2em; margin:2px 0 2px 36px">|</div>
<div class="box box-green" style="width:85%">3. <strong>Operate</strong> -- Sovereign actor<br><small>Own wallet, sign txs, negotiate</small></div>
</div>

</div>
<div class="col">

## The Agent Card

```json
{
  "name": "DeFi Optimizer",
  "capabilities": [
    "yield-farming",
    "portfolio-rebalance"
  ],
  "endpoints": {
    "mcp": "https://agent.io/mcp",
    "a2a": "https://agent.io/a2a"
  },
  "agentWallet": "0x1a2b..."
}
```

**Discovery:** Query registries or **8004scan.io** to find agents by skill

</div>
</div>

---

# Infrastructure for the Machine Economy

## The Emerging Stack

<div style="margin: 12px 0">
<div class="stack-row">
<div><strong style="color:#eb1b69">Trust Layer -- ERC-8004</strong><br><small>Identity -- Reputation -- Validation</small></div>
</div>
<div class="stack-row pay">
<div><strong style="color:#fd8f50">Payment Layer -- x402</strong><br><small>HTTP 402 "Payment Required" -- native M2M transactions</small></div>
</div>
<div class="stack-row comm">
<div><strong style="color:#4ade80">Communication Layer -- MCP / A2A</strong><br><small>Standardized tool use -- Agent-to-agent messaging</small></div>
</div>
</div>

## End-to-End Flow

Discover via **A2A** --> Verify via **ERC-8004** --> Pay via **x402** --> Done, rep updated

L2s: **Base**, **Celo**, **Avalanche**, **Arbitrum**, **Optimism** -- sub-cent fees for frequent agent pings

---

# Introducing Stack

## PerkOS Middleware for ERC-8004 + x402

**Stack** (`stack.perkos.xyz`) is the production middleware that implements the full ERC-8004 specification as a REST API -- no direct contract interaction required.

<div class="cols">
<div class="col">

### What Stack Provides

- **Agent discovery** via `.well-known` endpoints
- **Identity registry** lookups (ERC-721 agent NFTs)
- **Reputation queries** (on-chain feedback, scores)
- **Agent onboarding** (guided registration flow)
- **x402 payments** (verify, settle, multi-chain)
- **38 networks** supported (mainnet + testnet)

</div>
<div class="col">

### Discovery Endpoints

```
GET /.well-known/agent-card.json
GET /.well-known/erc-8004.json
GET /.well-known/x402-discovery.json
GET /api/health
GET /api/llms.txt
```

All endpoints return structured JSON. Machine-readable. Agent-friendly.

</div>
</div>

---

# Stack: Discovery in Practice

## Health Check

```bash
curl https://stack.perkos.xyz/api/health
```

```json
{
  "status": "healthy",
  "service": "perkos-stack",
  "version": "2.0.0"
}
```

## ERC-8004 Descriptor

```bash
curl https://stack.perkos.xyz/.well-known/erc-8004.json
```

Returns the full agent descriptor: capabilities, payment methods, supported networks, reputation data, contract addresses, and protocol version.

## LLM Instructions

```bash
curl https://stack.perkos.xyz/api/llms.txt
```

Returns plain-text instructions for AI agents -- quick-start guide, authentication flow, and endpoint reference.

---

# Stack: Identity and Reputation

## Identity Lookup

```bash
curl "https://stack.perkos.xyz/api/erc8004/identity?address=0x3f0D...46C&network=celo"
```

```json
{
  "network": "celo",
  "registryAddress": "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
  "name": "AgentIdentity",
  "symbol": "AGENT",
  "version": "2.0.0",
  "spec": "ERC-8004"
}
```

## Reputation Query

```bash
curl "https://stack.perkos.xyz/api/erc8004/reputation?agentId=1&network=celo"
```

Returns on-chain feedback: score values, tag categories (e.g. `fx-trade`/`buy`), client addresses, and revocation status. Reputation is **signed int128** with configurable decimals -- supports both positive and negative feedback.

---

# Stack: Agent Onboarding

## Register a New Agent

```bash
curl -X POST https://stack.perkos.xyz/api/v2/agents/onboard \
  -H "Content-Type: application/json" \
  -d '{"network":"celo","name":"my-agent","description":"Workshop test agent"}'
```

```json
{
  "success": true,
  "registration": {
    "to": "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
    "network": "celo",
    "function": "register()",
    "description": "Register as an agent in the ERC-8004 Identity Registry"
  },
  "x402": {
    "facilitator": "https://stack.perkos.xyz",
    "payTo": "0x3f0D...46C",
    "network": "celo",
    "schemes": ["exact", "deferred"]
  },
  "erc8004": {
    "identityRegistry": "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
    "reputationRegistry": "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63"
  }
}
```

One call returns: registration tx, x402 payment config, and registry addresses.

---

# Stack: x402 Payment Flow

## Supported Networks

```bash
curl https://stack.perkos.xyz/api/v2/x402/supported
```

Returns all 38 network/scheme pairs: `exact` (immediate) and `deferred` (batch settlement with escrow).

## Verify a Payment

```bash
curl -X POST https://stack.perkos.xyz/api/v2/x402/verify \
  -H "Content-Type: application/json" \
  -d '{"payload":"...","x402Version":1,"scheme":"exact","network":"celo",...}'
```

## Settle a Payment

```bash
curl -X POST https://stack.perkos.xyz/api/v2/x402/settle \
  -H "Content-Type: application/json" \
  -d '{"payload":"...","x402Version":1,"scheme":"exact","network":"celo",...}'
```

## Health with Latency

```bash
curl https://stack.perkos.xyz/api/v2/x402/health
```

Returns per-network RPC latency, block numbers, and database health.

---

# Hybrid Trust Models and Security

## Tiered Trust -- Security Proportional to Value at Risk

<div style="margin: 8px 0">
<div class="highlight-box" style="border-left: 4px solid #4ade80;">
<strong>Low Stakes</strong> -- Info lookups, $0.01 queries --> <em>Reputation score only</em>
<div class="meter"><span class="g"></span><span></span><span></span><span></span><span></span></div>
</div>
<div class="highlight-box" style="border-left: 4px solid #fab46c;">
<strong>Medium Stakes</strong> -- DeFi ops, $100-$10K --> <em>Staked collateral (slashable)</em>
<div class="meter"><span class="y"></span><span class="y"></span><span class="y"></span><span></span><span></span></div>
</div>
<div class="highlight-box" style="border-left: 4px solid #ef5b57;">
<strong>High Stakes</strong> -- Critical infra, $10K+ --> <em>TEE attestations + zkML proofs</em>
<div class="meter"><span class="r"></span><span class="r"></span><span class="r"></span><span class="r"></span><span class="r"></span></div>
</div>
</div>

**Validation:** Crypto-Economic (staked, slashable) -- TEE (enclave attestation) -- zkML (ZK proof of inference)

Reputation is **portable** -- follows agents across platforms. No identity resets.

---

<!-- _class: title -->

# Hands-On Workshop

## Building with Stack API

Clone the repo and follow along:

`github.com/PerkOS-xyz/ERC-8004-Workshop`

---

# Workshop Setup

## Prerequisites

- Node.js 18+ and npm
- A terminal
- No wallet or private key needed for read operations

## Getting Started

```bash
cd examples/stack-api
npm install
```

## Project Structure

```
examples/stack-api/src/
  config.ts          # Base URL, helper functions
  01-discover.ts     # Discovery endpoints
  02-identity.ts     # Identity registry lookup
  03-reputation.ts   # Reputation query
  04-onboard.ts      # Agent registration flow
  05-x402-flow.ts    # x402 payment lifecycle
  06-full-flow.ts    # End-to-end integration
```

All examples use `fetch()` against `https://stack.perkos.xyz` -- no SDK required.

---

# Exercise 1: Discovery

## Run It

```bash
npx tsx src/01-discover.ts
```

## What It Does

1. **Health check** -- `/api/health` confirms Stack is online
2. **Agent card** -- `/.well-known/agent-card.json` returns capabilities, payment methods, supported networks
3. **ERC-8004 descriptor** -- `/.well-known/erc-8004.json` returns registry addresses, trust config, reputation data
4. **x402 discovery** -- `/.well-known/x402-discovery.json` returns facilitator info, endpoints, SLA guarantees
5. **LLM instructions** -- `/api/llms.txt` returns plain-text agent onboarding guide

## Key Takeaway

A single domain exposes the full agent profile. Any agent (or human) can discover capabilities, trust scores, and payment terms through standard HTTP requests.

---

# Exercise 2-3: Identity and Reputation

## Identity Lookup

```bash
npx tsx src/02-identity.ts
# Or with custom address:
npx tsx src/02-identity.ts 0xYOUR_ADDRESS celo
```

Returns the Identity Registry contract info for a given network. The registry is an ERC-721 -- each agent is an NFT with a `tokenURI` pointing to its agent card.

## Reputation Query

```bash
npx tsx src/03-reputation.ts
# Or with custom agent ID:
npx tsx src/03-reputation.ts 1 celo
```

Returns aggregated feedback: score summary, individual feedback entries with tags (`fx-trade`/`buy`), client addresses, and revocation status.

## Contract Addresses (Celo)

- **Identity Registry:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
- **Reputation Registry:** `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`

---

# Exercise 4: Agent Onboarding

## Run It

```bash
npx tsx src/04-onboard.ts
```

## What Happens

Stack returns a complete onboarding package:

1. **Registration transaction** -- contract address, function signature, ready to sign
2. **x402 payment config** -- facilitator URL, pay-to address, supported schemes
3. **ERC-8004 registry addresses** -- identity + reputation contracts for the chosen network

## The Flow in Production

```
Agent calls /api/v2/agents/onboard
  --> Stack returns registration tx + x402 config
    --> Agent signs tx with its wallet
      --> Agent is now registered on-chain
        --> Agent can receive x402 payments
```

No manual setup. No dashboard. Fully programmatic.

---

# Exercise 5: x402 Payment Lifecycle

## Run It

```bash
npx tsx src/05-x402-flow.ts
```

## Steps Demonstrated

1. **Supported networks** -- lists all 38 network/scheme pairs
2. **Health check** -- per-network RPC latency and block numbers
3. **Verify** -- validates a payment proof (uses placeholder data in workshop)
4. **Settle** -- executes settlement on-chain (uses placeholder data in workshop)

## Payment Schemes

- **Exact** -- immediate USDC transfer, verified on-chain
- **Deferred** -- escrow-based, batch settlement (Avalanche, Base)

## In Production

The server returns HTTP 402 with payment requirements. The client constructs a signed payment proof. Stack verifies and settles. The resource is unlocked.

---

# Exercise 6: Full Integration Flow

## Run It

```bash
npx tsx src/06-full-flow.ts
```

## End-to-End Sequence

1. **Discover** -- health check + ERC-8004 descriptor
2. **Identity** -- look up the agent's registry info
3. **Reputation** -- query on-chain feedback and scores
4. **Onboard** -- register a new agent and get x402 config

This is the complete lifecycle: discover an agent, verify its identity and reputation, then onboard your own agent to participate in the same network.

---

# Architecture Overview

## Stack as Middleware

<div class="diagram">
<div class="box box-pink">Your Agent<br><small>HTTP client</small></div>
<span class="arrow">--></span>
<div class="box box-orange">Stack API<br><small>stack.perkos.xyz</small></div>
<span class="arrow">--></span>
<div class="box box-green">On-Chain<br><small>ERC-8004 contracts</small></div>
</div>

## What Stack Abstracts

- **Multi-chain routing** -- one API, 38 networks
- **Contract ABI encoding** -- no ethers.js or viem needed for reads
- **Discovery protocol** -- `.well-known` endpoints follow web standards
- **x402 facilitation** -- verify and settle without running your own node

## For Advanced Users

Direct contract interaction examples are available in `examples/direct-contract/`. These use ethers.js to call the ERC-8004 registries directly -- useful for custom integrations or when you need write operations without Stack as intermediary.

---

# Key Contract Addresses

## Mainnet Registries

| Network | Identity Registry | Reputation Registry |
|---------|------------------|-------------------|
| Avalanche | `0x8004A169FB4a...` | `0x8004BAa17C5...` |
| Celo | `0x8004A169FB4a...` | `0x8004BAa17C5...` |
| Base | `0x8004A169FB4a...` | `0x8004BAa17C5...` |
| Ethereum | `0x8004A169FB4a...` | `0x8004BAa17C5...` |
| Polygon | `0x8004A169FB4a...` | `0x8004BAa17C5...` |
| Arbitrum | `0x8004A169FB4a...` | `0x8004BAa17C5...` |
| Optimism | `0x8004A169FB4a...` | `0x8004BAa17C5...` |

**Full Identity:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
**Full Reputation:** `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`

Same addresses across all mainnet EVM chains.

---

<!-- _class: title -->

# Recap

## ERC-8004 + Stack + x402

Discover -- Verify -- Pay -- Repeat

`stack.perkos.xyz`

---
