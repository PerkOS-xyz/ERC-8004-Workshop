"""
Blockchain utilities for ERC-8004 demo
"""
import os
from web3 import Web3
from eth_account import Account
import json

class BlockchainClient:
    def __init__(self, rpc_url=None, private_key=None):
        self.rpc_url = rpc_url or os.getenv('RPC_URL', 'http://localhost:8545')
        self.private_key = private_key or os.getenv('PRIVATE_KEY')
        
        # Initialize Web3
        self.w3 = Web3(Web3.HTTPProvider(self.rpc_url))
        
        if not self.w3.is_connected():
            raise Exception(f"Failed to connect to blockchain at {self.rpc_url}")
        
        # Setup account
        if self.private_key:
            self.account = Account.from_key(self.private_key)
            self.address = self.account.address
        else:
            raise Exception("Private key is required")
    
    def get_contract(self, address, abi):
        """Get contract instance"""
        return self.w3.eth.contract(address=address, abi=abi)
    
    def send_transaction(self, transaction):
        """Send a transaction"""
        # Estimate gas
        transaction['gas'] = self.w3.eth.estimate_gas(transaction)
        
        # Get nonce
        transaction['nonce'] = self.w3.eth.get_transaction_count(self.address)
        
        # Sign transaction
        signed_txn = self.w3.eth.account.sign_transaction(transaction, self.private_key)
        
        # Send transaction
        tx_hash = self.w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        
        # Wait for receipt
        receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        return receipt
    
    def load_contract_abi(self, contract_name):
        """Load contract ABI from compiled artifacts"""
        abi_path = f"contracts/out/{contract_name}.sol/{contract_name}.json"
        
        if os.path.exists(abi_path):
            with open(abi_path, 'r') as f:
                artifact = json.load(f)
                return artifact['abi']
        else:
            # Fallback to minimal ABI for demo
            return self._get_minimal_abi(contract_name)
    
    def _get_minimal_abi(self, contract_name):
        """Minimal ABIs for demo purposes"""
        abis = {
            'IdentityRegistry': [
                {
                    "inputs": [{"type": "string", "name": "tokenURI_"}],
                    "name": "register",
                    "outputs": [{"type": "uint256", "name": ""}],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{"type": "uint256", "name": "agentId"}],
                    "name": "tokenURI", 
                    "outputs": [{"type": "string", "name": ""}],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            'ReputationRegistry': [
                {
                    "inputs": [
                        {"type": "uint256", "name": "agentId"},
                        {"type": "uint8", "name": "score"},
                        {"type": "string[]", "name": "tags"},
                        {"type": "string", "name": "reportURI"},
                        {"type": "bytes32", "name": "reportHash"},
                        {"type": "bytes", "name": "authorization"}
                    ],
                    "name": "submitFeedback",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{"type": "uint256", "name": "agentId"}],
                    "name": "getAverageScore",
                    "outputs": [{"type": "uint256", "name": ""}],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            'ValidationRegistry': [
                {
                    "inputs": [
                        {"type": "bytes32", "name": "requestHash"},
                        {"type": "string", "name": "validationType"}, 
                        {"type": "string", "name": "requestURI"}
                    ],
                    "name": "requestValidation",
                    "outputs": [],
                    "stateMutability": "nonpayable", 
                    "type": "function"
                },
                {
                    "inputs": [
                        {"type": "bytes32", "name": "requestHash"},
                        {"type": "uint8", "name": "result"},
                        {"type": "string", "name": "responseURI"},
                        {"type": "bytes32", "name": "responseHash"}
                    ],
                    "name": "submitValidation",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        }
        
        return abis.get(contract_name, [])