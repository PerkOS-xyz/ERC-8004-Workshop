# Exercise 4: Agent Onboarding

## What it does

Calls the PerkOS Stack API to get a **complete onboarding package** for a new agent. One POST request returns everything needed to register on-chain and accept payments.

## Why it matters

Traditional agent onboarding requires multiple manual steps: deploy contracts, configure payment, set up identity. With PerkOS Stack, one API call returns a ready-to-sign transaction, payment configuration, and registry addresses.

## Run

```bash
./demo-4.sh
```

## What you'll see

- **Registration Transaction** — Contract address, function name, network (ready to sign and submit)
- **x402 Payment Config** — Facilitator URL, payment receiver, USDC asset, supported schemes
- **ERC-8004 Registries** — Identity and Reputation contract addresses

## Key Concepts

- **One-call onboarding** — Single POST returns complete registration package
- **Ready-to-sign tx** — The response includes the exact transaction to submit on-chain
- **x402 config** — Payment configuration for accepting micropayments
- **Fully programmatic** — No dashboard, no manual setup

## API Endpoint

```
POST https://stack.perkos.xyz/api/v2/agents/onboard
Body: { "network": "base", "name": "my-agent", "description": "..." }
```

## Response includes

```json
{
  "registration": { "to": "0x8004...", "function": "register()", "network": "base" },
  "x402": { "facilitator": "https://stack.perkos.xyz", "schemes": ["exact", "deferred"] },
  "erc8004": { "identityRegistry": "0x8004...", "reputationRegistry": "0x8004..." }
}
```
