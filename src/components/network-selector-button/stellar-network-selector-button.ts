import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { IButtonTheme } from '../../types';
import { dropdownWrapper, buttonContainer, buttonStyles } from '../button/styles';

export enum NetworkSelectorThemeType {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export const NetworkSelectorThemes: { [key in NetworkSelectorThemeType]: IButtonTheme } = {
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

@customElement('stellar-network-selector-button')
export class StellarNetworkSelectorButton extends LitElement {
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
  networkName: string = 'Stellar Testnet';

  @property({ type: String, reflect: true })
  selectedNetwork: string = 'testnet';

  @state()
  showDropdown: boolean = false;

  @state()
  theme: IButtonTheme = NetworkSelectorThemes.LIGHT;

  private get getThemeStyles() {
    return {
      '--button-bg-color': this.theme.bgColor,
      '--button-text-color': this.theme.textColor,
      '--button-solid-text-color': this.theme.solidTextColor,
      '--button-divider-color': this.theme.dividerColor,
      '--button-padding': this.theme.buttonPadding,
      '--button-border-radius': this.theme.buttonBorderRadius,
    };
  }

  private networks = [
    {
      id: 'mainnet',
      name: 'Stellar Mainnet',
      description: 'Production network',
      status: '',
      indicatorClass: 'mainnet',
      horizonUrl: 'https://horizon.stellar.org',
      networkPassphrase: 'Public Global Stellar Network ; September 2015',
      isConnected: false
    },
    {
      id: 'testnet',
      name: 'Stellar Testnet',
      description: 'Test environment',
      status: 'Connected',
      indicatorClass: 'testnet',
      horizonUrl: 'https://horizon-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      isConnected: true
    },
    {
      id: 'futurenet',
      name: 'Stellar Futurenet',
      description: 'Preview features',
      status: '',
      indicatorClass: 'futurenet',
      horizonUrl: 'https://horizon-futurenet.stellar.org',
      networkPassphrase: 'Test SDF Future Network ; October 2022',
      isConnected: false
    }
  ];

  onButtonClicked() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  private handleClickOutside(event: Event) {
    if (this.showDropdown && !this.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  onNetworkSelected(networkId: string) {
    const network = this.networks.find(n => n.id === networkId);
    if (!network) return;

    // Update selected network
    this.selectedNetwork = networkId;
    this.networkName = network.name;

    // Update connection status for all networks
    this.networks.forEach(n => {
      n.isConnected = n.id === networkId;
      n.status = n.isConnected ? 'Connected' : '';
    });

    this.closeDropdown();
    
    // Dispatch custom event with full network details
    this.dispatchEvent(new CustomEvent('network-changed', {
      detail: { 
        networkId, 
        networkName: network.name,
        horizonUrl: network.horizonUrl,
        networkPassphrase: network.networkPassphrase,
        isConnected: true
      },
      bubbles: true,
      composed: true
    }));
  }

  private getCurrentNetwork() {
    return this.networks.find(n => n.id === this.selectedNetwork) || this.networks[0];
  }

  override render() {
    const currentNetwork = this.getCurrentNetwork();
    
    const button = html`
      <button @click=${this.onButtonClicked} class="btn network-btn">
        <div class="btn-content-network">
          <div class="network-indicator ${currentNetwork.indicatorClass}"></div>
          <div class="network-text">
            <span class="network-name">${this.networkName}</span>
          </div>
          <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </button>
    `;

    const dropdown = this.showDropdown
      ? html`
          <section class="dropdown-wrapper network-dropdown ${this.showDropdown ? 'show' : ''}">
            <!-- Header -->
            <div class="network-dropdown-header">
              <h3 class="network-dropdown-title">Select Network</h3>
              <p class="network-dropdown-subtitle">Choose your Stellar network</p>
            </div>
            
            <!-- Network Options -->
            <div class="network-options">
              ${this.networks.map(network => html`
                <div 
                  class="network-option ${this.selectedNetwork === network.id ? 'selected' : ''}"
                  @click=${() => this.onNetworkSelected(network.id)}
                >
                  <div class="network-indicator ${network.indicatorClass}"></div>
                  <div class="network-option-info">
                    <div class="network-option-name">${network.name}</div>
                    <div class="network-option-description">${network.description}</div>
                  </div>
                  ${network.isConnected ? html`
                    <div class="network-option-status ${network.indicatorClass}">Connected</div>
                  ` : ''}
                </div>
              `)}
            </div>
          </section>
        `
      : '';

    return html`
      <section style=${styleMap(this.getThemeStyles)} class="btn-container">
        ${button} 
        ${dropdown}
        ${this.showDropdown ? html`<div class="network-dropdown-backdrop" @click=${this.closeDropdown}></div>` : ''}
      </section>
    `;
  }
}
