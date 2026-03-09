# Exercise 3: Reputation Query

## What it does

Reads **on-chain reputation data** for Agent #1 from the Reputation Registry on Base mainnet. Shows score, feedback count, unique clients, and individual feedback entries.

## Why it matters

Reputation is transparent, immutable, and portable. It follows agents across platforms and protocols. No single entity controls the ratings — they live on-chain.

## Run

```bash
./demo-3.sh
```

## What you'll see

- Agent ID and overall score (out of 100)
- Total feedback count
- Number of unique clients
- Individual feedback entries with scores, client addresses, and categories
- Registry contract address

## Key Concepts

- **Reputation Registry** — Smart contract storing agent feedback on-chain
- **Portable reputation** — Score follows the agent across any platform reading the same contract
- **Transparent scoring** — All feedback is publicly verifiable on BaseScan
- **Client diversity** — Multiple unique clients providing feedback increases trust

## Contract

```
Reputation Registry: 0x8004BAa17C55a88189AE136b182e5fdA19dE9b63
Network: Base mainnet (chain 8453)
```

## API Endpoint

```
GET https://stack.perkos.xyz/api/erc8004/reputation?agentId=1&network=base
```
