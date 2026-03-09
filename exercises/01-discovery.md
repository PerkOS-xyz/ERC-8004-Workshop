# Exercise 1: Discovery

## What it does

Queries 5 standard discovery endpoints that every ERC-8004 compliant agent exposes:

1. **`/api/health`** — Agent health and version
2. **`/.well-known/agent-card.json`** — ERC-8004 agent identity card (capabilities, networks, schemes)
3. **`/.well-known/erc-8004.json`** — ERC-8004 descriptor
4. **`/.well-known/x402-discovery.json`** — x402 payment methods and supported networks
5. **`/api/llms.txt`** — Machine-readable guide for AI agents

## Why it matters

A single domain (`stack.perkos.xyz`) exposes the full agent profile. Any agent or client can discover capabilities automatically — no documentation needed, no manual integration.

## Run

```bash
./demo-1.sh
```

## What you'll see

- Health status and version
- Agent ID (wallet address)
- Number of supported chains (mainnet + testnet)
- Payment schemes (exact, deferred)
- x402 payment method count
- LLM guide size

## Key Concepts

- **Agent Card** — Standard JSON that describes an agent's capabilities
- **x402 Discovery** — How clients find payment methods
- **llms.txt** — Like robots.txt but for AI agents

## API Endpoint

```
GET https://stack.perkos.xyz/api/health
GET https://stack.perkos.xyz/.well-known/agent-card.json
GET https://stack.perkos.xyz/.well-known/erc-8004.json
GET https://stack.perkos.xyz/.well-known/x402-discovery.json
GET https://stack.perkos.xyz/api/llms.txt
```
