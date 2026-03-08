// ERC-8004 Agent Client - JavaScript
// 💡 For production use, consider the TypeScript version instead
const { ethers } = require('ethers');

// Minimal ABIs for ERC-8004 contract interactions
const IDENTITY_REGISTRY_ABI = [
    "function register(string tokenURI_) external returns (uint256)",
    "function ownerOf(uint256 agentId) view returns (address)",
    "function tokenURI(uint256 agentId) view returns (string)",
    "function agentExists(uint256 agentId) view returns (bool)",
    "function getNextAgentId() view returns (uint256)",
    "function updateTokenURI(uint256 agentId, string tokenURI_) external",
    "event Registered(uint256 indexed agentId, string tokenURI, address indexed owner)"
];

const REPUTATION_REGISTRY_ABI = [
    "function submitFeedback(uint256 agentId, uint8 score, string[] tags, string reportURI, bytes32 reportHash, bytes authorization) external",
    "function getAverageScore(uint256 agentId) view returns (uint256)",
    "function getFeedbackCount(uint256 agentId) view returns (uint256)",
    "function getActiveFeedbackCount(uint256 agentId) view returns (uint256)",
    "function getAgentFeedbackIds(uint256 agentId) view returns (uint256[])",
    "event FeedbackSubmitted(uint256 indexed agentId, address indexed client, uint8 score, uint256 feedbackId)"
];

const VALIDATION_REGISTRY_ABI = [
    "function requestValidation(bytes32 requestHash, string validationType, string requestURI) external",
    "function submitValidation(bytes32 requestHash, uint8 result, string responseURI, bytes32 responseHash) external",
    "function getConsensusResult(bytes32 requestHash) view returns (uint8)",
    "function stakeAsValidator() external payable",
    "event ValidationRequested(bytes32 indexed requestHash, address indexed requester, string validationType)",
    "event ValidationSubmitted(bytes32 indexed requestHash, address indexed validator, uint8 result)"
];

class ERC8004AgentClient {
    constructor(providerUrl, privateKey, contractAddresses) {
        this.provider = new ethers.JsonRpcProvider(providerUrl);
        this.wallet = new ethers.Wallet(privateKey, this.provider);

        this.identity = new ethers.Contract(
            contractAddresses.identity, IDENTITY_REGISTRY_ABI, this.wallet
        );
        this.reputation = new ethers.Contract(
            contractAddresses.reputation, REPUTATION_REGISTRY_ABI, this.wallet
        );
        this.validation = new ethers.Contract(
            contractAddresses.validation, VALIDATION_REGISTRY_ABI, this.wallet
        );
    }

    /**
     * Register a new agent identity
     * @param {string} metadataUri - URI pointing to agent metadata JSON
     * @returns {Promise<number>} The assigned agent ID
     */
    async register(metadataUri) {
        console.log(`📝 Registering agent with metadata: ${metadataUri}`);
        const tx = await this.identity.register(metadataUri);
        const receipt = await tx.wait();

        // Parse the Registered event to get the agentId
        const event = receipt.logs
            .map(log => { try { return this.identity.interface.parseLog(log); } catch { return null; } })
            .find(e => e && e.name === 'Registered');

        const agentId = Number(event.args.agentId);
        console.log(`✅ Agent registered with ID: ${agentId}`);
        return agentId;
    }

    /**
     * Get reputation data for an agent
     * @param {number} agentId
     * @returns {Promise<{averageScore: number, feedbackCount: number, activeCount: number}>}
     */
    async getReputation(agentId) {
        console.log(`📊 Getting reputation for agent ${agentId}`);
        const [averageScore, feedbackCount, activeCount] = await Promise.all([
            this.reputation.getAverageScore(agentId),
            this.reputation.getFeedbackCount(agentId),
            this.reputation.getActiveFeedbackCount(agentId)
        ]);

        const result = {
            averageScore: Number(averageScore),
            feedbackCount: Number(feedbackCount),
            activeCount: Number(activeCount)
        };
        console.log(`📊 Reputation: score=${result.averageScore}, feedback=${result.feedbackCount}`);
        return result;
    }

    /**
     * Submit feedback for an agent (requires signed authorization from agent owner)
     * @param {number} agentId - Target agent
     * @param {number} score - Rating 0-100
     * @param {string[]} tags - Context labels
     * @param {string} reportURI - URI to detailed report
     * @param {string} reportHash - bytes32 hash of the report
     * @param {string} authorization - Signed authorization from agent owner
     */
    async submitFeedback(agentId, score, tags, reportURI, reportHash, authorization) {
        console.log(`⭐ Submitting feedback: ${score}/100 for agent ${agentId}`);
        const tx = await this.reputation.submitFeedback(
            agentId, score, tags, reportURI, reportHash, authorization
        );
        const receipt = await tx.wait();
        console.log(`✅ Feedback submitted (tx: ${receipt.hash})`);
        return receipt;
    }

    /**
     * Request validation of agent work
     * @param {string} requestHash - bytes32 unique identifier
     * @param {string} validationType - e.g. "re-execution", "stake-based"
     * @param {string} requestURI - URI to request details
     */
    async requestValidation(requestHash, validationType, requestURI) {
        console.log(`🔍 Requesting ${validationType} validation...`);
        const tx = await this.validation.requestValidation(requestHash, validationType, requestURI);
        const receipt = await tx.wait();
        console.log(`✅ Validation requested (tx: ${receipt.hash})`);
        return receipt;
    }

    /**
     * Get consensus result for a validation request
     * @param {string} requestHash - bytes32 request identifier
     * @returns {Promise<number>} Consensus score 0-100
     */
    async getConsensusResult(requestHash) {
        return Number(await this.validation.getConsensusResult(requestHash));
    }

    /**
     * Check if an agent exists
     * @param {number} agentId
     * @returns {Promise<boolean>}
     */
    async agentExists(agentId) {
        return await this.identity.agentExists(agentId);
    }

    /**
     * Get agent metadata URI
     * @param {number} agentId
     * @returns {Promise<string>}
     */
    async getAgentURI(agentId) {
        return await this.identity.tokenURI(agentId);
    }
}

// Example usage
if (require.main === module) {
    (async () => {
        console.log('🤖 ERC-8004 JavaScript Client Example\n');

        // ⚠️ Replace with your actual values
        const client = new ERC8004AgentClient(
            'http://localhost:8545',
            'YOUR_PRIVATE_KEY_HERE', // Never commit real keys!
            {
                identity: 'CONTRACT_ADDRESS_PLACEHOLDER',
                reputation: 'CONTRACT_ADDRESS_PLACEHOLDER',
                validation: 'CONTRACT_ADDRESS_PLACEHOLDER'
            }
        );

        try {
            // Register an agent
            const agentId = await client.register('https://example.com/agent-metadata.json');

            // Check reputation
            const rep = await client.getReputation(agentId);
            console.log(`\n📊 Agent ${agentId} reputation:`, rep);
        } catch (err) {
            console.error('❌ Error:', err.message);
            console.log('\n💡 Make sure Anvil is running and contracts are deployed.');
            console.log('   anvil &');
            console.log('   cd examples/contracts && forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast');
        }
    })();
}

module.exports = ERC8004AgentClient;
