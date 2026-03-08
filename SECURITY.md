# Security Guidelines

## 🔐 Critical Security Rules

### ❌ NEVER Commit These to Git:
- Private keys (even test keys)
- API keys or tokens  
- Seed phrases or mnemonics
- Service account credentials
- Database passwords
- SSH private keys (.pem files)
- .env files with real secrets

### ✅ Always Use Placeholders:
```bash
# ❌ WRONG - Real key in .env.example
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# ✅ CORRECT - Placeholder in .env.example  
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE_PLACEHOLDER_ONLY
```

## 🛡️ Development Best Practices

### Local Development
- Use environment variables for secrets
- Copy `.env.example` to `.env` and fill real values
- Add `.env` to `.gitignore` (already included)
- Use test networks only (never mainnet for testing)

### Test Accounts
- For **Anvil/Hardhat**: Test keys are safe for local development only
- For **Testnets**: Generate fresh keypairs, never reuse
- For **Mainnet**: Use hardware wallets or secure key management

### Code Reviews
- Check for hardcoded secrets before commits
- Verify .env.example has only placeholders
- Scan for accidentally committed credentials

## 🚨 If You Accidentally Commit Secrets

1. **Immediately** revoke/regenerate the compromised credentials
2. **Never** just delete the file - history remains in git
3. **Use** `git filter-branch` or similar to clean history
4. **Force push** to overwrite the remote history
5. **Notify** team members to re-clone the repository

## 🔧 Tooling

### Pre-commit Hooks
Consider using tools like:
- `git-secrets` - Prevents committing secrets
- `detect-secrets` - Scans for potential secrets
- `truffleHog` - Searches for high entropy strings

### Environment Management
```bash
# Use direnv for automatic environment loading
echo "PRIVATE_KEY=your_key_here" > .envrc
direnv allow

# Or use dedicated secret management
# - HashiCorp Vault
# - AWS Secrets Manager  
# - Azure Key Vault
```

## 📋 Security Checklist

Before any commit:
- [ ] No private keys in any files
- [ ] No API keys or tokens
- [ ] .env.example has only placeholders
- [ ] Real .env file is in .gitignore
- [ ] No hardcoded URLs to production systems
- [ ] No database connection strings
- [ ] Comments warn about placeholder values

Remember: **Security is everyone's responsibility!** 🛡️