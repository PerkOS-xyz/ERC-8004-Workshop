import chalk from "chalk";
import { stackGet, stackPost, DEFAULT_ADDRESS, DEFAULT_NETWORK } from "./config.js";

async function main() {
  const address = process.argv[2] || DEFAULT_ADDRESS;
  const network = process.argv[3] || DEFAULT_NETWORK;

  console.log(chalk.bold("Full ERC-8004 Flow via Stack API"));
  console.log(chalk.dim(`Address: ${address} | Network: ${network}`));
  console.log();

  // 1. Discover
  console.log(chalk.yellow("=== Step 1: Discover ==="));
  const health = await stackGet("/api/health");
  const healthData = await health.json();
  console.log("Health:", JSON.stringify(healthData));

  const erc8004 = await stackGet("/.well-known/erc-8004.json");
  const erc8004Data = await erc8004.json();
  console.log("ERC-8004 version:", (erc8004Data as any).version || "see full response");
  console.log();

  // 2. Identity lookup
  console.log(chalk.yellow("=== Step 2: Identity ==="));
  const identity = await stackGet(`/api/erc8004/identity?address=${address}&network=${network}`);
  const identityData = await identity.json();
  console.log(JSON.stringify(identityData, null, 2));
  console.log();

  // 3. Reputation
  console.log(chalk.yellow("=== Step 3: Reputation ==="));
  const reputation = await stackGet(`/api/erc8004/reputation?agentId=1&network=${network}`);
  const reputationData = await reputation.json();
  console.log(JSON.stringify(reputationData, null, 2));
  console.log();

  // 4. Onboard
  console.log(chalk.yellow("=== Step 4: Onboard ==="));
  const onboard = await stackPost("/api/v2/agents/onboard", {
    network,
    name: "workshop-full-flow",
    description: "Agent created during full flow example",
  });
  const onboardData = await onboard.json();
  console.log(`Status: ${onboard.status}`);
  console.log(JSON.stringify(onboardData, null, 2));
  console.log();

  console.log(chalk.green("Full flow complete."));
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
