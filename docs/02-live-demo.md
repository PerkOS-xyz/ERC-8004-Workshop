# Live Demo: Running the Workshop Examples

![Workshop Demo](workshop-demo.svg)

This guide walks through each exercise step by step. All examples run against **Base mainnet** via `stack.perkos.xyz`.

## Setup

```bash
git clone https://github.com/PerkOS-xyz/ERC-8004-Workshop.git
cd ERC-8004-Workshop/examples/stack-api
npm install
```

No wallet or private key needed for read operations.

---

## Exercise 1: Discovery

**Command:**
```bash
npx tsx src/01-discover.ts
```

**What it does:** Queries 5 discovery endpoints on Stack.

**Expected output:**
```
Stack Discovery
Target: https://stack.perkos.xyz

--- Health Check ---
{
  "status": "healthy",
  "service": "perkos-stack",
  "version": "2.0.0"
}

--- Agent Card ---
{
  "id": "0x3f0D7b9916212fA0A9Ac0EF8f72a25EB56F7046C",
  "type": "Agent",
  "name": "Stack",
  "capabilities": ["x402-v2", "erc-8004-discovery", "erc-8004-reputation", ...],
  "paymentMethods": [{ "scheme": "exact", "network": "base", ... }, ...],
  "networks": { "mainnet": ["avalanche","celo","base",...], "testnet": [...] }
}

--- ERC-8004 Descriptor ---
(registry addresses, reputation config, supported trust models)

--- x402 Discovery ---
(facilitator info, endpoints, 38 payment methods, SLA guarantees)

--- LLM Instructions ---
(plain-text agent API guide for AI agents)

Discovery complete.
```

**Key takeaway:** A single domain exposes the full agent profile — capabilities, trust scores, and payment terms via standard HTTP.

---

## Exercise 2: Identity Lookup

**Command:**
```bash
npx tsx src/02-identity.ts
# Custom address:
npx tsx src/02-identity.ts 0xYOUR_ADDRESS base
```

**What it does:** Queries the ERC-8004 Identity Registry on Base.

**Expected output:**
```
Identity Lookup
Address: 0x3f0D7b9916212fA0A9Ac0EF8f72a25EB56F7046C
Network: base

--- Identity Response ---
{
  "network": "base",
  "registryAddress": "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
  "name": "AgentIdentity",
  "symbol": "AGENT",
  "version": "2.0.0",
  "spec": "ERC-8004"
}

Done.
```

**Key takeaway:** The Identity Registry is an ERC-721 — each agent is an NFT. Same contract address on every EVM chain (CREATE2).

---

## Exercise 3: Reputation Query

**Command:**
```bash
npx tsx src/03-reputation.ts
# Custom agent:
npx tsx src/03-reputation.ts 1 base
```

**What it does:** Queries on-chain reputation for Agent #1 on Base.

**Expected output:**
```
Reputation Query
Agent ID: 1
Network: base

--- Reputation Response ---
{
  "agentId": "1",
  "summary": {
    "count": "11",
    "summaryValue": "86",
    "formattedSummary": "86"
  },
  "feedback": [
    {
      "client": "0x3975...c228",
      "value": "100",
      "tag1": "get top 1 rank >",
      "tag2": "t.me/agent_bldr",
      "isRevoked": false
    },
    {
      "client": "0x718B...D136",
      "value": "100",
      "tag1": "tip",
      "tag2": "agent",
      "isRevoked": false
    },
    ... (11 feedback entries from 5 unique clients)
  ],
  "totalClients": 5,
  "registryAddress": "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63"
}

Done.
```

**Key takeaway:** Real on-chain data — Agent #1 has 11 feedback entries from 5 clients, average score 86. Tags categorize the type of interaction (tips, worker ratings, quality scores).

---

## Exercise 4: Agent Onboarding

**Command:**
```bash
npx tsx src/04-onboard.ts
```

**What it does:** Requests a complete onboarding package from Stack.

**Expected output:**
```
Agent Onboarding
Network: base

--- Request Body ---
{
  "network": "base",
  "name": "workshop-agent",
  "description": "Test agent created during ERC-8004 workshop"
}

--- Response (200) ---
{
  "success": true,
  "registration": {
    "to": "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
    "network": "base",
    "function": "register()",
    "description": "Register as an agent in the ERC-8004 Identity Registry"
  },
  "x402": {
    "facilitator": "https://stack.perkos.xyz",
    "payTo": "0x3f0D7b9916212fA0A9Ac0EF8f72a25EB56F7046C",
    "network": "base",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "schemes": ["exact", "deferred"]
  },
  "erc8004": {
    "identityRegistry": "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
    "reputationRegistry": "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63",
    "network": "base"
  },
  "message": "Sign the registration transaction, then use x402 config for payments."
}

Done.
```

**Key takeaway:** One API call returns everything — registration tx ready to sign, x402 payment config, and registry addresses. No dashboard, no manual setup.

---

## Exercise 5: x402 Payment Flow

**Command:**
```bash
npx tsx src/05-x402-flow.ts
```

**What it does:** Demonstrates the x402 payment lifecycle — supported networks, health, verify, settle.

**Expected output:**
```
x402 Payment Flow

--- Step 1: Supported Networks ---
{
  "kinds": [
    { "scheme": "exact", "network": "avalanche" },
    { "scheme": "exact", "network": "celo" },
    { "scheme": "exact", "network": "base" },
    { "scheme": "exact", "network": "ethereum" },
    { "scheme": "exact", "network": "polygon" },
    { "scheme": "exact", "network": "arbitrum" },
    { "scheme": "exact", "network": "optimism" },
    ... (38 network/scheme pairs total)
    { "scheme": "deferred", "network": "avalanche" },
    { "scheme": "deferred", "network": "base" }
  ]
}

--- Step 2: x402 Health ---
(per-network RPC latency and block numbers)

--- Step 3: Verify ---
(validates payment proof — uses placeholder data in workshop)

--- Step 4: Settle ---
(executes settlement — uses placeholder data in workshop)

Done.
```

**Key takeaway:** Two schemes — Exact (immediate USDC transfer) and Deferred (escrow batch settlement). 38 network/scheme pairs across mainnet and testnet.

---

## Exercise 6: Full End-to-End Flow

**Command:**
```bash
npx tsx src/06-full-flow.ts
```

**What it does:** Runs the complete agent lifecycle in one script.

**Expected output:**
```
Full End-to-End Flow

--- Step 1: Discover ---
Health: healthy (v2.0.0)
ERC-8004 descriptor loaded

--- Step 2: Identity ---
Registry: 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432
Spec: ERC-8004 v2.0.0

--- Step 3: Reputation ---
Agent #1: score 86, 11 feedbacks, 5 clients

--- Step 4: Onboard ---
Registration tx ready, x402 config received
"Sign the registration transaction, then use x402 config for payments."

Full flow complete.
```

**Key takeaway:** This is how a real integration works — discover an agent, verify identity and reputation, then register your own agent to participate.

---

## Contract Addresses (All EVM Chains)

| Registry | Address |
|---|---|
| Identity | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| Reputation | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` |

Same addresses on Base, Celo, Avalanche, Ethereum, Polygon, Arbitrum, Optimism (CREATE2 deployment).

## Stack API Base URL

```
https://stack.perkos.xyz
```
