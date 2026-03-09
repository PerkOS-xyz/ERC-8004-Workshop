import chalk from "chalk";
import { stackGet, DEFAULT_ADDRESS, DEFAULT_NETWORK } from "./config.js";

async function main() {
  const address = process.argv[2] || DEFAULT_ADDRESS;
  const network = process.argv[3] || DEFAULT_NETWORK;

  console.log(chalk.bold("Identity Lookup"));
  console.log(chalk.dim(`Address: ${address}`));
  console.log(chalk.dim(`Network: ${network}`));
  console.log();

  const res = await stackGet(`/api/erc8004/identity?address=${address}&network=${network}`);
  const data = await res.json();

  console.log(chalk.yellow("--- Identity Response ---"));
  console.log(JSON.stringify(data, null, 2));
  console.log();
  console.log(chalk.green("Done."));
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
