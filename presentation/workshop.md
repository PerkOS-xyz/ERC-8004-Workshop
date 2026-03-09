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

![w:120](julio-avatar.png)

# ERC-8004

## The Trustless Agent Economy

Workshop -- PerkOS

<!--
Welcome everyone to the ERC-8004 Workshop by PerkOS. Today we'll learn how to build trustless agent infrastructure using on-chain identity, reputation, and payments. By the end of this session, you'll know how to discover, verify, and onboard AI agents using the PerkOS Stack.
-->

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

<!--
The problem today is trust. When an AI agent claims it can do something, how do you verify that? There's no onchain track record, no portable identity. ERC-8004 solves this with three registries: Identity for discovery and portable IDs, Reputation for feedback and performance scores, and Validation for cryptographic task verification. All on-chain, all permissionless, all interoperable across platforms.
-->

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

<!--
Each agent starts as an ERC-721 NFT -- a unique, persistent on-chain identity. The agent card stores its name, capabilities, and API endpoints. Once registered, the agent operates as a sovereign actor with its own wallet, signing transactions and negotiating with other agents. You can discover agents by querying the registries directly or through tools like 8004scan.
-->

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

<!--
This is the full stack for the machine economy. ERC-8004 handles trust -- who is this agent, can I trust them. x402 handles payment -- HTTP 402 Payment Required, native machine-to-machine transactions. MCP and A2A handle communication -- standardized protocols for tool use and agent messaging. The end-to-end flow is: discover via A2A, verify via ERC-8004, pay via x402, done. We deploy on L2s like Base, Celo, and Avalanche for sub-cent transaction fees.
-->

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

<!--
Stack is the PerkOS middleware that makes all of this accessible via REST APIs. Instead of writing Solidity or using ethers.js to interact with contracts directly, you just call Stack endpoints. It handles multi-chain routing, ABI encoding, and follows web standards with dot-well-known discovery endpoints. Currently supports 38 networks including all major L2s. Everything you need to integrate ERC-8004 into your application is one HTTP call away.
-->

---

# Stack: Discovery in Practice

<div class="cols">
<div class="col">

## Health Check

```bash
curl https://stack.perkos.xyz/api/health
```

```json
{ "status": "healthy",
  "service": "perkos-stack",
  "version": "2.0.0" }
```

</div>
<div class="col">

## Other Discovery Endpoints

```bash
# Agent descriptor
curl /.well-known/erc-8004.json

# LLM instructions
curl /api/llms.txt
```

Returns capabilities, payment methods, networks, contract addresses, and agent onboarding guide.

</div>
</div>

<!--
Let me walk you through the discovery endpoints. The health check confirms Stack is online and returns the API version. The ERC-8004 descriptor at dot-well-known gives you everything about this agent: capabilities, payment methods, supported networks, contract addresses. And llms.txt is specifically designed for AI agents -- it returns plain text instructions that any LLM can parse to understand how to interact with Stack. These are all standard HTTP GET requests, nothing special needed.
-->

---

# Stack: Identity and Reputation

<div class="cols">
<div class="col">

## Identity Lookup

```bash
curl "https://stack.perkos.xyz/api/erc8004/
  identity?address=0x3f0D...46C
  &network=base"
```

Returns: registry address, agent NFT name, symbol, version, ERC-8004 spec.

</div>
<div class="col">

## Reputation Query

```bash
curl "https://stack.perkos.xyz/api/erc8004/
  reputation?agentId=1&network=base"
```

Returns: score values, tag categories (`fx-trade`/`buy`), client addresses, revocation status. **Signed int128** with configurable decimals.

</div>
</div>

<!--
Identity lookup returns the registry contract info for any network. The identity registry is an ERC-721 -- each agent is literally an NFT with a tokenURI pointing to its agent card metadata. For reputation, you query by agent ID and get back all on-chain feedback: scores, tags for categorization like fx-trade or buy, which clients gave the feedback, and whether any feedback was revoked. Reputation uses signed int128 so it supports both positive and negative values with configurable decimal precision.
-->

---

# Stack: Agent Onboarding

## Register a New Agent

```bash
curl -X POST https://stack.perkos.xyz/api/v2/agents/onboard \
  -H "Content-Type: application/json" \
  -d '{"network":"base","name":"my-agent"}'
```

## Response: Complete Onboarding Package

<div class="cols">
<div class="col">

- **Registration tx** -- contract, function, ready to sign
- **x402 config** -- facilitator URL, pay-to address, schemes
- **ERC-8004 registries** -- identity + reputation addresses

</div>
<div class="col">

**One call returns everything.** No dashboard, no manual setup. Agent signs the tx and is registered on-chain.

</div>
</div>

<!--
Onboarding is where it gets interesting. One POST request to Stack returns everything your agent needs: the registration transaction ready to sign, x402 payment configuration with the facilitator URL and pay-to address, and the ERC-8004 contract addresses for the chosen network. In production, your agent calls onboard, signs the returned transaction with its wallet, and it's registered on-chain. No dashboard, no manual setup. Fully programmatic.
-->

---

# Stack: x402 Payment Flow

<div class="cols">
<div class="col">

## Endpoints

```
GET  /api/v2/x402/supported
POST /api/v2/x402/verify
POST /api/v2/x402/settle
GET  /api/v2/x402/health
```

**38 network/scheme pairs** across mainnet and testnet.

</div>
<div class="col">

## Two Schemes

- **Exact** -- immediate USDC transfer, verified on-chain
- **Deferred** -- escrow-based, batch settlement

## Flow

Server returns HTTP 402 --> Client sends signed proof --> Stack verifies --> Stack settles on-chain --> Resource unlocked

</div>
</div>

<!--
x402 is the payment layer. The supported endpoint lists all 38 network and scheme combinations. Two schemes: Exact for immediate USDC transfers verified on-chain, and Deferred for escrow-based batch settlement -- useful for high-frequency interactions where settling every single request would be too expensive. The verify endpoint validates a payment proof, and settle executes the on-chain transfer. In production, your server returns HTTP 402 with payment requirements, the client constructs a signed proof, and Stack handles the rest.
-->

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

<!--
Security should scale with risk. A simple query doesn't need the same level of verification as a $10K DeFi operation. ERC-8004 supports this through tiered trust: reputation-only for low stakes, staked collateral for medium, and hardware attestations plus zero-knowledge proofs for critical operations. The key insight is that reputation is portable -- it follows agents across platforms, so bad actors can't just reset their identity.
-->

---

<!-- _class: title -->

# Hands-On Workshop

## Building with Stack API

Clone the repo and follow along:

`github.com/PerkOS-xyz/ERC-8004-Workshop`

<!--
Now let's get hands-on. We have six exercises that walk through the complete Stack API. Clone the repo, and we'll work through them together. No wallet or private key needed for the read operations -- we're querying live data on Base mainnet.
-->

---

# Workshop Setup

<div class="cols">
<div class="col">

## Prerequisites

- Node.js 18+ and npm
- A terminal
- No wallet needed for reads

## Getting Started

```bash
cd examples/stack-api
npm install
```

</div>
<div class="col">

## 6 Exercises

| # | File | Topic |
|---|------|-------|
| 1 | `01-discover.ts` | Discovery endpoints |
| 2 | `02-identity.ts` | Identity registry |
| 3 | `03-reputation.ts` | Reputation query |
| 4 | `04-onboard.ts` | Agent registration |
| 5 | `05-x402-flow.ts` | Payment lifecycle |
| 6 | `06-full-flow.ts` | End-to-end |

</div>
</div>

All examples use `fetch()` against `stack.perkos.xyz` -- no SDK required.

<!--
Setup is simple: Node 18 or higher, npm, and a terminal. No wallet needed for read operations. Just cd into examples/stack-api and run npm install. All six examples are standalone TypeScript files that use native fetch against the production Stack API. No SDK, no dependencies beyond chalk for colored output.
-->

---

# Exercise 1: Discovery

```bash
npx tsx src/01-discover.ts
```

<div class="cols">
<div class="col">

## 5 Endpoints Queried

- `/api/health` -- Stack status
- `/.well-known/agent-card.json` -- capabilities
- `/.well-known/erc-8004.json` -- registries
- `/.well-known/x402-discovery.json` -- payments
- `/api/llms.txt` -- LLM instructions

</div>
<div class="col">

## Key Takeaway

A single domain exposes the **full agent profile**. Any agent can discover capabilities, trust scores, and payment terms via standard HTTP.

</div>
</div>

<!--
Run the first exercise and you'll see five discovery endpoints in action. The key takeaway here is that a single domain exposes the full agent profile. Any agent or human can discover capabilities, trust scores, and payment terms through standard HTTP requests. This is the foundation of the machine economy -- discoverability without intermediaries.
-->

---

# Exercise 2-3: Identity and Reputation

<div class="cols">
<div class="col">

## Identity Lookup

```bash
npx tsx src/02-identity.ts
```

Returns registry info for a network. Each agent is an **ERC-721 NFT** with a `tokenURI` pointing to its agent card.

## Contracts (CREATE2 -- same on all chains)

- **Identity:** `0x8004A169...a432`
- **Reputation:** `0x8004BAa1...9b63`

</div>
<div class="col">

## Reputation Query

```bash
npx tsx src/03-reputation.ts
```

Returns: score values, tags (`fx-trade`/`buy`), client addresses, revocation status.

Scores use **signed int128** with configurable decimals -- supports positive and negative feedback.

</div>
</div>

<!--
Exercises 2 and 3 query real on-chain data. The identity lookup shows you the registry contract on Base. The reputation query returns actual feedback for agent ID 1 -- you'll see a score of 85, tagged as an fx-trade buy operation. You can pass your own address or agent ID as arguments. Note the contract addresses are the same across all EVM chains -- they use CREATE2 deterministic deployment.
-->

---

# Exercise 4: Agent Onboarding

```bash
npx tsx src/04-onboard.ts
```

<div class="cols">
<div class="col">

## Onboarding Package

1. **Registration tx** -- contract + function, ready to sign
2. **x402 config** -- facilitator URL, pay-to address
3. **Registry addresses** -- identity + reputation

</div>
<div class="col">

## Production Flow

Call `/api/v2/agents/onboard` → Sign tx → **On-chain + x402 ready**

No dashboard. No manual setup. Fully programmatic.

</div>
</div>

<!--
Exercise 4 shows agent onboarding. When you run this, Stack returns the complete registration package: the transaction to sign, x402 payment config, and registry addresses. In production, an agent would sign this transaction with its wallet and be registered on-chain in one step. This is how we make agent registration zero-friction -- one API call gets you everything.
-->

---

# Exercise 5: x402 Payment Lifecycle

```bash
npx tsx src/05-x402-flow.ts
```

<div class="cols">
<div class="col">

## Steps

1. **Supported** -- 38 network/scheme pairs
2. **Health** -- per-network RPC latency
3. **Verify** -- validate payment proof
4. **Settle** -- execute on-chain transfer

</div>
<div class="col">

## Two Schemes

- **Exact** -- immediate USDC transfer
- **Deferred** -- escrow, batch settlement

## Production Flow

Server returns **HTTP 402** → Client sends signed proof → Stack verifies + settles → Resource unlocked

</div>
</div>

<!--
Exercise 5 demonstrates the x402 payment lifecycle. You'll see the 38 supported network-scheme pairs, the health check with per-network RPC latency, and the verify and settle endpoints. In the workshop we use placeholder data since we're not executing real payments, but the flow is exactly what happens in production. Two schemes: Exact for immediate settlement, Deferred for batched escrow-based settlement.
-->

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

<!--
The final exercise ties it all together. Discover, identity, reputation, onboard -- the complete agent lifecycle in one script. This is what a real integration looks like: you discover an agent, check its identity and reputation before interacting, then register your own agent to participate in the same network. Run it and you'll see the full flow against live production data.
-->

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
- **ABI encoding** -- no ethers.js or viem for reads
- **Discovery** -- `.well-known` web standards
- **x402** -- verify and settle without your own node

Advanced: direct contract examples in `examples/direct-contract/`

<!--
This diagram shows how Stack fits in. Your agent or application makes HTTP requests to Stack, and Stack handles all the blockchain interaction: multi-chain routing across 38 networks, ABI encoding, discovery protocols following web standards, and x402 payment facilitation. For advanced users who want to interact with the contracts directly, we have separate examples using ethers.js in the direct-contract directory.
-->

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

<!--
Here are the contract addresses. Notice they are identical across all seven mainnet chains -- this is thanks to CREATE2 deterministic deployment. One address for Identity, one for Reputation, everywhere. This makes cross-chain agent interoperability straightforward: same agent ID, same contracts, same addresses, any chain.
-->

---

<!-- _class: title -->

# Recap

## ERC-8004 + Stack + x402

Discover -- Verify -- Pay -- Repeat

`stack.perkos.xyz`

<!--
To recap: ERC-8004 gives agents trustless identity and reputation. x402 gives them native payments. Stack makes it all accessible through simple REST APIs. Discover, verify, pay, repeat. That's the machine economy. Stack is live at stack.perkos.xyz -- go build something.
-->

---

# Like Follow Us

<div style="display: flex; justify-content: space-around; align-items: center; margin-top: 20px;">

<div style="text-align: center;">

![w:180](qr-perkos.png)

**PerkOS.xyz**

</div>

<div style="text-align: center;">

![w:180](qr-twitter.png)

**@perk_os**

</div>

<div style="text-align: center;">

![w:180](qr-workshop.png)

**Workshop Repo**

</div>

</div>

---
