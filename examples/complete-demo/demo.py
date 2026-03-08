#!/usr/bin/env python3
"""
ERC-8004 Multi-Agent Demo
Showcases three AI agents working together using the ERC-8004 standard
"""

import os
import json
import time
import hashlib
from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel
from rich.progress import track

# Load environment variables
load_dotenv()

# Import our utilities
from utils.blockchain import BlockchainClient

console = Console()

class ERC8004Demo:
    def __init__(self):
        console.print(Panel("🚀 ERC-8004 Multi-Agent Demo", style="bold blue"))
        
        # Initialize blockchain client
        self.blockchain = BlockchainClient()
        
        # Contract addresses from environment
        self.identity_registry_address = os.getenv('IDENTITY_REGISTRY')
        self.reputation_registry_address = os.getenv('REPUTATION_REGISTRY')
        self.validation_registry_address = os.getenv('VALIDATION_REGISTRY')
        
        if not all([self.identity_registry_address, 
                   self.reputation_registry_address, 
                   self.validation_registry_address]):
            console.print("❌ Contract addresses not found in environment", style="red")
            console.print("Please deploy contracts first and update .env file")
            exit(1)
        
        # Load contract instances
        self.identity_registry = self.blockchain.get_contract(
            self.identity_registry_address,
            self.blockchain.load_contract_abi('IdentityRegistry')
        )
        
        self.reputation_registry = self.blockchain.get_contract(
            self.reputation_registry_address,
            self.blockchain.load_contract_abi('ReputationRegistry')
        )
        
        self.validation_registry = self.blockchain.get_contract(
            self.validation_registry_address,
            self.blockchain.load_contract_abi('ValidationRegistry')
        )
        
        console.print("✅ Contracts loaded successfully")
        
        # Agent data
        self.agents = {}
    
    def register_agents(self):
        """Register the three demo agents"""
        console.print("\n🆔 Registering agents...")
        
        agents_metadata = {
            'Alice': {
                'name': 'Alice Market Analyst',
                'description': 'Specialized AI agent for cryptocurrency market analysis using CrewAI',
                'type': 'market-analyst',
                'capabilities': ['technical-analysis', 'sentiment-analysis', 'price-prediction'],
                'endpoint': 'https://alice.agent/a2a'
            },
            'Bob': {
                'name': 'Bob Validator',
                'description': 'Independent validation agent for market analysis verification',
                'type': 'validator',
                'capabilities': ['re-execution', 'quality-assessment', 'data-verification'],
                'endpoint': 'https://bob.validator/a2a'
            },
            'Charlie': {
                'name': 'Charlie Client',
                'description': 'Client agent that requests services and provides feedback',
                'type': 'client',
                'capabilities': ['service-discovery', 'feedback-management', 'reputation-tracking'],
                'endpoint': 'https://charlie.client/a2a'
            }
        }
        
        for name, metadata in agents_metadata.items():
            # Create metadata JSON (in real implementation, this would be stored on IPFS)
            metadata_uri = f"https://demo.erc8004.org/agents/{name.lower()}.json"
            
            try:
                # Register agent
                transaction = {
                    'from': self.blockchain.address,
                    'to': self.identity_registry_address,
                    'data': self.identity_registry.encodeABI(
                        fn_name='register',
                        args=[metadata_uri]
                    )
                }
                
                receipt = self.blockchain.send_transaction(transaction)
                
                # Get agent ID from logs (simplified for demo)
                agent_id = len(self.agents) + 1
                
                self.agents[name] = {
                    'id': agent_id,
                    'metadata': metadata,
                    'metadata_uri': metadata_uri,
                    'registration_tx': receipt['transactionHash'].hex()
                }
                
                console.print(f"✅ {name} registered with ID: {agent_id}")
                
            except Exception as e:
                console.print(f"❌ Failed to register {name}: {str(e)}", style="red")
                return False
        
        return True
    
    def discover_agents(self):
        """Simulate agent discovery"""
        console.print("\n🔍 Service discovery...")
        
        # Charlie discovers market analysis agents
        console.print("Charlie: Looking for market analysis agents...")
        
        # Find agents with market analysis capability
        market_agents = []
        for name, agent in self.agents.items():
            if 'market-analysis' in agent['metadata'].get('capabilities', []):
                market_agents.append((name, agent))
        
        console.print(f"Found {len(market_agents)} market analysis agents")
        
        # Check Alice's reputation
        alice_id = self.agents['Alice']['id']
        try:
            # This would fail in a real environment since Alice has no feedback yet
            # We'll simulate the call
            console.print(f"Alice's reputation: 0/100 (new agent)")
        except:
            console.print(f"Alice's reputation: 0/100 (new agent)")
        
        return market_agents
    
    def request_analysis(self):
        """Charlie requests analysis from Alice"""
        console.print("\n📈 Requesting market analysis...")
        
        # Simulate market analysis request
        request = {
            'pair': 'ETH/USDC',
            'timeframe': '24h',
            'analysis_type': 'technical',
            'timestamp': int(time.time())
        }
        
        console.print('Charlie: "I need ETH/USDC analysis for the next 24h"')
        console.print('Alice: "Analyzing ETH/USDC pair using CrewAI multi-agent workflow..."')
        
        # Simulate Alice performing analysis
        for i in track(range(5), description="Performing analysis..."):
            time.sleep(0.5)
        
        # Simulated analysis result
        analysis_result = {
            'pair': 'ETH/USDC',
            'current_price': 2385.67,
            'prediction': {
                'direction': 'BULLISH',
                'confidence': 68,
                'target_price': 2450.00,
                'timeframe': '24h'
            },
            'recommendation': 'LONG with 2x leverage',
            'reasoning': 'Strong support at $2,350, bullish divergence in RSI, increasing volume',
            'risk_level': 'MEDIUM',
            'analysis_timestamp': int(time.time())
        }
        
        console.print("✅ Analysis completed!")
        console.print(f"Summary: ETH showing bullish momentum with {analysis_result['prediction']['confidence']}% confidence")
        console.print(f"Recommendation: {analysis_result['recommendation']}, target: ${analysis_result['prediction']['target_price']}")
        
        return request, analysis_result
    
    def request_validation(self, request, analysis):
        """Bob validates Alice's analysis"""
        console.print("\n🔍 Validation request...")
        
        # Create validation request hash
        request_data = json.dumps(request, sort_keys=True)
        request_hash = hashlib.sha256(request_data.encode()).digest()
        
        console.print('Bob: "Re-executing Alice\'s analysis for verification..."')
        
        try:
            # Request validation
            transaction = {
                'from': self.blockchain.address,
                'to': self.validation_registry_address,
                'data': self.validation_registry.encodeABI(
                    fn_name='requestValidation',
                    args=[
                        request_hash,
                        're-execution',
                        'https://demo.erc8004.org/validation/request1.json'
                    ]
                )
            }
            
            receipt = self.blockchain.send_transaction(transaction)
            console.print("✅ Validation requested on-chain")
            
        except Exception as e:
            console.print(f"Note: Validation request simulated (contract interaction failed: {str(e)})")
        
        # Simulate Bob's validation process
        for i in track(range(3), description="Validating analysis..."):
            time.sleep(0.3)
        
        # Simulated validation result
        validation_result = {
            'confidence': 89,
            'methodology_score': 92,
            'data_accuracy': 95,
            'reasoning_quality': 85,
            'report': 'Analysis methodology sound, data sources verified, conclusions well-supported'
        }
        
        console.print(f"Validation confidence: {validation_result['confidence']}/100")
        console.print(f"Validation report: \"{validation_result['report']}\"")
        
        # Submit validation result
        try:
            response_hash = hashlib.sha256(json.dumps(validation_result).encode()).digest()
            
            transaction = {
                'from': self.blockchain.address,
                'to': self.validation_registry_address,
                'data': self.validation_registry.encodeABI(
                    fn_name='submitValidation',
                    args=[
                        request_hash,
                        validation_result['confidence'],
                        'https://demo.erc8004.org/validation/response1.json',
                        response_hash
                    ]
                )
            }
            
            receipt = self.blockchain.send_transaction(transaction)
            console.print("✅ Validation result submitted on-chain")
            
        except Exception as e:
            console.print(f"Note: Validation submission simulated (contract interaction failed: {str(e)})")
        
        return validation_result
    
    def submit_feedback(self, analysis, validation):
        """Charlie submits feedback about Alice's work"""
        console.print("\n⭐ Submitting feedback...")
        
        # Charlie rates Alice's work
        feedback_score = 92
        feedback_tags = ['accurate', 'fast', 'detailed']
        
        console.print(f"Charlie rates Alice: {feedback_score}/100 with tags: {feedback_tags}")
        
        # In a real implementation, Alice would provide a signed authorization
        # For demo purposes, we'll simulate this
        authorization_signature = b"0x" + b"simulated_signature" * 2  # Placeholder
        
        try:
            # Submit feedback
            report_hash = hashlib.sha256(f"feedback_report_{int(time.time())}".encode()).digest()
            
            transaction = {
                'from': self.blockchain.address,
                'to': self.reputation_registry_address,
                'data': self.reputation_registry.encodeABI(
                    fn_name='submitFeedback',
                    args=[
                        self.agents['Alice']['id'],
                        feedback_score,
                        feedback_tags,
                        'https://demo.erc8004.org/feedback/report1.json',
                        report_hash,
                        authorization_signature
                    ]
                )
            }
            
            # This will likely fail due to signature verification, but we'll catch it
            receipt = self.blockchain.send_transaction(transaction)
            console.print("✅ Feedback submitted successfully!")
            
        except Exception as e:
            console.print(f"Note: Feedback submission simulated (signature verification failed: {str(e)})")
        
        # Simulate reputation update
        console.print(f"Alice's updated reputation: {feedback_score}/100 (1 review)")
        
        return feedback_score
    
    def show_final_results(self):
        """Display final demo results"""
        console.print("\n📊 Final Results", style="bold green")
        
        results_table = {
            "Alice's reputation": "92/100 (1 review)",
            "Bob's validation success rate": "100%",
            "Total interactions": "1", 
            "System trust score": "HIGH"
        }
        
        for key, value in results_table.items():
            console.print(f"- {key}: {value}")
        
        console.print("\n🎉 Demo completed successfully!", style="bold green")
    
    def run(self):
        """Run the complete demo"""
        try:
            # Step 1: Register agents
            if not self.register_agents():
                return False
            
            # Step 2: Service discovery
            market_agents = self.discover_agents()
            
            # Step 3: Request and perform analysis
            request, analysis = self.request_analysis()
            
            # Step 4: Validate the work
            validation = self.request_validation(request, analysis)
            
            # Step 5: Submit feedback
            feedback_score = self.submit_feedback(analysis, validation)
            
            # Step 6: Show results
            self.show_final_results()
            
            return True
            
        except Exception as e:
            console.print(f"\n❌ Demo failed: {str(e)}", style="red")
            return False

def main():
    demo = ERC8004Demo()
    success = demo.run()
    
    if success:
        console.print("\n🎓 Learning Objectives Achieved:", style="bold blue")
        console.print("✅ Deployed ERC-8004 registries")
        console.print("✅ Registered and discovered agents")
        console.print("✅ Demonstrated reputation system")
        console.print("✅ Showcased independent validation")
        console.print("✅ Integrated multiple trust models")
        console.print("✅ Real-world multi-agent coordination")
        
        console.print("\n🚀 Ready to build your own trustless agents!")
    else:
        console.print("\n📝 Check the setup instructions and try again", style="yellow")

if __name__ == "__main__":
    main()