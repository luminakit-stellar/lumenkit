import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ReactiveState } from '../../state/reactive-state';
import { allowedWallets$, modalTheme$ } from '../../state/store';

import { ISupportedWallet, IModalTheme } from '../../types';
import {
  backdropStyles,
  modalDialogStyles,
  modalAnimations,
} from './styles';

export enum ModalThemeType {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export const ModalThemes: { [key in ModalThemeType]: IModalTheme } = {
  DARK: {
    bgColor: '#161616',
    textColor: '#a0a0a0',
    solidTextColor: '#ededed',
    headerButtonColor: '#707070',
    dividerColor: 'rgba(255, 255, 255, 0.15)',
    helpBgColor: '#1c1c1c',
    notAvailableTextColor: '#a0a0a0',
    notAvailableBgColor: '#232323',
    notAvailableBorderColor: '#343434',
  },
  LIGHT: {
    bgColor: '#fcfcfc',
    textColor: '#181818',
    solidTextColor: '#000000',
    headerButtonColor: '#8f8f8f',
    dividerColor: 'rgba(0, 0, 0, 0.15)',
    helpBgColor: '#f8f8f8',
    notAvailableTextColor: '#6f6f6f',
    notAvailableBgColor: '#f3f3f3',
    notAvailableBorderColor: '#e2e2e2',
  },
};

@customElement('stellar-wallets-modal')
export class StellarWalletsModal extends LitElement {
  static override styles = [
    css`
      :host * {
        box-sizing: border-box;
      }

      .mb-0 {
        margin-bottom: 0 !important;
      }
    `,
    modalDialogStyles,
    backdropStyles,
    modalAnimations,
  ];

  /**
   * This value is used to tell the modal that it should not update the value
   * `showModal` at any moment, this comes handy when the state wants to be handled by another source
   */
  @property({ type: Boolean, reflect: true })
  ignoreShowStatus: boolean = false;

  @property({ type: Boolean, reflect: true })
  showModal: boolean = false;

  @state()
  closingModal: boolean = false;

  @property({ type: String, reflect: true })
  modalTitle: string = 'Choose Your Wallet';

  @property({ type: String, reflect: true })
  notAvailableText: string = 'Not available';

  allowedWallets: ReactiveState<ISupportedWallet[]> = new ReactiveState(this, allowedWallets$);

  theme: ReactiveState<IModalTheme | undefined> = new ReactiveState(this, modalTheme$);

  override connectedCallback() {
    super.connectedCallback();

    const platformWrapper: ISupportedWallet | undefined = this.getPlatformWrapper();
    if (platformWrapper) {
      setTimeout((): void => {
        this.pickWalletOption(platformWrapper);
      }, 10);
    }
  }

  async closeModal(): Promise<void> {
    this.closingModal = true;

    await new Promise(r => setTimeout(r, 280));

    if (!this.ignoreShowStatus) {
      this.showModal = false;
    }

    this.dispatchEvent(
      new CustomEvent('modal-closed', {
        detail: new Error('Modal closed'),
        bubbles: true,
        composed: true,
      })
    );

    this.closingModal = false;
  }

  async pickWalletOption(option: ISupportedWallet): Promise<void> {
    if (!option.isAvailable) {
      window.open(option.url, '_blank');
      return;
    }

    this.closingModal = true;

    await new Promise(r => setTimeout(r, 280));

    try {
      const record: string | null = window.localStorage.getItem('@StellarWalletsKit/usedWalletsIds');
      let usedWalletsIds: Array<ISupportedWallet['id']> = record ? JSON.parse(record) : [];
      usedWalletsIds = [option.id, ...usedWalletsIds.filter((id: string): boolean => id !== option.id)];
      window.localStorage.setItem('@StellarWalletsKit/usedWalletsIds', JSON.stringify(usedWalletsIds));
    } catch (e) {
      console.error(e);
    }

    this.dispatchEvent(
      new CustomEvent('wallet-selected', {
        detail: option,
        bubbles: true,
        composed: true,
      })
    );

    this.closingModal = false;
  }

  /**
   * This function gets the list of the wallets following the logic from this task https://github.com/Creit-Tech/Stellar-Wallets-Kit/issues/28
   * It follows this order:
   * 1- Wallet last used by wallet selector
   * 2- If not wallet last use, wallets detected in the browser
   * 3- Wallet ordering as defined by the developer
   *
   */
  private getSortedList(): ISupportedWallet[] {
    const sortedWallets: { available: ISupportedWallet[]; unavailable: ISupportedWallet[] } =
      this.allowedWallets.value!.reduce(
        (all: { available: ISupportedWallet[]; unavailable: ISupportedWallet[] }, current: ISupportedWallet) => {
          return {
            available: current.isAvailable ? [...all.available, current] : all.available,
            unavailable: !current.isAvailable ? [...all.unavailable, current] : all.unavailable,
          };
        },
        { available: [], unavailable: [] }
      );

    let usedWalletsIds: Array<ISupportedWallet['id']>;
    try {
      const record: string | null = window.localStorage.getItem('@StellarWalletsKit/usedWalletsIds');
      usedWalletsIds = record ? JSON.parse(record) : [];
    } catch (e) {
      console.error(e);
      usedWalletsIds = [];
    }

    if (usedWalletsIds.length === 0) {
      return [...sortedWallets.available, ...sortedWallets.unavailable];
    }

    const usedWallets: ISupportedWallet[] = [];
    const nonUsedWallets: ISupportedWallet[] = [];
    for (const availableWallet of sortedWallets.available) {
      if (usedWalletsIds.find((id: string): boolean => id === availableWallet.id)) {
        usedWallets.push(availableWallet);
      } else {
        nonUsedWallets.push(availableWallet);
      }
    }

    return [
      ...usedWallets.sort((a: ISupportedWallet, b: ISupportedWallet) => {
        return usedWalletsIds.indexOf(a.id) - usedWalletsIds.indexOf(b.id);
      }),
      ...nonUsedWallets,
      ...sortedWallets.unavailable,
    ];
  }

  private getPlatformWrapper(): ISupportedWallet | undefined {
    return this.getSortedList().find((w: ISupportedWallet): boolean => w.isPlatformWrapper)
  }

  private getThemeStyles() {
    if (!this.theme.value) return {};

    return {
      '--modal-bg-color': this.theme.value.bgColor,
      '--modal-text-color': this.theme.value.textColor,
      '--modal-solid-text-color': this.theme.value.solidTextColor,
      '--modal-header-button-color': this.theme.value.headerButtonColor,
      '--modal-divider-color': this.theme.value.dividerColor,
      '--modal-help-bg-color': this.theme.value.helpBgColor,
      '--modal-not-available-text-color': this.theme.value.notAvailableTextColor,
      '--modal-not-available-bg-color': this.theme.value.notAvailableBgColor,
      '--modal-not-available-border-color': this.theme.value.notAvailableBorderColor,
    };
  }

  override render() {
    if (this.getPlatformWrapper()) {
      return html``;
    }

    return html`
      <dialog
        style=${styleMap(this.getThemeStyles())}
        class="dialog-modal ${this.closingModal ? 'closing' : ''}"
        .open=${this.showModal}>
        <div class="modal-container">
          <header class="modal-header">
            <h2 class="modal-title">${this.modalTitle}</h2>
            <button @click=${() => this.closeModal()} class="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="16px" width="16px" viewBox="0 0 490 490">
                <polygon
                  points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
              </svg>
            </button>
          </header>

          <div class="modal-content">
            <ul class="wallets-list">
              ${this.getSortedList().map(
                (item: ISupportedWallet, i: number) =>
                  html`
                    <li
                      @click=${() => this.pickWalletOption(item)}
                      class="wallet-item ${!item.isAvailable ? 'not-available' : ''} ${i ===
                      this.allowedWallets.value!.length - 1
                        ? 'mb-0'
                        : ''}">
                      <div class="wallet-icon">
                        <img src=${item.icon} alt=${item.name} />
                      </div>
                      <div class="wallet-info">
                        <h3 class="wallet-name">${item.name}</h3>
                        <p class="wallet-description">${this.getWalletDescription(item)}</p>
                      </div>
                      ${!item.isAvailable ? html`<span class="not-available-badge">${this.notAvailableText}</span>` : ''}
                    </li>
                  `
              )}
            </ul>
          </div>
        </div>
      </dialog>

      <div
        style="position: fixed; z-index: 950"
        class="backdrop ${this.closingModal ? 'closing' : ''}"
        @click=${() => this.closeModal()}></div>
    `;
  }

  private getWalletDescription(wallet: ISupportedWallet): string {
    const descriptions: { [key: string]: string } = {
      'freighter': 'Wallet oficial da Stellar Foundation',
      'lobstr': 'Interface amigável e recursos avançados',
      'albedo': 'Wallet web segura, sem extensão',
      'walletconnect': 'Conecte wallets mobile via QR',
      'rabet': 'Wallet com recursos DeFi integrados',
      'xbull': 'Wallet segura e confiável',
      'ledger': 'Hardware wallet para máxima segurança',
      'trezor': 'Hardware wallet líder do mercado',
      'klever': 'Multi-blockchain wallet',
      'hana': 'Wallet simples e intuitiva'
    };
    
    return descriptions[wallet.id.toLowerCase()] || 'Conecte sua wallet para começar';
  }
}
