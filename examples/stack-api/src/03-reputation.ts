import chalk from "chalk";
import { stackGet, DEFAULT_NETWORK } from "./config.js";

async function main() {
  const agentId = process.argv[2] || "1";
  const network = process.argv[3] || DEFAULT_NETWORK;

  console.log(chalk.bold("Reputation Query"));
  console.log(chalk.dim(`Agent ID: ${agentId}`));
  console.log(chalk.dim(`Network: ${network}`));
  console.log();

  const res = await stackGet(`/api/erc8004/reputation?agentId=${agentId}&network=${network}`);
  const data = await res.json();

  console.log(chalk.yellow("--- Reputation Response ---"));
  console.log(JSON.stringify(data, null, 2));
  console.log();
  console.log(chalk.green("Done."));
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
