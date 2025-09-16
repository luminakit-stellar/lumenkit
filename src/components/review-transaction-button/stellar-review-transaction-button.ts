import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { IButtonTheme } from '../../types';
import { dropdownWrapper, buttonContainer, buttonStyles } from '../button/styles';

export enum ReviewButtonThemeType {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export const ReviewButtonThemes: { [key in ReviewButtonThemeType]: IButtonTheme } = {
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

@customElement('stellar-review-transaction-button')
export class StellarReviewTransactionButton extends LitElement {
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
  buttonText: string = 'Review Transaction';

  @state()
  showDropdown: boolean = false;

  @state()
  theme: IButtonTheme = ReviewButtonThemes.LIGHT;

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

  onButtonClicked() {
    this.dispatchEvent(
      new CustomEvent('review-transaction-clicked', {
        bubbles: true,
        composed: true,
      })
    );
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  override render() {
    const button = html`
      <button @click=${this.onButtonClicked} class="btn">
        <div class="btn-content-connect">
          <div class="review-text">
            <div class="review-line-1">Review</div>
            <div class="review-line-2">Transaction</div>
          </div>
        </div>
      </button>
    `;

    return html`
      <section style=${styleMap(this.getThemeStyles)} class="btn-container">${button}</section>
    `;
  }
}
