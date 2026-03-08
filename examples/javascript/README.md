# JavaScript Integration Examples

> **💡 Recommendation**: For new projects, use the [TypeScript examples](../complete-demo/) instead.
> TypeScript provides better type safety and is the recommended approach for ERC-8004 integrations.

> ⚠️ **Reference Examples** — The snippets below are illustrative patterns, not standalone runnable code.
> For a working JavaScript client, see [`step-by-step/javascript/agent-client.js`](../step-by-step/javascript/agent-client.js).

## Frontend Integration

Basic examples for integrating ERC-8004 in web applications.

### Web3 Client
```javascript
import { ethers } from 'ethers';

class ERC8004Client {
  constructor(provider, contractAddresses) {
    this.provider = provider;
    this.contracts = contractAddresses;
  }

  async discoverAgents(capability) {
    // Implementation here
  }
}
```

### React Component
```jsx
import { useERC8004 } from './hooks/useERC8004';

function AgentMarketplace() {
  const { agents, loading } = useERC8004();
  
  return (
    <div>
      <h1>Trustless Agents</h1>
      {agents.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
```

## Node.js Backend

Server-side agent implementation examples.

---

**Status**: 🚧 Under development - Examples coming soon!