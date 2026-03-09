import chalk from "chalk";
import { stackGet, stackPost } from "./config.js";

async function main() {
  console.log(chalk.bold("x402 Payment Flow"));
  console.log();

  // Step 1: Check supported networks
  console.log(chalk.yellow("--- Step 1: Supported Networks ---"));
  const supported = await stackGet("/api/v2/x402/supported");
  const supportedData = await supported.json();
  console.log(JSON.stringify(supportedData, null, 2));
  console.log();

  // Step 2: Detailed health (DB latency, network checks)
  console.log(chalk.yellow("--- Step 2: x402 Health ---"));
  const health = await stackGet("/api/v2/x402/health");
  const healthData = await health.json();
  console.log(JSON.stringify(healthData, null, 2));
  console.log();

  // Step 3: Verify a payment (demonstration with placeholder data)
  console.log(chalk.yellow("--- Step 3: Verify Payment ---"));
  const verifyPayload = {
    payment: "0xDEADBEEF",
    network: "celo",
    resource: "https://example.com/protected",
  };
  console.log(chalk.dim("Request:"), JSON.stringify(verifyPayload));
  const verify = await stackPost("/api/v2/x402/verify", verifyPayload);
  const verifyData = await verify.json();
  console.log(chalk.dim(`Status: ${verify.status}`));
  console.log(JSON.stringify(verifyData, null, 2));
  console.log();

  // Step 4: Settle a payment (demonstration with placeholder data)
  console.log(chalk.yellow("--- Step 4: Settle Payment ---"));
  const settlePayload = {
    payment: "0xDEADBEEF",
    network: "celo",
  };
  console.log(chalk.dim("Request:"), JSON.stringify(settlePayload));
  const settle = await stackPost("/api/v2/x402/settle", settlePayload);
  const settleData = await settle.json();
  console.log(chalk.dim(`Status: ${settle.status}`));
  console.log(JSON.stringify(settleData, null, 2));
  console.log();

  console.log(chalk.green("x402 flow complete."));
  console.log(chalk.dim("Note: verify/settle used placeholder data. In production, provide real payment proofs."));
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
