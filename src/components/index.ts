import { StellarWalletsButton } from './button/stellar-wallets-button';
import { StellarWalletsModal } from './modal/stellar-wallets-modal';
import { StellarSelectorModal } from './selector-modal/stellar-selector-modal';
import { StellarReviewTransactionModal } from './review-transaction-modal/stellar-review-transaction-modal';
import { StellarReviewTransactionButton } from './review-transaction-button/stellar-review-transaction-button';
import { StellarNetworkSelectorButton } from './network-selector-button/stellar-network-selector-button';

declare global {
  interface HTMLElementTagNameMap {
    'stellar-wallets-modal': StellarWalletsModal;
    'stellar-wallets-button': StellarWalletsButton;
    'stellar-selector-modal': StellarSelectorModal;
    'stellar-review-transaction-modal': StellarReviewTransactionModal;
    'stellar-review-transaction-button': StellarReviewTransactionButton;
    'stellar-network-selector-button': StellarNetworkSelectorButton;
  }
}
