import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { firstValueFrom, Subscription, switchMap } from 'rxjs';
import { fetchAccountBalance } from '../../services/account.service';
import { copyToClipboard } from '../../services/clipboard.service';
import { ReactiveState } from '../../state/reactive-state';
import { activeAddress$, buttonTheme$, horizonUrl$, removeAddress } from '../../state/store';
import { IButtonTheme } from '../../types';
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

  activeAddress: ReactiveState<string | undefined> = new ReactiveState(this, activeAddress$);
  theme: ReactiveState<IButtonTheme | undefined> = new ReactiveState(this, buttonTheme$);
  fetchAddressSubscription: Subscription | undefined;

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

  override connectedCallback() {
    super.connectedCallback();
    this.startBalanceFetcher().then();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.fetchAddressSubscription?.unsubscribe();
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
          <section class="dropdown-wrapper">
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
                <!-- Low balance transaction item -->
                <div class="transaction-item">
                  <div class="transaction-icon low-balance">⚠️</div>
                  <div class="transaction-details">
                    <div class="transaction-title">Low Balance Warning</div>
                    <div class="transaction-status">Balance below 10 XLM</div>
                  </div>
                  <div class="transaction-amount">
                    <div class="amount">${this.accountBalance || '0.00'} XLM</div>
                    <div class="time">Current</div>
                  </div>
                </div>
              </div>

              <div class="view-more">
                <a href="https://stellar.expert/explorer/public" target="_blank" rel="noopener noreferrer">
                  View More on Stellar Expert →
                </a>
              </div>
            </div>
          </section>
        `
      : '';

    return html`
      <section style=${styleMap(this.getThemeStyles)} class="btn-container">${button} ${dropdown}</section>
    `;
  }
}
