import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { firstValueFrom, Subscription, switchMap } from 'rxjs';
import { fetchAccountBalance, fetchAccountTransactions } from '../../services/account.service';
import { copyToClipboard } from '../../services/clipboard.service';
import { ReactiveState } from '../../state/reactive-state';
import { activeAddress$, buttonTheme$, horizonUrl$, removeAddress } from '../../state/store';
import { IButtonTheme, ITransaction } from '../../types';
import { dropdownWrapper, buttonContainer, buttonStyles } from './styles';

export enum ButtonThemeType {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export const ButtonThemes: { [key in ButtonThemeType]: IButtonTheme } = {
  DARK: {
    bgColor: '#161616',
    textColor: '#a0a0a0',
    solidTextColor: '#ededed',
    dividerColor: 'rgba(255, 255, 255, 0.15)',
    buttonPadding: '0.5rem 1.25rem',
    buttonBorderRadius: '0.5rem',
  },
  LIGHT: {
    bgColor: '#fcfcfc',
    textColor: '#181818',
    solidTextColor: '#000000',
    dividerColor: 'rgba(0, 0, 0, 0.15)',
    buttonPadding: '0.5rem 1.25rem',
    buttonBorderRadius: '0.5rem',
  },
};

@customElement('stellar-wallets-button')
export class StellarWalletsButton extends LitElement {
  static override styles = [
    css`
      :host * {
        box-sizing: border-box;
      }
    `,
    buttonStyles,
    buttonContainer,
    dropdownWrapper,
  ];

  @property({ type: String, reflect: true })
  buttonText: string = 'Connect Wallet';

  @state()
  showDropdown: boolean = false;

  @state()
  accountBalance?: string;

  @state()
  showCopiedMessage: boolean = false;

  @state()
  transactions: ITransaction[] = [];

  @state()
  transactionsLoading: boolean = false;

  @state()
  transactionsError: string | null = null;

  activeAddress: ReactiveState<string | undefined> = new ReactiveState(this, activeAddress$);
  theme: ReactiveState<IButtonTheme | undefined> = new ReactiveState(this, buttonTheme$);
  fetchAddressSubscription: Subscription | undefined;
  fetchTransactionsSubscription: Subscription | undefined;

  private get getThemeStyles() {
    if (!this.theme.value) return {};

    return {
      '--button-bg-color': this.theme.value.bgColor,
      '--button-text-color': this.theme.value.textColor,
      '--button-solid-text-color': this.theme.value.solidTextColor,
      '--button-divider-color': this.theme.value.dividerColor,
      '--button-padding': this.theme.value.buttonPadding,
      '--button-border-radius': this.theme.value.buttonBorderRadius,
    };
  }

  onButtonClicked() {
    if (this.activeAddress.value) {
      this.showDropdown = !this.showDropdown;
    } else {
      this.dispatchEvent(
        new CustomEvent('button-clicked', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  disconnect(): void {
    removeAddress();
    this.closeDropdown();

    this.dispatchEvent(
      new CustomEvent('disconnect-wallet', {
        bubbles: true,
        composed: true,
      })
    );
  }

  async copyPublicKey(): Promise<void> {
    await copyToClipboard(this.activeAddress.value!);
    this.showCopiedMessage = true;
    await new Promise(r => setTimeout(r, 3000));
    this.showCopiedMessage = false;
  }

  async retryTransactions(): Promise<void> {
    if (this.activeAddress.value) {
      this.transactionsError = null;
      this.transactionsLoading = true;
      try {
        const transactions = await fetchAccountTransactions(this.activeAddress.value, 5);
        this.transactions = transactions;
        this.transactionsLoading = false;
      } catch (error) {
        this.transactionsLoading = false;
        if (error instanceof Error) {
          if (error.message.includes('Not Found')) {
            this.transactionsError = 'Account not found or no transactions available';
          } else if (error.message.includes('Failed to fetch')) {
            this.transactionsError = 'Network error - please check your connection';
          } else {
            this.transactionsError = 'Unable to load transactions';
          }
        } else {
          this.transactionsError = 'Unable to load transactions';
        }
      }
    }
  }

  private formatTransactionTime(createdAt: string): string {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }

  private getTransactionIcon(transaction: ITransaction): string {
    if (!transaction.successful) return '❌';
    
    const operation = transaction.operations[0];
    if (!operation) return '📄';
    
    switch (operation.type) {
      case 'payment':
        return '💸';
      case 'create_account':
        return '👤';
      case 'change_trust':
        return '🔗';
      case 'manage_offer':
      case 'create_passive_offer':
        return '📈';
      case 'path_payment_strict_receive':
      case 'path_payment_strict_send':
        return '🔄';
      case 'manage_data':
        return '📝';
      case 'bump_sequence':
        return '⏫';
      case 'account_merge':
        return '🔀';
      default:
        return '📄';
    }
  }

  private getTransactionTitle(transaction: ITransaction): string {
    if (!transaction.successful) return 'Failed Transaction';
    
    const operation = transaction.operations[0];
    if (!operation) return 'Transaction';
    
    switch (operation.type) {
      case 'payment':
        return 'Payment';
      case 'create_account':
        return 'Account Created';
      case 'change_trust':
        return 'Trustline Changed';
      case 'manage_offer':
      case 'create_passive_offer':
        return 'Offer';
      case 'path_payment_strict_receive':
      case 'path_payment_strict_send':
        return 'Path Payment';
      case 'manage_data':
        return 'Data Entry';
      case 'bump_sequence':
        return 'Sequence Bump';
      case 'account_merge':
        return 'Account Merge';
      default:
        return 'Transaction';
    }
  }

  private getTransactionAmount(transaction: ITransaction): string {
    if (!transaction.successful) return 'Failed';
    
    const operation = transaction.operations[0];
    if (!operation || !operation.amount) return '0 XLM';
    
    const amount = parseFloat(operation.amount);
    const asset = operation.asset_type === 'native' ? 'XLM' : 
                  `${operation.asset_code || 'Unknown'}`;
    
    return `${amount.toFixed(4)} ${asset}`;
  }

  async startBalanceFetcher(): Promise<void> {
    const horizonUrl: string | undefined = await firstValueFrom(horizonUrl$);

    if (horizonUrl) {
      this.fetchAddressSubscription = this.activeAddress.value$
        .pipe(
          switchMap(async (value: string | undefined): Promise<string> => {
            return value ? fetchAccountBalance(value).catch((): string => '0') : '0';
          })
        )
        .subscribe((balance: string): void => {
          this.accountBalance = balance;
        });
    }
  }

  async startTransactionsFetcher(): Promise<void> {
    const horizonUrl: string | undefined = await firstValueFrom(horizonUrl$);

    if (horizonUrl) {
      this.fetchTransactionsSubscription = this.activeAddress.value$
        .pipe(
          switchMap(async (value: string | undefined): Promise<ITransaction[]> => {
            if (!value) return [];
            
            this.transactionsLoading = true;
            this.transactionsError = null;
            
            try {
              const transactions = await fetchAccountTransactions(value, 5);
              this.transactionsLoading = false;
              this.transactionsError = null;
              return transactions;
            } catch (error) {
              this.transactionsLoading = false;
              // Handle specific error cases
              if (error instanceof Error) {
                if (error.message.includes('Not Found')) {
                  this.transactionsError = 'Account not found or no transactions available';
                } else if (error.message.includes('Failed to fetch')) {
                  this.transactionsError = 'Network error - please check your connection';
                } else {
                  this.transactionsError = 'Unable to load transactions';
                }
              } else {
                this.transactionsError = 'Unable to load transactions';
              }
              return [];
            }
          })
        )
        .subscribe((transactions: ITransaction[]): void => {
          this.transactions = transactions;
        });
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.startBalanceFetcher().then();
    this.startTransactionsFetcher().then();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.fetchAddressSubscription?.unsubscribe();
    this.fetchTransactionsSubscription?.unsubscribe();
  }

  override render() {
    const button = html`
      <button @click=${this.onButtonClicked} class="btn">
        ${this.activeAddress.value
          ? html`
              <div class="btn-content">
                <div class="avatar-container">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=${this.activeAddress.value}" 
                    alt="Avatar" 
                    class="avatar"
                  />
                </div>
                <div class="btn-text">
                  <span class="account-label">${this.activeAddress.value?.slice(0, 4)}....${this.activeAddress.value?.slice(-6)}</span>
                </div>
                <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            `
          : html`
              <div class="btn-content-connect">
                <span class="connect-text">${this.buttonText}</span>
              </div>
            `}
      </button>
    `;

    const dropdown = this.showDropdown
      ? html`
          <section class="dropdown-wrapper ${this.showDropdown ? 'show' : ''}">
            <!-- Profile Section -->
            <div class="dropdown-profile-section">
              <div class="profile-avatar">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=${this.activeAddress.value}" 
                  alt="Avatar" 
                  class="profile-avatar-img"
                />
              </div>
              <div class="profile-info">
                <div class="profile-title">Stellar Account</div>
                <div class="profile-address">${this.activeAddress.value?.slice(0, 4)}....${this.activeAddress.value?.slice(-6)}</div>
              </div>
            </div>

            <!-- Balance Section -->
            <div class="dropdown-balance-section">
              <div class="balance-info">
                <div class="balance-label">Total Balance</div>
                <div class="balance-amount">${this.accountBalance || '0.00'} XLM</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="dropdown-actions">
              <button @click=${this.copyPublicKey} class="action-button copy-button">
                ${!this.showCopiedMessage ? 'Copy' : 'Copied!'}
              </button>
              <button @click=${this.disconnect} class="action-button disconnect-button">
                Disconnect
              </button>
            </div>

            <!-- Recent Transactions -->
            <div class="dropdown-transactions">
              <div class="transactions-header">
                <span class="transactions-title">Recent Transactions</span>
                <span class="clear-all">Clear All</span>
              </div>
              
              <div class="transactions-list">
                ${this.transactionsLoading 
                  ? html`
                      <div class="transaction-item loading">
                        <div class="transaction-icon">⏳</div>
                        <div class="transaction-details">
                          <div class="transaction-title">Loading transactions...</div>
                          <div class="transaction-status">Please wait</div>
                        </div>
                      </div>
                    `
                  : this.transactionsError
                    ? html`
                        <div class="transaction-item error">
                          <div class="transaction-icon">⚠️</div>
                          <div class="transaction-details">
                            <div class="transaction-title">No transactions available</div>
                            <div class="transaction-status">${this.transactionsError}</div>
                          </div>
                          <div class="transaction-amount">
                            <button @click=${this.retryTransactions} class="retry-button" ?disabled=${this.transactionsLoading}>
                              ${this.transactionsLoading ? 'Retrying...' : 'Retry'}
                            </button>
                          </div>
                        </div>
                      `
                    : this.transactions.length === 0
                      ? html`
                          <div class="transaction-item">
                            <div class="transaction-icon">📄</div>
                            <div class="transaction-details">
                              <div class="transaction-title">No transactions found</div>
                              <div class="transaction-status">Your recent activity will appear here</div>
                            </div>
                          </div>
                        `
                      : this.transactions.map(transaction => html`
                          <div class="transaction-item ${!transaction.successful ? 'failed' : ''}">
                            <div class="transaction-icon">${this.getTransactionIcon(transaction)}</div>
                            <div class="transaction-details">
                              <div class="transaction-title">${this.getTransactionTitle(transaction)}</div>
                              <div class="transaction-status">${transaction.successful ? 'Success' : 'Failed'}</div>
                            </div>
                            <div class="transaction-amount">
                              <div class="amount">${this.getTransactionAmount(transaction)}</div>
                              <div class="time">${this.formatTransactionTime(transaction.created_at)}</div>
                            </div>
                          </div>
                        `)
                }
              </div>

              <div class="view-more">
                <a href="https://stellar.expert/explorer/public/account/${this.activeAddress.value}" target="_blank" rel="noopener noreferrer">
                  View More on Stellar Expert →
                </a>
              </div>
            </div>
          </section>
        `
      : '';

    return html`
      <section style=${styleMap(this.getThemeStyles)} class="btn-container">
        ${button} 
        ${dropdown}
        ${this.showDropdown ? html`<div class="dropdown-backdrop" @click=${this.closeDropdown}></div>` : ''}
      </section>
    `;
  }
}
