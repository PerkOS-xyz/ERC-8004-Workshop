import { ethers } from 'ethers';
import { ContractABI, NetworkConfig, TransactionReceipt } from '../types';

export class BlockchainClient {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  
  constructor(
    private config: NetworkConfig,
    privateKey: string
  ) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.provider.getNetwork();
      return true;
    } catch (error) {
      return false;
    }
  }

  getAddress(): string {
    return this.wallet.address;
  }

  async getBalance(): Promise<string> {
    const balance = await this.provider.getBalance(this.wallet.address);
    return ethers.formatEther(balance);
  }

  getContract(address: string, abi: ContractABI[]): ethers.Contract {
    return new ethers.Contract(address, abi, this.wallet);
  }

  async sendTransaction(
    contract: ethers.Contract,
    functionName: string,
    args: any[] = [],
    overrides: any = {}
  ): Promise<TransactionReceipt> {
    try {
      const tx = await contract[functionName](...args, {
        gasLimit: 500000,
        ...overrides
      });
      
      const receipt = await tx.wait();
      
      return {
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status
      };
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`);
    }
  }

  async callFunction(
    contract: ethers.Contract,
    functionName: string,
    args: any[] = []
  ): Promise<any> {
    try {
      return await contract[functionName](...args);
    } catch (error) {
      throw new Error(`Contract call failed: ${error}`);
    }
  }

  // Contract ABIs for the ERC-8004 registries
  static getContractABI(contractName: string): ContractABI[] {
    const abis: Record<string, ContractABI[]> = {
      IdentityRegistry: [
        {
          inputs: [{ internalType: 'string', name: 'tokenURI_', type: 'string' }],
          name: 'register',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [{ internalType: 'uint256', name: 'agentId', type: 'uint256' }],
          name: 'tokenURI',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [{ internalType: 'uint256', name: 'agentId', type: 'uint256' }],
          name: 'ownerOf',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [{ internalType: 'uint256', name: 'agentId', type: 'uint256' }],
          name: 'agentExists',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      ReputationRegistry: [
        {
          inputs: [
            { internalType: 'uint256', name: 'agentId', type: 'uint256' },
            { internalType: 'uint8', name: 'score', type: 'uint8' },
            { internalType: 'string[]', name: 'tags', type: 'string[]' },
            { internalType: 'string', name: 'reportURI', type: 'string' },
            { internalType: 'bytes32', name: 'reportHash', type: 'bytes32' },
            { internalType: 'bytes', name: 'authorization', type: 'bytes' }
          ],
          name: 'submitFeedback',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [{ internalType: 'uint256', name: 'agentId', type: 'uint256' }],
          name: 'getAverageScore',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [{ internalType: 'uint256', name: 'agentId', type: 'uint256' }],
          name: 'getFeedbackCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      ValidationRegistry: [
        {
          inputs: [
            { internalType: 'bytes32', name: 'requestHash', type: 'bytes32' },
            { internalType: 'string', name: 'validationType', type: 'string' },
            { internalType: 'string', name: 'requestURI', type: 'string' }
          ],
          name: 'requestValidation',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'requestHash', type: 'bytes32' },
            { internalType: 'uint8', name: 'result', type: 'uint8' },
            { internalType: 'string', name: 'responseURI', type: 'string' },
            { internalType: 'bytes32', name: 'responseHash', type: 'bytes32' }
          ],
          name: 'submitValidation',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'requestHash', type: 'bytes32' }],
          name: 'getConsensusResult',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          stateMutability: 'view',
          type: 'function'
        }
      ]
    };

    return abis[contractName] || [];
  }

  // Utility functions
  static hashString(input: string): string {
    return ethers.keccak256(ethers.toUtf8Bytes(input));
  }

  static hashObject(obj: any): string {
    const jsonString = JSON.stringify(obj, Object.keys(obj).sort());
    return ethers.keccak256(ethers.toUtf8Bytes(jsonString));
  }

  async signMessage(message: string): Promise<string> {
    return await this.wallet.signMessage(message);
  }

  static verifySignature(message: string, signature: string, expectedAddress: string): boolean {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    } catch {
      return false;
    }
  }
}