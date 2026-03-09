# Stack API Examples — ERC-8004 Workshop

These examples interact with [PerkOS Stack](https://stack.perkos.xyz), a production middleware that implements the ERC-8004 Agent Identity standard and x402 payment protocol on Base.

Instead of calling smart contracts directly, these examples use Stack's REST API via `fetch()`. This is the recommended path for workshop participants getting started with ERC-8004.

## Prerequisites

- Node.js 18+ (for native `fetch`)
- npm or yarn

## Setup

```bash
npm install
```

## Running Examples

Each example is standalone:

```bash
npx tsx src/01-discover.ts    # Discover Stack capabilities
npx tsx src/02-identity.ts    # Look up agent identity on Base
npx tsx src/03-reputation.ts  # Query reputation data
npx tsx src/04-onboard.ts     # Onboard a new agent
npx tsx src/05-x402-flow.ts   # x402 payment flow
npx tsx src/06-full-flow.ts   # End-to-end flow
```

## Stack Endpoints

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

## Advanced Examples

For direct smart contract interaction with ethers.js, see:
- `../step-by-step/` — Incremental contract examples
- `../complete-demo/` — Full demo application
