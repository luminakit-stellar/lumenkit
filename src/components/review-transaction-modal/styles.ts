import { css } from 'lit';

export const modalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Anton:wght@400&display=swap');
  
  .modal-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border-radius: 24px;
    background-color: #ffffff;
    width: 520px;
    height: 700px;
    max-height: 90vh;
    margin: 0;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    color: #333;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border: none;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @media screen and (max-width: 768px) {
    .modal-container {
      width: calc(100% - 32px);
      height: 85vh;
      max-height: 85vh;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
    }

    .modal-header {
      padding: 14px 20px;
      min-height: 50px;
    }

    .modal-title {
      font-size: 18px;
      height: 24px;
    }

    .close-button {
      width: 24px;
      height: 24px;
      border-radius: 10px;
    }
  }

  .scrollable-content {
    overflow-y: auto;
    flex-grow: 1;
  }

  .modal-header {
    background: #fddb23;
    border-bottom: 1px solid #e6e7eb;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 60px;
    flex-shrink: 0;
    border-radius: 24px 24px 0 0;
  }

  .modal-title {
    font-family: 'Anton', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #0f0f0f;
    margin: 0;
    line-height: 1.2;
    height: 28px;
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
  }

  .close-button {
    background: #f6f7f8;
    border: none;
    border-radius: 12px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .close-button:hover {
    background: #e8eaed;
  }

  .close-button svg {
    fill: #000000;
  }

  .modal-content {
    padding: 1rem;
  }

  .sending-section {
    background-color: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    text-align: left;
    margin-bottom: 1rem;
  }

  .sending-section .label {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .sending-section .amount-crypto {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .sending-section .amount-fiat {
    font-size: 0.9rem;
    color: #666;
    margin: 0.25rem 0 0;
  }

  .details-section {
    margin-top: 0;
    font-size: 0.9rem;
    background-color: #fafafa;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .details-section .details-title {
    font-size: 0.875rem;
    color: #666;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .details-section .detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: #333;
  }
  .details-section .detail-item:last-child {
    margin-bottom: 0;
  }

  .details-section .detail-item .label {
    color: #666;
  }

  .details-section .detail-item .value {
    font-weight: 500;
    color: #333;
  }

  .xdr-section {
    margin-top: 1rem;
    background-color: #fafafa;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.8rem;
    word-break: break-all;
    color: #333;
  }
  
  .xdr-section .label {
    font-weight: 600;
  }

  .transaction-doing-section {
    margin-top: 1rem;
  }

  .transaction-doing-section h3 {
    font-size: 0.875rem;
    color: #666;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  .warning-section {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 4px;
    padding: 1rem;
  }

  .warning-section p {
    margin: 0 0 0.75rem 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
  }

  .risk-tag {
    background-color: #f8d7da;
    color: #721c24;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-block;
  }

  .developer-section {
    padding: 0 1rem;
    margin-top: 1rem;
    padding-bottom: 1rem;
  }

  .developer-section-header {
    color: #0066cc;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .arrow {
    border: solid #0066cc;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    margin-right: 8px;
    transform: rotate(45deg); /* Down arrow */
    transition: transform 0.2s;
  }

  .arrow.up {
    transform: rotate(-135deg); /* Up arrow */
  }

  .code-block-container {
    background-color: #1e1e1e;
    border-radius: 12px;
    margin-top: 1rem;
    overflow: hidden;
  }
  
  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2d2d2d;
    padding: 0.5rem 1rem;
    color: #888888;
    font-size: 0.875rem;
  }
  
  .copy-code-button {
    background-color: #505050;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
  }

  .code-block-container pre {
    margin: 0;
    padding: 1rem;
    color: #f8f8f2;
    background-color: #1e1e1e;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
  }
  
  .code-block-container code .hl-keyword { color: #f92672; }
  .code-block-container code .hl-type { color: #66d9ef; }
  .code-block-container code .hl-function { color: #a6e22e; }

  .modal-actions {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .action-button {
    flex-grow: 1;
    padding: 0.75rem;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 12px;
  }

  .action-button.cancel {
    background-color: #0f0f0f;
    color: white;
  }
  
  .action-button.report {
    background-color: #d0021b;
    color: white;
  }
  
  .action-button.proceed {
    background-color: #fde924;
    color: #0f0f0f;
    box-shadow: 0px 4px 12px rgba(253, 233, 36, 0.4);
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 950;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .backdrop.closing {
    opacity: 0;
  }
`;
