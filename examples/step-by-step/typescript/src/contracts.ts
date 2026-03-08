// Simplified Contract ABIs for tutorial
export const IDENTITY_REGISTRY_ABI = [
  {
    "inputs": [{"type": "string", "name": "tokenURI_"}],
    "name": "register", 
    "outputs": [{"type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "agentId"}],
    "name": "tokenURI",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "agentId"}],
    "name": "ownerOf",
    "outputs": [{"type": "address"}],
    "stateMutability": "view", 
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "type": "uint256", "name": "agentId"},
      {"indexed": false, "type": "string", "name": "tokenURI"},
      {"indexed": true, "type": "address", "name": "owner"}
    ],
    "name": "Registered",
    "type": "event"
  }
];

export const REPUTATION_REGISTRY_ABI = [
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
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "agentId"}],
    "name": "getFeedbackCount", 
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const VALIDATION_REGISTRY_ABI = [
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
  },
  {
    "inputs": [{"type": "bytes32", "name": "requestHash"}],
    "name": "getConsensusResult",
    "outputs": [{"type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  }
];