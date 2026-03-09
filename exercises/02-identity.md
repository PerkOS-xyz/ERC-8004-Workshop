# Exercise 2: Identity Lookup

## What it does

Queries the **ERC-8004 Identity Registry** smart contract on **Base mainnet** to verify an agent's on-chain identity.

## Why it matters

Identity is on-chain and verifiable by anyone. The Identity Registry is deployed at the **same address on every EVM chain** using CREATE2 — no need to look up different addresses per chain.

## Run

```bash
./demo-2.sh
```

## What you'll see

- Network: Base (chain 8453)
- Registry contract address
- Contract name: `AgentIdentity` (ERC-721 NFT)
- ERC-8004 version

## Key Concepts

- **Identity Registry** — ERC-721 contract where agents register their on-chain identity
- **CREATE2** — Deterministic deployment that ensures the same contract address on all chains
- **On-chain verification** — Anyone can verify an agent's identity without trusting a third party

## Contract

```
Identity Registry: 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432
Network: Base mainnet (chain 8453)
Standard: ERC-721 (AgentIdentity NFT)
```

## API Endpoint

```
GET https://stack.perkos.xyz/api/erc8004/identity?address=0x...&network=base
```
