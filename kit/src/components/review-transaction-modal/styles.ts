import { css } from 'lit';

export const modalStyles = css`
  .modal-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    border-radius: 8px;
    background-color: #ffffff;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #333;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    overflow: hidden;
  }

  @media screen and (max-width: 768px) {
    .modal-container {
      top: auto;
      bottom: 0;
      left: 0;
      right: 0;
      transform: none;
      max-width: none;
      border-radius: 12px 12px 0 0;
      max-height: 90vh;
    }
  }

  .scrollable-content {
    overflow-y: auto;
    flex-grow: 1;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border-bottom: solid 1px #ccc;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    flex-shrink: 0;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: normal;
    color: #666;
    padding: 0.25rem;
  }

  .close-button:hover {
    color: #333;
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
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
