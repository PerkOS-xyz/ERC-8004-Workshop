# ERC-8004 Workshop — Guion de Presentacion

---

## Slide 1: Title — ERC-8004: The Trustless Agent Economy

Welcome everyone to the ERC-8004 Workshop by PerkOS. Today we'll learn how to build trustless agent infrastructure using on-chain identity, reputation, and payments. By the end of this session, you'll know how to discover, verify, and onboard AI agents using the PerkOS Stack.

---

## Slide 2: What is ERC-8004?

The problem today is trust. When an AI agent claims it can do something, how do you verify that? There's no onchain track record, no portable identity. ERC-8004 solves this with three registries: Identity for discovery and portable IDs, Reputation for feedback and performance scores, and Validation for cryptographic task verification. All on-chain, all permissionless, all interoperable across platforms.

---

## Slide 3: How Onchain Agents Work

Each agent starts as an ERC-721 NFT -- a unique, persistent on-chain identity. The agent card stores its name, capabilities, and API endpoints. Once registered, the agent operates as a sovereign actor with its own wallet, signing transactions and negotiating with other agents. You can discover agents by querying the registries directly or through tools like 8004scan.

---

## Slide 4: Infrastructure for the Machine Economy

This is the full stack for the machine economy. ERC-8004 handles trust -- who is this agent, can I trust them. x402 handles payment -- HTTP 402 Payment Required, native machine-to-machine transactions. MCP and A2A handle communication -- standardized protocols for tool use and agent messaging. The end-to-end flow is: discover via A2A, verify via ERC-8004, pay via x402, done. We deploy on L2s like Base, Celo, and Avalanche for sub-cent transaction fees.

---

## Slide 5: Introducing Stack

Stack is the PerkOS middleware that makes all of this accessible via REST APIs. Instead of writing Solidity or using ethers.js to interact with contracts directly, you just call Stack endpoints. It handles multi-chain routing, ABI encoding, and follows web standards with dot-well-known discovery endpoints. Currently supports 38 networks including all major L2s. Everything you need to integrate ERC-8004 into your application is one HTTP call away.

---

## Slide 6: Stack — Discovery in Practice

Let me walk you through the discovery endpoints. The health check confirms Stack is online and returns the API version. The ERC-8004 descriptor at dot-well-known gives you everything about this agent: capabilities, payment methods, supported networks, contract addresses. And llms.txt is specifically designed for AI agents -- it returns plain text instructions that any LLM can parse to understand how to interact with Stack. These are all standard HTTP GET requests, nothing special needed.

---

## Slide 7: Stack — Identity and Reputation

Identity lookup returns the registry contract info for any network. The identity registry is an ERC-721 -- each agent is literally an NFT with a tokenURI pointing to its agent card metadata. For reputation, you query by agent ID and get back all on-chain feedback: scores, tags for categorization like fx-trade or buy, which clients gave the feedback, and whether any feedback was revoked. Reputation uses signed int128 so it supports both positive and negative values with configurable decimal precision.

---

## Slide 8: Stack — Agent Onboarding

Onboarding is where it gets interesting. One POST request to Stack returns everything your agent needs: the registration transaction ready to sign, x402 payment configuration with the facilitator URL and pay-to address, and the ERC-8004 contract addresses for the chosen network. In production, your agent calls onboard, signs the returned transaction with its wallet, and it's registered on-chain. No dashboard, no manual setup. Fully programmatic.

---

## Slide 9: Stack — x402 Payment Flow

x402 is the payment layer. The supported endpoint lists all 38 network and scheme combinations. Two schemes: Exact for immediate USDC transfers verified on-chain, and Deferred for escrow-based batch settlement -- useful for high-frequency interactions where settling every single request would be too expensive. The verify endpoint validates a payment proof, and settle executes the on-chain transfer. In production, your server returns HTTP 402 with payment requirements, the client constructs a signed proof, and Stack handles the rest.

---

## Slide 10: Hybrid Trust Models and Security

Security should scale with risk. A simple query doesn't need the same level of verification as a $10K DeFi operation. ERC-8004 supports this through tiered trust: reputation-only for low stakes, staked collateral for medium, and hardware attestations plus zero-knowledge proofs for critical operations. The key insight is that reputation is portable -- it follows agents across platforms, so bad actors can't just reset their identity.

---

## Slide 11: Hands-On Workshop

Now let's get hands-on. We have six exercises that walk through the complete Stack API. Clone the repo, and we'll work through them together. No wallet or private key needed for the read operations -- we're querying live data on Celo mainnet.

---

## Slide 12: Workshop Setup

Setup is simple: Node 18 or higher, npm, and a terminal. No wallet needed for read operations. Just cd into examples/stack-api and run npm install. All six examples are standalone TypeScript files that use native fetch against the production Stack API. No SDK, no dependencies beyond chalk for colored output.

---

## Slide 13: Exercise 1 — Discovery

Run the first exercise and you'll see five discovery endpoints in action. The key takeaway here is that a single domain exposes the full agent profile. Any agent or human can discover capabilities, trust scores, and payment terms through standard HTTP requests. This is the foundation of the machine economy -- discoverability without intermediaries.

---

## Slide 14: Exercise 2-3 — Identity and Reputation

Exercises 2 and 3 query real on-chain data. The identity lookup shows you the registry contract on Celo. The reputation query returns actual feedback for agent ID 1 -- you'll see a score of 85, tagged as an fx-trade buy operation. You can pass your own address or agent ID as arguments. Note the contract addresses are the same across all EVM chains -- they use CREATE2 deterministic deployment.

---

## Slide 15: Exercise 4 — Agent Onboarding

Exercise 4 shows agent onboarding. When you run this, Stack returns the complete registration package: the transaction to sign, x402 payment config, and registry addresses. In production, an agent would sign this transaction with its wallet and be registered on-chain in one step. This is how we make agent registration zero-friction -- one API call gets you everything.

---

## Slide 16: Exercise 5 — x402 Payment Lifecycle

Exercise 5 demonstrates the x402 payment lifecycle. You'll see the 38 supported network-scheme pairs, the health check with per-network RPC latency, and the verify and settle endpoints. In the workshop we use placeholder data since we're not executing real payments, but the flow is exactly what happens in production. Two schemes: Exact for immediate settlement, Deferred for batched escrow-based settlement.

---

## Slide 17: Exercise 6 — Full Integration Flow

The final exercise ties it all together. Discover, identity, reputation, onboard -- the complete agent lifecycle in one script. This is what a real integration looks like: you discover an agent, check its identity and reputation before interacting, then register your own agent to participate in the same network. Run it and you'll see the full flow against live production data.

---

## Slide 18: Architecture Overview

This diagram shows how Stack fits in. Your agent or application makes HTTP requests to Stack, and Stack handles all the blockchain interaction: multi-chain routing across 38 networks, ABI encoding, discovery protocols following web standards, and x402 payment facilitation. For advanced users who want to interact with the contracts directly, we have separate examples using ethers.js in the direct-contract directory.

---

## Slide 19: Key Contract Addresses

Here are the contract addresses. Notice they are identical across all seven mainnet chains -- this is thanks to CREATE2 deterministic deployment. One address for Identity, one for Reputation, everywhere. This makes cross-chain agent interoperability straightforward: same agent ID, same contracts, same addresses, any chain.

---

## Slide 20: Recap

To recap: ERC-8004 gives agents trustless identity and reputation. x402 gives them native payments. Stack makes it all accessible through simple REST APIs. Discover, verify, pay, repeat. That's the machine economy. Stack is live at stack.perkos.xyz -- go build something.

---

## Slide 21: Like Follow Us

Scan the QR codes to visit PerkOS.xyz, follow @perk_os on X, and access the workshop repo on GitHub.
