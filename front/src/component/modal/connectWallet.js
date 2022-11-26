// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Modal, Row, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";

// reducer
import { setWalletAddress } from "../../reducer/walletInfoReducer.js";

const ModalConnectWallet = (props) => {
  // property
  const { visible, onOk, onCancel } = props;

  // state
  const [onConnecting, setOnConnecting] = useState(false);
  const [onKaikas, setOnKaikas] = useState(false);
  const [onMetamask, setOnMetaMask] = useState(false);
  const [isEnabledKaikas, setEnabledKaikas] = useState(false);

  // reducer
  const dispatch = useDispatch();
  const onSetWalletAddress = (address) => dispatch(setWalletAddress(address));

  // functions
  const _onOk = () => {
    // reset all state
    _resetAllState();

    // process on ok
    onOk();
  };

  const _onCancel = () => {
    // reset all state
    _resetAllState();

    // process on cancel
    onCancel();
  };

  const _resetAllState = () => {
    // reset all state
    setOnConnecting(false);
    setOnMetaMask(false);
    setOnKaikas(false);
    setEnabledKaikas(false);
  };

  const isKaikasInstalled = () => {
    const { klaytn } = window;

    if (klaytn) {
      // installed
      return true;
    } else {
      // not installed
      return false;
    }
  };

  const connectWithKaikas = async () => {
    // check kaikas

    if (!isKaikasInstalled()) {
      return undefined;
    }

    // enable kaikas
    const { klaytn } = window;
    const result = await klaytn.enable();

    if (result === undefined) {
      return undefined;
    }

    // set address
    onSetWalletAddress(klaytn.selectedAddress);

    // set event
    klaytn.on("accountsChanged", function (accounts) {
      onSetWalletAddress(accounts[0]);
    });

    // set state enable kaikas
    setEnabledKaikas(true);

    return result;
  };

  // modules
  const ConnectingWallet = () => {
    const onClickKaikas = async () => {
      // set state on kaikas
      setOnConnecting(true);
      setOnKaikas(true);
      setOnMetaMask(false);

      // check kaikas
      if (isKaikasInstalled() === false) {
        // open error message
        // msg : 'please, install kaikas first'
        Modal.error({
          title: "Please, Install kaikas first",
          centered: true,
          onOk() {
            _resetAllState();
          },
        });
        return;
      }

      // connect kaikas
      const result = await connectWithKaikas();

      if (result !== undefined) {
        // close after 2 sec
        setTimeout(() => {
          // reset state
          _resetAllState();

          // close
          onCancel();
        }, 2 * 1000);
      }
    };

    const onClickMetaMask = () => {
      // set state on metamask
      setOnConnecting(true);
      setOnKaikas(false);
      setOnMetaMask(true);

      // connect wallet with metamask
    };

    return (
      <Row gutter={[0, 8]}>
        <Button block onClick={onClickKaikas}>
          Kaikas
        </Button>
        <Button block onClick={onClickMetaMask}>
          Metamask
        </Button>
      </Row>
    );
  };

  return (
    <div className="GoraniWallet_ModalConnectWallet">
      <Modal
        title="Connect Wallet"
        centered
        visible={visible}
        onOk={_onOk}
        onCancel={_onCancel}
        width={400}
        footer={null}
      >
        {onConnecting === false ? (
          <ConnectingWallet />
        ) : onKaikas === true ? (
          isEnabledKaikas === false ? (
            <Row justify="center" gutter={[8, 8]}>
              <Col span={24}>
                <div style={{ textAlign: "center" }}>
                  <Spin
                    spinning={isEnabledKaikas === false}
                    indicator={
                      <LoadingOutlined spin style={{ fontSize: 30 }} />
                    }
                  ></Spin>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ textAlign: "center" }}>Kaikas 연동 중</div>
              </Col>
            </Row>
          ) : (
            <Alert
              message="Success"
              type="success"
              showIcon
              description="Kaikas 연결 완료. 2초 뒤 창이 자동으로 닫힙니다."
            ></Alert>
          )
        ) : onMetamask === true ? (
          <Row justify="center" gutter={[8, 8]}>
            <Col span={24}>
              <div style={{ textAlign: "center" }}>기능 준비중</div>
            </Col>
            <Button
              onClick={() => {
                _resetAllState();
              }}
            >
              돌아가기
            </Button>
          </Row>
        ) : (
          <div>error</div>
        )}
      </Modal>
    </div>
  );
};

export default ModalConnectWallet;
