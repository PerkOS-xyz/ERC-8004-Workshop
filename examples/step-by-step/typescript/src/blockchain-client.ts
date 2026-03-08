import { ethers } from 'ethers';
import chalk from 'chalk';

export class BlockchainClient {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor(rpcUrl: string, privateKey: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async connect(): Promise<void> {
    try {
      const network = await this.provider.getNetwork();
      console.log(chalk.green(`✅ Connected to network: ${network.name} (Chain ID: ${network.chainId})`));
      
      const balance = await this.provider.getBalance(this.wallet.address);
      console.log(chalk.blue(`💰 Wallet balance: ${ethers.formatEther(balance)} ETH`));
      console.log(chalk.gray(`📍 Address: ${this.wallet.address}`));
    } catch (error) {
      throw new Error(`Failed to connect to blockchain: ${error}`);
    }
  }

  getContract(address: string, abi: any[]): ethers.Contract {
    return new ethers.Contract(address, abi, this.wallet);
  }

  async sendTransaction(contract: ethers.Contract, functionName: string, args: any[]): Promise<ethers.TransactionReceipt> {
    try {
      console.log(chalk.yellow(`⏳ Calling ${functionName}...`));
      
      const tx = await contract[functionName](...args);
      console.log(chalk.gray(`📤 Transaction hash: ${tx.hash}`));
      
      console.log(chalk.yellow('⏳ Waiting for confirmation...'));
      const receipt = await tx.wait();
      
      console.log(chalk.green(`✅ Transaction confirmed in block ${receipt.blockNumber}`));
      console.log(chalk.gray(`⛽ Gas used: ${receipt.gasUsed}`));
      
      return receipt;
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`);
    }
  }

  async callFunction(contract: ethers.Contract, functionName: string, args: any[] = []): Promise<any> {
    try {
      return await contract[functionName](...args);
    } catch (error) {
      throw new Error(`Contract call failed: ${error}`);
    }
  }

  getAddress(): string {
    return this.wallet.address;
  }

  async signMessage(message: string): Promise<string> {
    return await this.wallet.signMessage(message);
  }
}