import { css } from 'lit';

export const buttonContainer = css`
  .btn-container {
    position: relative;
  }
`;

export const buttonStyles = css`
  .btn {
    background: #fddb23;
    border: none;
    border-radius: 36px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    margin: 0;
    font-family: 'Open Sans', arial, sans-serif;
    width: 220px;
    height: 44px;
    position: relative;
    transition: all 0.2s ease;
  }

  .btn:hover {
    background: #f59e0b;
  }

  .btn-content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    gap: 12px;
  }

  .btn-content-connect {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .connect-text {
    font-size: 14px;
    font-weight: 600;
    color: #171717;
    letter-spacing: 0.5px;
  }

  .review-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
  }

  .review-line-1 {
    font-size: 14px;
    font-weight: 600;
    color: #171717;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .review-line-2 {
    font-size: 14px;
    font-weight: 600;
    color: #171717;
    letter-spacing: 0.5px;
  }

  /* Connected state styles */
  .btn:has(.btn-content) {
    background: #ffffff;
    border: 2px solid #e6e6e6;
  }

  .btn:has(.btn-content):hover {
    background: #ffffff;
  }

  .avatar-container {
    width: 36px;
    height: 36px;
    border-radius: 24px;
    background: linear-gradient(135deg, #fddb23 0%, #f59e0b 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 24px;
    object-fit: cover;
  }

  .btn-text {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .account-label {
    font-size: 14px;
    font-weight: 600;
    color: #171717;
    letter-spacing: 0.5px;
  }

  .dropdown-arrow {
    width: 17px;
    height: 24px;
    flex-shrink: 0;
  }

  .dropdown-arrow path {
    stroke: #a3a3a3;
  }

  @media (prefers-color-scheme: dark) {
    .btn {
      background: #fddb23;
    }

    .btn:hover {
      background: #f59e0b;
    }

    .btn:has(.btn-content) {
      background: #161616;
      border-color: #404040;
    }

    .btn:has(.btn-content):hover {
      background: #161616;
    }

    .connect-text {
      color: #171717;
    }

    .review-line-1,
    .review-line-2 {
      color: #171717;
    }

    .account-label {
      color: #f5f5f5;
    }

    .dropdown-arrow path {
      stroke: #a3a3a3;
    }
  }
`;

export const dropdownWrapper = css`
  .dropdown-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 90vh;
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 900;
    font-family: 'Open Sans', arial, sans-serif;
    overflow: hidden;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .dropdown-wrapper.show {
    transform: translateY(0);
  }

  .dropdown-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 850;
  }

  @media screen and (min-width: 768px) {
    .dropdown-wrapper {
      position: absolute;
      top: 110%;
      right: 0;
      left: auto;
      bottom: auto;
      width: 360px;
      max-height: none;
      border-radius: 20px;
      transform: none;
      transition: none;
    }

    .dropdown-wrapper.show {
      transform: none;
    }

    .dropdown-backdrop {
      display: none;
    }
  }

  /* Profile Section */
  .dropdown-profile-section {
    background: linear-gradient(135deg, rgba(0, 167, 181, 0.1) 0%, rgba(0, 118, 128, 0.1) 100%);
    border-bottom: 1px solid #f5f5f5;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .profile-avatar {
    width: 56px;
    height: 56px;
    border-radius: 36px;
    background: linear-gradient(135deg, #fddb23 0%, #f59e0b 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .profile-avatar-img {
    width: 56px;
    height: 56px;
    border-radius: 36px;
    object-fit: cover;
  }

  .profile-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .profile-title {
    font-size: 16px;
    font-weight: 600;
    color: #171717;
    line-height: 24px;
  }

  .profile-address {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 4px 8px;
    font-size: 14px;
    color: #525252;
    font-family: monospace;
    width: fit-content;
  }

  /* Balance Section */
  .dropdown-balance-section {
    padding: 24px;
    border-bottom: 1px solid #f5f5f5;
  }

  .balance-info {
    background: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    padding: 13px;
  }

  .balance-label {
    font-size: 14px;
    color: #737373;
    margin-bottom: 0;
  }

  .balance-amount {
    font-size: 24px;
    font-weight: 600;
    color: #171717;
    margin-top: 0;
  }

  /* Action Buttons */
  .dropdown-actions {
    padding: 20px 24px;
    display: flex;
    gap: 12px;
    border-bottom: 1px solid #f5f5f5;
  }

  .action-button {
    flex: 1;
    height: 44px;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    background: #fafafa;
    color: #404040;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-button:hover {
    background: #f0f0f0;
  }

  .copy-button {
    background: #fafafa;
  }

  .disconnect-button {
    background: #fafafa;
  }

  /* Transactions Section */
  .dropdown-transactions {
    padding: 20px 24px 0;
  }

  .transactions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .transactions-title {
    font-size: 14px;
    color: #737373;
    font-weight: 500;
  }

  .clear-all {
    font-size: 14px;
    color: #3b82f6;
    cursor: pointer;
    font-weight: 500;
  }

  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }

  .transaction-item {
    background: #fafafa;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .transaction-icon {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .transaction-icon.pending {
    background: #dbeafe;
  }

  .transaction-icon.failed {
    background: #fef2f2;
    color: #ef4444;
  }

  .transaction-icon.success {
    background: #d1fae5;
    color: #10b981;
  }

  .transaction-icon.low-balance {
    background: #fef3c7;
    color: #f59e0b;
  }

  .transaction-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .transaction-title {
    font-size: 14px;
    font-weight: 500;
    color: #171717;
    line-height: 20px;
  }

  .transaction-status {
    font-size: 12px;
    color: #737373;
    line-height: 17px;
  }

  .transaction-amount {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .amount {
    font-size: 14px;
    font-weight: 500;
    color: #171717;
    line-height: 20px;
  }

  .time {
    font-size: 12px;
    color: #737373;
    line-height: 17px;
  }

  .view-more {
    text-align: center;
    padding: 12px 0 20px;
    border-top: 1px solid #f5f5f5;
    margin-top: 20px;
  }

  .view-more a {
    font-size: 13px;
    color: #525252;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .view-more a:hover {
    color: #3b82f6;
  }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    .dropdown-wrapper {
      background: #161616;
    }

    .dropdown-profile-section {
      background: linear-gradient(135deg, rgba(0, 167, 181, 0.1) 0%, rgba(0, 118, 128, 0.1) 100%);
      border-bottom-color: #404040;
    }

    .profile-title {
      color: #f5f5f5;
    }

    .profile-address {
      background: #404040;
      color: #a3a3a3;
    }

    .dropdown-balance-section {
      border-bottom-color: #404040;
    }

    .balance-info {
      background: #161616;
      border-color: #404040;
    }

    .balance-label {
      color: #a3a3a3;
    }

    .balance-amount {
      color: #f5f5f5;
    }

    .dropdown-actions {
      border-bottom-color: #404040;
    }

    .action-button {
      background: #262626;
      border-color: #404040;
      color: #a3a3a3;
    }

    .action-button:hover {
      background: #404040;
    }

    .transactions-title {
      color: #a3a3a3;
    }

    .transaction-item {
      background: #262626;
    }

    .transaction-title {
      color: #f5f5f5;
    }

    .transaction-status {
      color: #a3a3a3;
    }

    .amount {
      color: #f5f5f5;
    }

    .time {
      color: #a3a3a3;
    }

    .view-more {
      border-top-color: #404040;
    }

    .view-more a {
      color: #a3a3a3;
    }

    .view-more a:hover {
      color: #60a5fa;
    }
  }

  /* Network Selector Button Styles */
  .network-btn {
    background: #ffffff;
    border: 2px solid #e6e6e6;
    border-radius: 36px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    margin: 0;
    font-family: 'Open Sans', arial, sans-serif;
    width: 220px;
    height: 44px;
    position: relative;
    transition: all 0.2s ease;
  }

  .network-btn:hover {
    background: #f9f9f9;
  }

  .btn-content-network {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    gap: 8px;
  }

  .network-indicator {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #00a7b5;
    box-shadow: 0 0 0 3px rgba(6, 185, 129, 0.2);
    flex-shrink: 0;
  }

  .network-indicator.mainnet {
    background: #00a7b5;
    box-shadow: 0 0 0 3px rgba(6, 185, 129, 0.2);
  }

  .network-indicator.testnet {
    background: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  }

  .network-indicator.futurenet {
    background: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }

  .network-text {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .network-name {
    font-size: 14px;
    font-weight: 500;
    color: #404040;
    letter-spacing: 0.3px;
  }

  .dropdown-arrow {
    width: 16px;
    height: 16px;
    color: #666666;
    transition: transform 0.2s ease;
  }

  .network-btn:hover .dropdown-arrow {
    transform: rotate(180deg);
  }

  /* Network Dropdown Styles */
  .network-dropdown {
    width: 280px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    padding: 0;
    margin-top: 8px;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
  }

  .network-dropdown-header {
    padding: 20px;
    border-bottom: 1px solid #f5f5f5;
  }

  .network-dropdown-title {
    font-size: 16px;
    font-weight: 600;
    color: #171717;
    margin: 0 0 4px 0;
  }

  .network-dropdown-subtitle {
    font-size: 14px;
    color: #737373;
    margin: 0;
  }

  .network-options {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .network-option {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    gap: 12px;
  }

  .network-option:hover {
    background: #f8f9fa;
  }

  .network-option.selected {
    background: #fef3c7;
    border: 1px solid #fde047;
  }

  .network-option-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .network-option-name {
    font-size: 16px;
    font-weight: 500;
    color: #171717;
    margin: 0;
  }

  .network-option-description {
    font-size: 14px;
    color: #737373;
    margin: 0;
  }

  .network-option-status {
    background: rgba(0, 167, 181, 0.2);
    color: #006a73;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
    margin-left: 12px;
  }

  .network-option-status.testnet {
    background: rgba(245, 158, 11, 0.2);
    color: #92400e;
  }

  .network-option-status.futurenet {
    background: rgba(139, 92, 246, 0.2);
    color: #5b21b6;
  }

  /* Dark mode styles for network selector */
  [data-theme="dark"] .network-btn {
    background: #1f1f1f;
    border-color: #404040;
  }

  [data-theme="dark"] .network-btn:hover {
    background: #2a2a2a;
  }

  [data-theme="dark"] .network-name {
    color: #e5e5e5;
  }

  [data-theme="dark"] .dropdown-arrow {
    color: #a3a3a3;
  }

  [data-theme="dark"] .network-dropdown {
    background: #1f1f1f;
    border-color: #404040;
  }

  [data-theme="dark"] .network-dropdown-title {
    color: #f5f5f5;
  }

  [data-theme="dark"] .network-dropdown-subtitle {
    color: #a3a3a3;
  }

  [data-theme="dark"] .network-option:hover {
    background: #2a2a2a;
  }

  [data-theme="dark"] .network-option.selected {
    background: #451a03;
    border-color: #f59e0b;
  }

  [data-theme="dark"] .network-option-name {
    color: #f5f5f5;
  }

  [data-theme="dark"] .network-option-description {
    color: #a3a3a3;
  }
`;
