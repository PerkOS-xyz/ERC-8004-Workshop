#!/bin/bash

echo "📦 Installing Foundry dependencies..."

# Install OpenZeppelin contracts
forge install openzeppelin/openzeppelin-contracts@v5.0.0 --no-commit

# Install Forge standard library  
forge install foundry-rs/forge-std --no-commit

echo "✅ Foundry dependencies installed"
echo ""
echo "📋 Installed packages:"
echo "- OpenZeppelin Contracts v5.0.0"
echo "- Forge Standard Library"
echo ""
echo "🔧 Next steps:"
echo "1. forge build"
echo "2. forge test"