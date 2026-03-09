# Exercise 5: x402 Payment Flow

## What it does

Explores the **x402 payment protocol** — the HTTP-native payment layer for the agent economy. Queries supported networks, payment schemes, and verifies RPC health across all chains.

## Why it matters

x402 enables pay-per-request micropayments using crypto. No credit cards, no subscriptions. Clients pay with signed USDC transfers, servers verify on-chain. It works like OAuth — but for money.

## Run

```bash
./demo-5.sh
```

## What you'll see

- Number of supported network/scheme pairs
- **Exact payments** — Immediate USDC transfer (list of supported networks)
- **Deferred payments** — Escrow-based batch settlement
- RPC health check across all networks (block numbers, latency, status)

## Key Concepts

- **HTTP 402** — The "Payment Required" status code, repurposed for crypto payments
- **Exact scheme** — Client signs EIP-3009 `transferWithAuthorization`, server settles immediately
- **Deferred scheme** — EIP-712 voucher, off-chain aggregation, batch settlement via escrow
- **Multi-chain** — Same protocol works on Base, Ethereum, Polygon, Avalanche, Celo, etc.

## Payment Flow

```
1. Client requests resource → Server returns 402 + payment requirements
2. Client signs USDC transfer (EIP-3009)
3. Client resends request with X-PAYMENT header
4. Server verifies signature → settles on-chain → returns resource
```

## API Endpoints

```
GET https://stack.perkos.xyz/api/v2/x402/supported  — List payment methods
GET https://stack.perkos.xyz/api/v2/x402/health      — Check RPC health
POST https://stack.perkos.xyz/api/v2/x402/verify     — Verify payment
POST https://stack.perkos.xyz/api/v2/x402/settle     — Settle on-chain
```
