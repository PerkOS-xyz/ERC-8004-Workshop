import chalk from "chalk";
import { stackGet, STACK_BASE_URL } from "./config.js";

async function main() {
  console.log(chalk.bold("Stack Discovery"));
  console.log(chalk.dim(`Target: ${STACK_BASE_URL}`));
  console.log();

  // Health check
  console.log(chalk.yellow("--- Health Check ---"));
  const health = await stackGet("/api/health");
  const healthData = await health.json();
  console.log(JSON.stringify(healthData, null, 2));
  console.log();

  // Agent card (A2A protocol)
  console.log(chalk.yellow("--- Agent Card ---"));
  const agentCard = await stackGet("/.well-known/agent-card.json");
  const agentCardData = await agentCard.json();
  console.log(JSON.stringify(agentCardData, null, 2));
  console.log();

  // ERC-8004 descriptor
  console.log(chalk.yellow("--- ERC-8004 Descriptor ---"));
  const erc8004 = await stackGet("/.well-known/erc-8004.json");
  const erc8004Data = await erc8004.json();
  console.log(JSON.stringify(erc8004Data, null, 2));
  console.log();

  // x402 discovery
  console.log(chalk.yellow("--- x402 Discovery ---"));
  const x402 = await stackGet("/.well-known/x402-discovery.json");
  const x402Data = await x402.json();
  console.log(JSON.stringify(x402Data, null, 2));
  console.log();

  // LLM instructions
  console.log(chalk.yellow("--- LLM Instructions ---"));
  const llms = await stackGet("/api/llms.txt");
  const llmsText = await llms.text();
  console.log(llmsText.slice(0, 500));
  if (llmsText.length > 500) console.log(chalk.dim(`... (${llmsText.length} chars total)`));
  console.log();

  console.log(chalk.green("Discovery complete."));
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
