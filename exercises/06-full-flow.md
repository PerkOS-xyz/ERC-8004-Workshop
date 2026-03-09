# Exercise 6: Full End-to-End Flow

## What it does

Combines all previous exercises into the **complete agent lifecycle** — 4 API calls that demonstrate the full ERC-8004 + x402 flow.

## Why it matters

This is the real-world flow: discover an agent, verify its identity, check its reputation, and onboard a new agent. All in seconds, all through open APIs.

## Run

```bash
./demo-6.sh
```

## What you'll see

1. **Discover** — Health check, service version
2. **Identity** — On-chain registry lookup on Base
3. **Reputation** — Score and feedback from on-chain data
4. **Onboard** — Full registration package with payment config

## The Agent Lifecycle

```
Discover → Identity → Reputation → Onboard → Pay → Repeat
    │          │           │           │        │
    └── API ───┴── Chain ──┴── Chain ──┴── API ─┴── x402
```

## Key Takeaway

- All data is on-chain — verifiable by anyone
- All APIs are open — no vendor lock-in
- 4 API calls = complete agent lifecycle
- Works on any EVM chain with the same contract addresses
