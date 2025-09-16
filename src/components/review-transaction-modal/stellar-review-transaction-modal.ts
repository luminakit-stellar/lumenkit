import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { modalStyles } from './styles';

@customElement('stellar-review-transaction-modal')
export class StellarReviewTransactionModal extends LitElement {
  static override styles = [modalStyles];

  @property({ type: Boolean })
  showModal = false;

  @property({ type: Function })
  onClose = () => {};

  @state()
  private isCodeVisible = false;

  private toggleCodeVisibility() {
    this.isCodeVisible = !this.isCodeVisible;
  }

  closeModal() {
    this.showModal = false;
    this.onClose();
    
    // Dispatch custom event for external listeners
    this.dispatchEvent(
      new CustomEvent('modal-closed', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    if (!this.showModal) {
      return html``;
    }

    const codeSnippet = html`
<pre><code><span class="hl-keyword">pub</span> <span class="hl-keyword">fn</span> <span class="hl-function">add_liquidity</span>( env: <span class="hl-type">Env</span>, sender: <span class="hl-type">Address</span>,
    amount_xlm: <span class="hl-type">i128</span>,
    amount_usdc: <span class="hl-type">i128</span>, min_lp_tokens: <span class="hl-type">i128</span> ) -> <span class="hl-type">Result</span>&lt;<span class="hl-type">i128</span>, <span class="hl-type">Error</span>&gt; {
    <span class="hl-keyword">let</span> pool = <span class="hl-type">Pool</span>::load(&env); <span class="hl-keyword">let</span> lp_tokens =
    pool.calculate_lp_tokens( amount_xlm, amount_usdc );
    require!(
    lp_tokens >= min_lp_tokens, <span class="hl-type">Error</span>::SlippageExceeded );
    pool.mint_lp_tokens(&sender, lp_tokens); <span class="hl-type">Ok</span>(lp_tokens) }</code></pre>
    `;

    return html`
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Show Audit Transaction</h2>
          <button @click=${this.closeModal} class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="16px" width="16px" viewBox="0 0 490 490">
              <polygon
                points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
            </svg>
          </button>
        </div>
        <div class="scrollable-content">
          <div class="modal-content">
            <div class="sending-section">
              <div class="label">YOU ARE SENDING</div>
              <p class="amount-crypto">100 XLM</p>
              <p class="amount-fiat">≈ $50.00</p>
            </div>
            <div class="details-section">
              <div class="details-title">DETAILS</div>
              <div class="detail-item">
                <span class="label">Network fee:</span>
                <span class="value">0.00001 XLM ($0.01)</span>
              </div>
              <div class="detail-item">
                <span class="label">Estimated time:</span>
                <span class="value">~5 seconds</span>
              </div>
              <div class="detail-item">
                <span class="label">Network:</span>
                <span class="value">Stellar Testnet</span>
              </div>
            </div>
            <div class="xdr-section">
              <span class="label">XDR:</span> AAAAAPewD+/6X800bx3bp49Wf+mUhG3o+TUrcjcst717DWJV...
            </div>
            <div class="transaction-doing-section">
              <h3>WHAT THIS TRANSACTION WILL DO</h3>
              <div class="warning-section">
                <p>
                  This contract is requesting UNLIMITED permission to move ALL your USDC tokens. After
                  approving, it will be able to transfer your funds without asking for authorization again.
                  <strong>DO NOT PROCEED</strong> unless you completely trust this contract.
                </p>
                <div class="risk-tag">HIGH RISK - Unlimited permission requested</div>
              </div>
            </div>
          </div>

          <div class="developer-section">
              <div class="developer-section-header" @click=${this.toggleCodeVisibility}>
                  <span class="arrow ${this.isCodeVisible ? 'up' : ''}"></span>
                  View function code (for developers)
              </div>
              ${this.isCodeVisible
                ? html`
                    <div class="code-block-container">
                      <div class="code-block-header">
                        <span>contract.rs</span>
                        <button class="copy-code-button">Copy code</button>
                      </div>
                      ${codeSnippet}
                    </div>
                  `
                : ''}
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-button cancel">Cancel</button>
          <button class="action-button report">Report</button>
          <button class="action-button proceed">Proceed →</button>
        </div>
      </div>

      <div
        style="position: fixed; z-index: 950"
        class="backdrop"
        @click=${() => this.closeModal()}></div>
    `;
  }
}
