import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "../../components/Link";
import { HelpIcon } from "../../components/Svg";
import { Modal } from "../Modal";
import WalletCard from "./WalletCard";
import config from "./config";
import { Login } from "./types";
import { Alert } from "../../components/Alert";
import Text from "../../components/Text/Text";

interface Props {
  login: Login;
  onDismiss?: () => void;
}

const HelpLink = styled(Link)`
  display: flex;
  align-self: center;
  align-items: center;
  margin-top: 24px;
`;

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const mobileScreenSize = 768;

  useEffect(() => {
    if (window.screen.availWidth <= mobileScreenSize) {
      setIsMobileDevice(true);
    }
  }, [])

  return (
    <Modal title="Connect to a wallet" onDismiss={onDismiss}>
      {isMobileDevice &&
        <div style={{ marginBottom: '20px' }}>
          <Alert title="" variant="warning">
            <Text as="p">
              It looks like you are on a mobile device, 
              click <Link style={{display: 'inline-block'}} href="https://docs.pancakeswap.finance/guides/faq#how-do-i-set-up-my-wallet-on-binance-smart-chain" external>here</Link>&nbsp;
              If you are not on a mobile device, use the buttons below to connect your wallet.
            </Text>
          </Alert>
        </div>
      }

      {config.map((entry, index) => (
        <WalletCard
          key={entry.title}
          login={login}
          walletConfig={entry}
          onDismiss={onDismiss}
          mb={index < config.length - 1 ? "8px" : "0"}
        />
      ))}

      <HelpLink
        href="https://docs.pancakeswap.finance/guides/faq#how-do-i-set-up-my-wallet-on-binance-smart-chain"
        external
      >
        <HelpIcon color="primary" mr="6px" />
        Learn how to connect
      </HelpLink>
    </Modal>
  );
};

export default ConnectModal;
