// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { WalletOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";

// modules
import ModalConnectWallet from "../modal/connectWallet.js";

const ConnectWalletButton = () => {
  // state
  const [fOpenConnectWallet, setOpenConnectWallet] = useState(false);

  // functions
  const onClickConnectWallet = () => {
    setOpenConnectWallet(true);
  };

  return (
    <div className="GoraniWallet_ConnectWalletButton">
      <Row gutter={[8, 16]} justify="space-between">
        <Col></Col>
        <Col>
          <Button
            block
            type="button"
            icon={<WalletOutlined />}
            onClick={onClickConnectWallet}
          >
            Connect Wallet
          </Button>
        </Col>
      </Row>
      <ModalConnectWallet
        visible={fOpenConnectWallet}
        onOk={() => setOpenConnectWallet(false)}
        onCancel={() => setOpenConnectWallet(false)}
      ></ModalConnectWallet>
    </div>
  );
};

export default ConnectWalletButton;
