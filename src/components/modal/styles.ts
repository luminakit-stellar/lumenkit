import { css } from 'lit';

export const modalDialogStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Anton:wght@400&display=swap');
  
  .dialog-modal {
    position: fixed;
    z-index: 990;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    width: 520px;
    height: 600px;
    max-height: 80vh;
    border-radius: 24px;
    border-width: 0;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }

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
    border: 1px solid transparent;
  }

  .wallet-item:hover {
    background: #f0f1f3;
    border-color: #fddb23;
  }

  .wallet-item.not-available {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .wallet-item.not-available:hover {
    background: #f6f7f8;
    border-color: transparent;
  }

  .wallet-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  .wallet-icon img {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: contain;
  }

  .wallet-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .wallet-name {
    font-size: 18px;
    font-weight: 600;
    color: #0f0f0f;
    margin: 0;
    line-height: 1.2;
  }

  .wallet-description {
    font-size: 16px;
    font-weight: 400;
    color: #4b5563;
    margin: 0;
    line-height: 1.2;
  }

  .not-available-badge {
    background: #f3f4f6;
    color: #6b7280;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  /* Gradient overlay for wallet items */
  .wallet-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(253, 219, 35, 0) 0%, 
      rgba(253, 219, 35, 1) 50%, 
      rgba(253, 219, 35, 0) 100%);
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  .wallet-item:hover::before {
    opacity: 0.1;
  }


  @media screen and (max-width: 768px) {
    .dialog-modal {
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

    .modal-content {
      padding: 20px;
    }

    .wallet-item {
      padding: 16px;
    }

    .wallet-icon {
      width: 44px;
      height: 44px;
    }

    .wallet-icon img {
      width: 44px;
      height: 44px;
    }

    .wallet-name {
      font-size: 16px;
    }

    .wallet-description {
      font-size: 14px;
    }
  }
`;

export const backdropStyles = css`
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

export const modalAnimations = css`
  .dialog-modal[open] {
    animation: showModal 0.3s ease normal;
  }
  
  @keyframes showModal {
    from {
      transform: translate(-50%, -50%) scale(0.9);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  .dialog-modal.closing {
    animation: hideModal 0.3s ease normal !important;
  }
  
  @keyframes hideModal {
    from {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(0.9);
      opacity: 0;
    }
  }

  .backdrop.closing {
    animation: hideBackdrop 0.3s ease normal !important;
  }
  
  @keyframes hideBackdrop {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
