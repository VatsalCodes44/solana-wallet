
# 🎒 Cross-Chain Wallet
A modern, cross-chain cryptocurrency wallet that supports both Ethereum and Solana blockchains. Send, receive, and manage assets across multiple networks with a single, intuitive interface.
![Solana Wallet](https://github.com/VatsalCodes44/solana-wallet/blob/main/public/Screenshot1.png)

![Solana Wallet](https://github.com/VatsalCodes44/solana-wallet/blob/main/public/Screenshot3.png)

![Solana Wallet](https://github.com/VatsalCodes44/solana-wallet/blob/main/public/Screenshot2.png)

# 🌟 Features

## 🔐 Security & Wallet Management
- **BIP39 Mnemonic Phrases** – 12/24-word seed phrases with 128-bit entropy  
- **Cross-Chain HD Wallets** – Single seed for both Ethereum and Solana (BIP44)  
- **Client-Side Generation** – All keys generated locally in your browser  
- **Multiple Account Support** – Derive multiple addresses from one seed phrase  

---

## ⛓️ Multi-Blockchain Support
- **Ethereum Network** – Send/receive ETH on Mainnet, Sepolia, and other EVM chains  
- **Solana Network** – Send/receive SOL on Mainnet, Devnet, and Testnet  
- **Unified Interface** – Manage both chains from a single dashboard  
- **Cross-Chain Transactions** – Seamlessly switch between blockchain networks  

---

## 💰 Asset Management
- **Real-time Balances** – Live ETH and SOL balance tracking  
- **Transaction History** – View recent transactions across both networks  
- **Gas Optimization** – Smart gas estimation for Ethereum transactions  
- **Priority Fee Control** – Customizable priority fees on Solana  

---

## 🛠️ Technical Features
- **HD Wallet Structure** – Hierarchical Deterministic wallets (BIP32/BIP44)  
- **Raw Transaction Support** – Sign and broadcast raw transactions  
- **RPC Integration** – Alchemy for Ethereum, direct RPC for Solana  
- **Responsive Design** – Built with Tailwind CSS and shadcn/ui components  


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