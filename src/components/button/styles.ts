import { css } from 'lit';

export const buttonContainer = css`
  .btn-container {
    position: relative;
  }
`;

export const buttonStyles = css`
  .btn {
    background: #ffffff;
    border: 2px solid #e6e6e6;
    border-radius: 36px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    line-height: 100%;
    margin: 0;
    font-family: 'Open Sans', arial, sans-serif;
    width: 220px;
    height: 44px;
    position: relative;
  }

  .btn-content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    gap: 12px;
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
      background-color: #161616;
      border-color: #404040;
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
    position: absolute;
    top: 110%;
    right: 0;
    width: 360px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 900;
    font-family: 'Open Sans', arial, sans-serif;
    overflow: hidden;
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
`;
