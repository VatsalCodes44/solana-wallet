
# Solana Wallet

The Solana Wallet is a web application that allows users to generate and manage Solana wallets securely in their browser. It provides a simple interface for creating hierarchical deterministic (HD) wallets from mnemonic seed phrases and supports multiple wallet addresses derivation.
![Solana Wallet](https://github.com/VatsalCodes44/solana-wallet/blob/main/public/Screenshot1.png)

![Solana Wallet](https://github.com/VatsalCodes44/solana-wallet/blob/main/public/Screenshot3.png)

![Solana Wallet](https://github.com/VatsalCodes44/solana-wallet/blob/main/public/Screenshot2.png)
## 🚀 Features

- **🔐 Secure Wallet Generation** - BIP39 mnemonic phrases with 128-bit entropy
- **📱 Multiple Wallet Support** - Derive multiple Solana addresses from one seed
- **💻 Client-Side Only** - All key generation happens in your browser
- **👛 HD Wallet Support** - Hierarchical Deterministic wallet structure (BIP44)
- **⚡ Real-time Balance** - Check SOL balances for generated wallets
- **📱 Responsive Design** - Works on desktop and mobile devices
- **🎨 Modern UI** - Built with Tailwind CSS and shadcn/ui components

## How to Use
1.  **Generate Seed Phrase**: Click "Generate Seed Phrase" to create a new 12-word mnemonic
    
2.  **Copy Your Phrase**: Click on the displayed phrase to copy it to clipboard (store it securely!)
    
3.  **Select Blockchain**: Choose Solana as your blockchain (currently supports Solana only)
    
4.  **Manage Wallets**: Use the wallet selector to generate and switch between multiple wallet addresses
    
5.  **Check Balance**: View your SOL balance for the selected wallet
    
6.  **Make Transactions**: Use the payment interface to send transactions (when implemented

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with React
- **Blockchain**: Solana Web3.js
- **Cryptography**: 
  - `bip39` - Mnemonic generation
  - `tweetnacl` - Ed25519 key pairs
  - `ed25519-hd-key` - HD key derivation
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/VatsalCodes44/solana-wallet.git

# Navigate to project directory
cd solana-wallet

# Install dependencies
pnpm install

# Setup environment variables

# Start development server
pnpm run dev
```

## ⚠️ Disclaimer

This software is provided for educational and development purposes only. Users are solely responsible for the security of their keys and funds. Always exercise caution when dealing with cryptocurrency wallets.

----------

**Built with ❤️ for the Solana community**