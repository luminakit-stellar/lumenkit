import { css } from 'lit';

export const modalDialogStyles = css`
  .dialog-modal {
    position: fixed;
    z-index: 990;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 600px;
    max-height: 90vh;
    border-radius: 1rem 1rem 0 0;
    border-width: 0;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
    .dialog-modal {
      bottom: auto;
      top: 50%;
      left: 50%;
      right: auto;
      transform: translate(-50%, -50%);
      border-radius: 24px;
      max-width: 520px;
      width: 520px;
    }
  }
`;

export const modalDialogBodyStyles = css`
  .modal-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    padding: 24px;
    background: #ffffff;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Custom scrollbar styles */
  .modal-content::-webkit-scrollbar {
    width: 6px;
  }

  .modal-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .modal-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .modal-content::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  .wallets-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .wallet-item {
    background: #f6f7f8;
    border-radius: 16px;
    padding: 17.5px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .wallet-item:hover {
    background: #e8eaed;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .wallet-item.not-available {
    cursor: not-allowed;
    opacity: 0.6;
    background: #f8f9fa;
  }

  .wallet-item.not-available:hover {
    background: #f8f9fa;
    transform: none;
    box-shadow: none;
  }

  .wallet-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .wallet-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .wallet-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .wallet-name {
    font-size: 16px;
    font-weight: 600;
    color: #0f0f0f;
    margin: 0 0 4px 0;
  }

  .wallet-description {
    font-size: 14px;
    color: #666666;
    margin: 0;
  }

  .not-available-badge {
    margin-left: auto;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background: #f3f4f6;
    color: #6b7280;
    border: 1px solid #e5e7eb;
  }

  .exclusive-badge {
    margin-left: auto;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: #ffffff;
    border: none;
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
    }
    50% {
      box-shadow: 0 4px 16px rgba(255, 107, 107, 0.5);
    }
    100% {
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
    }
  }

  /* Dark mode styles */
  [data-theme="dark"] .dialog-modal {
    background: #1a1a1a;
  }

  [data-theme="dark"] .modal-header {
    background: #2d2d2d;
    border-bottom-color: #404040;
  }

  [data-theme="dark"] .modal-title {
    color: #ffffff;
  }

  [data-theme="dark"] .close-button {
    background: #404040;
  }

  [data-theme="dark"] .close-button:hover {
    background: #555555;
  }

  [data-theme="dark"] .close-button svg {
    fill: #ffffff;
  }

  [data-theme="dark"] .modal-content {
    background: #1a1a1a;
  }

  [data-theme="dark"] .wallet-item {
    background: #2d2d2d;
  }

  [data-theme="dark"] .wallet-item:hover {
    background: #404040;
  }

  [data-theme="dark"] .wallet-name {
    color: #ffffff;
  }

  [data-theme="dark"] .wallet-description {
    color: #a0a0a0;
  }

  [data-theme="dark"] .not-available-badge {
    background: #404040;
    color: #a0a0a0;
    border-color: #555555;
  }

  [data-theme="dark"] .exclusive-badge {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
  }
`;

export const modalHelpSection = css``;

export const modalWalletsSection = css``;

export const backdropStyles = css`
  .dialog-modal[open] + .backdrop {
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const modalAnimations = css`
  .dialog-modal[open] {
    -webkit-animation: showModal 0.3s ease normal;
  }
  @-webkit-keyframes showModal {
    from {
      transform: translateY(25%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  .dialog-modal.closing {
    -webkit-animation: hideModal 0.3s ease normal !important;
  }
  @-webkit-keyframes hideModal {
    from {
      transform: translateY(0%);
      opacity: 1;
    }
    to {
      transform: translateY(25%);
      opacity: 0;
    }
  }

  .backdrop.closing {
    -webkit-animation: hideBackdrop 0.3s ease normal !important;
  }
  @-webkit-keyframes hideBackdrop {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;