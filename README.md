# LumenKit

A comprehensive TypeScript library for integrating multiple Stellar wallets into your dApp with a beautiful, modern UI. Built with Lit Web Components and designed for seamless wallet connectivity across the Stellar ecosystem.

## ✨ Features

- 🎨 **Modern UI Components** - Beautiful, responsive modals and buttons
- 🔌 **Multi-Wallet Support** - Connect to 10+ Stellar wallets
- 🌐 **Network Selector** - Switch between Mainnet, Testnet, and Futurenet
- 📱 **Mobile-First Design** - Optimized for all screen sizes
- 🎯 **TypeScript Support** - Full type safety and IntelliSense
- ⚡ **Lightweight** - Minimal bundle size with tree-shaking
- 🔧 **Customizable** - Themes and styling options
- 🛡️ **Secure** - Built following Stellar security best practices

## 🚀 Quick Start

### Installation

```bash
npm install @lumenkit/stellar-wallets
# or
yarn add @lumenkit
# or
pnpm add @lumenkit
```

### Basic Usage

```typescript
import { 
  StellarWalletsKit, 
  WalletNetwork,
  StellarWalletsModal,
  StellarWalletsButton 
} from '@lumenkit';

// Initialize the kit
const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: 'freighter'
});

// Get wallet address
const { address } = await kit.getAddress();

// Sign a transaction
const { signedTxXdr } = await kit.signTransaction(xdr, {
  networkPassphrase: WalletNetwork.TESTNET
});
```

## 🎨 UI Components

### Wallet Selection Modal

```html
<stellar-wallets-modal
  show-modal="true"
  modal-title="Choose Your Wallet"
  @wallet-selected="${(e) => console.log('Selected:', e.detail)}"
  @modal-closed="${() => console.log('Modal closed')}">
</stellar-wallets-modal>
```

### Connect Wallet Button

```html
<stellar-wallets-button
  button-text="Connect Wallet"
  @wallet-selected="${(e) => console.log('Connected:', e.detail)}">
</stellar-wallets-button>
```

### Review Transaction Modal

```html
<stellar-review-transaction-modal
  show-modal="true"
  @modal-closed="${() => console.log('Review closed')}">
</stellar-review-transaction-modal>
```

### Network Selector Button

```html
<stellar-network-selector-button
  network-name="Stellar Testnet"
  selected-network="testnet"
  @network-changed="${(e) => console.log('Network changed:', e.detail)}">
</stellar-network-selector-button>
```

**Network Selector Features:**
- 🌐 **Real Network Switching** - Switch between Mainnet, Testnet, and Futurenet
- 🔄 **Automatic Integration** - Updates StellarWalletsKit network automatically
- 📍 **Horizon URL Management** - Automatically switches Horizon endpoints
- 🔑 **Passphrase Updates** - Updates network passphrase for transactions
- 🎨 **Visual Indicators** - Color-coded network status indicators
- 📱 **Responsive Design** - Works on all screen sizes

## 🔧 Configuration

### Kit Configuration

```typescript
import { StellarWalletsKit, WalletNetwork } from '@lumenkit';

const kit = new StellarWalletsKit({
  // Required: Stellar network
  network: WalletNetwork.TESTNET,
  
  // Optional: Pre-selected wallet
  selectedWalletId: 'freighter',
  
  // Optional: Custom modules
  modules: [customWalletModule],
  
  // Optional: Wallet filtering
  allowedWallets: ['freighter', 'albedo', 'rabet']
});
```

### Network Selector Integration

```typescript
import { StellarWalletsKit, WalletNetwork } from '@lumenkit';

// Initialize with default network
let currentNetwork = WalletNetwork.TESTNET;
let currentHorizonUrl = 'https://horizon-testnet.stellar.org';
let currentNetworkPassphrase = 'Test SDF Network ; September 2015';

const kit = new StellarWalletsKit({
  network: currentNetwork,
  // ... other config
});

// Listen for network changes
document.addEventListener('network-changed', (event) => {
  const { networkId, networkName, horizonUrl, networkPassphrase } = event.detail;
  
  // Update current network variables
  currentNetwork = networkId === 'mainnet' ? WalletNetwork.MAINNET : 
                  networkId === 'testnet' ? WalletNetwork.TESTNET : 
                  WalletNetwork.FUTURENET;
  currentHorizonUrl = horizonUrl;
  currentNetworkPassphrase = networkPassphrase;
  
  // Update the kit's network
  kit.updateNetwork(currentNetwork);
  
  console.log(`🌐 Switched to ${networkName}`);
  console.log(`📍 Horizon URL: ${horizonUrl}`);
});
```

### Theme Customization

```typescript
import { ModalThemes, ButtonThemes, NetworkSelectorThemes } from '@lumenkit/stellar-wallets-kit';

// Use built-in themes
const darkTheme = ModalThemes.DARK;
const lightTheme = ModalThemes.LIGHT;
const networkTheme = NetworkSelectorThemes.LIGHT;

// Or create custom theme
const customTheme = {
  bgColor: '#1a1a1a',
  textColor: '#ffffff',
  solidTextColor: '#ffffff',
  headerButtonColor: '#666666',
  dividerColor: 'rgba(255, 255, 255, 0.1)',
  helpBgColor: '#2a2a2a',
  notAvailableTextColor: '#999999',
  notAvailableBgColor: '#333333',
  notAvailableBorderColor: '#444444'
};
```

## 📱 Supported Wallets

| Wallet | Type | Mobile | Desktop | Status |
|--------|------|--------|---------|--------|
| **Freighter** | Browser Extension | ❌ | ✅ | Official Stellar Foundation wallet |
| **Albedo** | Web Wallet | ✅ | ✅ | No extension required |
| **Rabet** | Browser Extension | ❌ | ✅ | DeFi features integrated |
| **LOBSTR** | Browser Extension | ❌ | ✅ | User-friendly interface |
| **xBull** | Browser Extension | ❌ | ✅ | Secure and reliable |
| **WalletConnect** | Bridge | ✅ | ✅ | Mobile wallet connection |
| **Ledger** | Hardware | ✅ | ✅ | Maximum security |
| **Trezor** | Hardware | ✅ | ✅ | Market leader |
| **Klever** | Multi-chain | ✅ | ✅ | Multi-blockchain support |
| **Hana** | Web Wallet | ✅ | ✅ | Simple and intuitive |
| **HOT Wallet** | Web Wallet | ✅ | ✅ | Connect to start |

## 🛠️ API Reference

### StellarWalletsKit

The main class for wallet operations.

```typescript
class StellarWalletsKit {
  constructor(config: KitConfig);
  
  // Get current wallet address
  getAddress(params?: { path?: string; skipRequestAccess?: boolean }): Promise<{ address: string }>;
  
  // Sign a transaction
  signTransaction(xdr: string, opts?: SignTransactionOptions): Promise<{ signedTxXdr: string; signerAddress?: string }>;
  
  // Sign an auth entry
  signAuthEntry(authEntry: string, opts?: SignAuthEntryOptions): Promise<{ signedAuthEntry: string; signerAddress?: string }>;
  
  // Sign a message
  signMessage(message: string, opts?: SignMessageOptions): Promise<{ signedMessage: string; signerAddress?: string }>;
  
  // Get current network
  getNetwork(): Promise<{ network: string; networkPassphrase: string }>;
  
  // Update network (for network selector integration)
  updateNetwork(network: WalletNetwork): void;
  
  // Disconnect wallet
  disconnect(): Promise<void>;
}
```

### Configuration Options

```typescript
interface KitConfig {
  network: WalletNetwork;
  selectedWalletId?: string;
  modules?: ModuleInterface[];
  allowedWallets?: string[];
}

interface SignTransactionOptions {
  networkPassphrase?: string;
  address?: string;
  path?: string;
  submit?: boolean;
  submitUrl?: string;
}
```

## 🎨 Styling

### CSS Custom Properties

```css
:root {
  --modal-bg-color: #ffffff;
  --modal-text-color: #181818;
  --modal-solid-text-color: #000000;
  --modal-header-button-color: #8f8f8f;
  --modal-divider-color: rgba(0, 0, 0, 0.15);
  --modal-help-bg-color: #f8f8f8;
  --modal-not-available-text-color: #6f6f6f;
  --modal-not-available-bg-color: #f3f3f3;
  --modal-not-available-border-color: #e2e2e2;
}
```

### Custom Styling

```css
stellar-wallets-modal {
  --modal-bg-color: #1a1a1a;
  --modal-text-color: #ffffff;
  --modal-solid-text-color: #ffffff;
}

stellar-wallets-button {
  --button-bg-color: #007bff;
  --button-text-color: #ffffff;
  --button-border-radius: 8px;
}
```

## 📦 Bundle Information

- **Size**: ~45KB gzipped
- **Dependencies**: Minimal external dependencies
- **Tree Shaking**: Supported
- **TypeScript**: Full support
- **Browsers**: Modern browsers with ES2020 support

## 🔒 Security

- All wallet interactions follow Stellar security best practices
- No private keys are stored or transmitted
- All operations are performed locally in the user's wallet
- Supports hardware wallets for maximum security

## 🚀 Advanced Usage

### Custom Wallet Module

```typescript
import { ModuleInterface, ModuleType } from '@lumenkit';

class CustomWalletModule implements ModuleInterface {
  moduleType = ModuleType.HOT_WALLET;
  productId = 'custom-wallet';
  productName = 'Custom Wallet';
  productUrl = 'https://custom-wallet.com';
  productIcon = 'https://custom-wallet.com/icon.png';

  async isAvailable(): Promise<boolean> {
    return typeof window.customWallet !== 'undefined';
  }

  async getAddress(): Promise<{ address: string }> {
    return { address: await window.customWallet.getAddress() };
  }

  async signTransaction(xdr: string): Promise<{ signedTxXdr: string }> {
    return { signedTxXdr: await window.customWallet.signTransaction(xdr) };
  }

  // ... implement other required methods
}
```

### Event Handling

```typescript
// Listen for wallet selection
document.addEventListener('wallet-selected', (event) => {
  console.log('Wallet selected:', event.detail);
  // event.detail contains the selected wallet information
});

// Listen for network changes
document.addEventListener('network-changed', (event) => {
  console.log('Network changed:', event.detail);
  // event.detail contains:
  // - networkId: 'mainnet' | 'testnet' | 'futurenet'
  // - networkName: 'Mainnet' | 'Testnet' | 'Futurenet'
  // - horizonUrl: Horizon endpoint URL
  // - networkPassphrase: Network passphrase for transactions
  // - isConnected: boolean
});

// Listen for modal events
document.addEventListener('modal-closed', (event) => {
  console.log('Modal closed');
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](https://docs.lumenkit.dev)
- 🐛 [Issue Tracker](https://github.com/lumenkit/stellar-wallets/issues)
- 💬 [Discord Community](https://discord.gg/lumenkit)
- 📧 [Email Support](mailto:support@lumenkit.dev)

## 🏗️ Built With

- [Lit](https://lit.dev/) - Web Components framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Rollup](https://rollupjs.org/) - Module bundler
- [Stellar SDK](https://stellar.org/developers/reference/) - Stellar integration

---

Made with ❤️ by [LumenKit](https://lumenkit.dev)
