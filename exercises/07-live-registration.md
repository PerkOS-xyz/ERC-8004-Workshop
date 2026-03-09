# Exercise 7: Live Agent Registration

## What it does

Performs a **REAL on-chain transaction** on Base mainnet. Registers a new agent in the ERC-8004 Identity Registry and verifies the registration — all live, all verifiable on BaseScan.

## Why it matters

This is not a simulation. The transaction is real. The agent identity is minted as an NFT. Anyone can verify it on BaseScan. This is the trustless agent economy in action.

## Prerequisites

- A wallet with **~$0.01 ETH on Base** for gas
- Private key set in `.env` file

## Run

```bash
# Option 1: Use demo-7.sh (generates wallet, waits for funding, registers)
./demo-7.sh

# Option 2: Manual with existing wallet
echo 'PERKOS_PRIVATE_KEY=0xYOUR_KEY' > .env
npx @perkos/cli workshop 7
```

## What you'll see

1. **Wallet info** — Address and ETH balance on Base
2. **Onboarding package** — From PerkOS Stack API
3. **Registration check** — Is this wallet already registered?
4. **Transaction** — Signs and submits `register()` to Base mainnet
5. **Confirmation** — Block number, gas used, tx hash
6. **BaseScan link** — Verify the transaction yourself
7. **Verification** — Confirms AgentIdentity NFT was minted

## On-Chain Details

```
Contract:  0x8004A169FB4a3325136EB29fA0ceB6D2e539a432 (Identity Registry)
Function:  register()
Network:   Base mainnet (chain 8453)
Gas:       ~107,000
Result:    AgentIdentity NFT minted to your wallet
```

## Verify on BaseScan

After running, check the transaction:
```
https://basescan.org/tx/YOUR_TX_HASH
```

Or check the wallet's NFT:
```
https://basescan.org/address/YOUR_WALLET_ADDRESS
```

## Flow

```
1. Read private key from .env
2. Check ETH balance on Base
3. Call Stack API → get onboarding package
4. Check if already registered (balanceOf > 0)
5. Sign register() transaction
6. Submit to Base mainnet
7. Wait for block confirmation
8. Verify NFT minted on-chain
```
