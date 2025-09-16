# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2024-12-19

### Enhanced
- **Profile Dropdown Responsive** - Updated profile dropdown to follow mobile-first responsive design pattern
- **Mobile Bottom Sheet** - Profile dropdown now appears as bottom sheet on mobile devices
- **Desktop Positioning** - Profile dropdown maintains absolute positioning on desktop
- **Backdrop Integration** - Added backdrop overlay for mobile profile dropdown
- **Smooth Animations** - Added smooth slide-up animations for mobile dropdowns
- **Consistent UX** - Both modal and profile dropdown now follow the same responsive pattern

### Fixed
- **Mobile Responsiveness** - Fixed profile dropdown positioning and sizing for mobile devices
- **Touch Interactions** - Improved touch interactions for mobile users
- **Layout Consistency** - Ensured consistent responsive behavior across all components

## [1.1.1] - 2024-12-19

### Enhanced
- **Responsive Modal Design** - Updated modal to follow mobile-first responsive design pattern
- **Mobile Layout** - Modal now appears as bottom sheet on mobile devices with rounded top corners
- **Desktop Layout** - Modal appears as centered dialog on desktop with proper spacing
- **Flexible Layout** - Help section and wallets section adapt based on screen size
- **Improved UX** - Better visual hierarchy and spacing for all screen sizes

### Fixed
- **Mobile Responsiveness** - Fixed modal positioning and sizing for mobile devices
- **Layout Issues** - Resolved layout problems on different screen sizes
- **CSS Structure** - Updated CSS to use proper responsive design patterns

## [1.1.0] - 2024-12-19

### Added
- **Network Selector Component** - New `stellar-network-selector-button` component for switching between Stellar networks
- **Real Network Switching** - Automatic switching between Mainnet, Testnet, and Futurenet
- **Horizon URL Management** - Automatic Horizon endpoint switching based on selected network
- **Network Passphrase Updates** - Automatic network passphrase updates for transaction signing
- **Visual Network Indicators** - Color-coded indicators for each network (blue for Mainnet, orange for Testnet, purple for Futurenet)
- **Network Change Events** - `network-changed` event with full network details
- **StellarWalletsKit Integration** - `updateNetwork()` method for seamless network switching
- **Network Status Display** - "Connected" status badge showing active network
- **Responsive Network Dropdown** - Beautiful dropdown with network descriptions and status

### Enhanced
- **Button Styling** - Updated button designs to match Figma specifications
- **Dropdown Functionality** - Improved dropdown interactions with click-outside-to-close
- **Theme Support** - Added NetworkSelectorThemes for light and dark modes
- **Documentation** - Comprehensive README updates with network selector examples

### Fixed
- **Custom Element Registration** - Fixed duplicate registration error
- **CSS Styling** - Added missing styles for network selector components
- **Event Handling** - Improved event propagation and handling

## [1.0.0] - 2024-12-19

### Added
- Initial release of LumenKit Stellar Wallets
- Support for 10+ Stellar wallets including Freighter, Albedo, Rabet, LOBSTR, xBull, WalletConnect, Ledger, Trezor, Klever, Hana, and HOT Wallet
- Modern UI components with beautiful modals and buttons
- TypeScript support with full type definitions
- Mobile-first responsive design
- Customizable themes and styling
- Comprehensive API for wallet operations (getAddress, signTransaction, signAuthEntry, signMessage)
- Web Components built with Lit framework
- Tree-shaking support for minimal bundle size
- Security best practices following Stellar guidelines

### Features
- Multi-wallet support with unified API
- Hardware wallet integration (Ledger, Trezor)
- Browser extension support (Freighter, Rabet, LOBSTR, xBull)
- Web wallet integration (Albedo, Hana, HOT Wallet)
- Bridge connection (WalletConnect)
- Cross-platform compatibility
- Comprehensive documentation and examples
