#!/bin/bash

# ERC-8004 Workshop Setup Script (TypeScript)
echo "🚀 Setting up ERC-8004 Workshop Demo (TypeScript)..."

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi
echo "✅ npm $(npm -v) found"

# Check if Foundry is installed
if ! command -v forge &> /dev/null; then
    echo "📦 Installing Foundry..."
    curl -L https://foundry.paradigm.xyz | bash
    
    # Source the new PATH
    if [ -f ~/.bashrc ]; then
        source ~/.bashrc
    fi
    
    # Run foundryup
    if command -v foundryup &> /dev/null; then
        foundryup
    else
        echo "❌ Foundry installation failed. Please install manually:"
        echo "curl -L https://foundry.paradigm.xyz | bash"
        echo "Then run: foundryup"
        exit 1
    fi
fi
echo "✅ Foundry found"

# Install TypeScript dependencies
echo "📦 Installing TypeScript dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi
echo "✅ TypeScript dependencies installed"

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ TypeScript build failed"
    exit 1
fi
echo "✅ TypeScript compiled successfully"

# Setup Foundry project
echo "🔧 Setting up smart contracts..."
cd ../contracts || exit 1

# Install OpenZeppelin contracts if not already installed
if [ ! -d "lib/openzeppelin-contracts" ]; then
    forge install openzeppelin/openzeppelin-contracts --no-commit
fi
echo "✅ OpenZeppelin contracts installed"

# Build contracts
forge build
if [ $? -ne 0 ]; then
    echo "❌ Contract build failed"
    exit 1
fi
echo "✅ Contracts compiled"

# Run tests
echo "🧪 Running contract tests..."
forge test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed"
    exit 1
fi
echo "✅ All tests passed"

cd ../complete-demo || exit 1

# Setup environment
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ Environment file created"
    echo "📝 Please edit .env with your configuration before running demo"
else
    echo "✅ Environment file exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env with your configuration:"
echo "   - Set RPC_URL (default: http://localhost:8545)"
echo "   - Set PRIVATE_KEY (default uses Anvil test key)"
echo "   - Contract addresses will be set after deployment"
echo ""
echo "2. Start local blockchain:"
echo "   anvil"
echo ""
echo "3. Deploy contracts (in another terminal):"
echo "   cd ../contracts"
echo "   forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key \$PRIVATE_KEY --broadcast"
echo ""
echo "4. Update .env with deployed contract addresses"
echo ""
echo "5. Run demo:"
echo "   npm run demo        # Run complete demo"
echo "   npm run dev         # Run with ts-node (development)"
echo "   node dist/demo.js run --help  # See all options"
echo ""
echo "🎓 Available commands:"
echo "   npm run build       # Build TypeScript"
echo "   npm run dev         # Run with ts-node"
echo "   npm run demo        # Run compiled demo"
echo "   npm test            # Run tests"
echo ""