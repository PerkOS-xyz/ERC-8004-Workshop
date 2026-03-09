import chalk from "chalk";
import { stackPost, DEFAULT_NETWORK } from "./config.js";

async function main() {
  const network = process.argv[2] || DEFAULT_NETWORK;

  console.log(chalk.bold("Agent Onboarding"));
  console.log(chalk.dim(`Network: ${network}`));
  console.log();

  const payload = {
    network,
    name: "workshop-agent",
    description: "Test agent created during ERC-8004 workshop",
  };

  console.log(chalk.yellow("--- Request Body ---"));
  console.log(JSON.stringify(payload, null, 2));
  console.log();

  const res = await stackPost("/api/v2/agents/onboard", payload);
  const data = await res.json();

  console.log(chalk.yellow(`--- Response (${res.status}) ---`));
  console.log(JSON.stringify(data, null, 2));
  console.log();

  if (res.ok) {
    console.log(chalk.green("Agent onboarded."));
  } else {
    console.log(chalk.red(`Onboarding returned ${res.status}. Check the response above.`));
  }
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
