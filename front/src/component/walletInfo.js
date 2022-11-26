// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { useEffect } from "react";
import { Row, Col, Card, Statistic } from "antd";
import { useSelector, useDispatch } from "react-redux/es/exports";

// module
import { setBalance } from "../reducer/walletInfoReducer.js";
import {
  GetRpcUrl,
  NetworkTypeToEnum,
} from "../../../common/blockchain/network/network.js";
import KlayUnit from "../../../common/blockchain/klaytn/klayUnit.js";
import { getBalance } from "../../../common/blockchain/rpcRequest/eth/getBalance.js";
import { midReplace } from "../../../common/utils/string/string.js";

const WalletInfo = () => {
  // reducer
  const dispatch = useDispatch();
  const onSetCoinBalance = (balance) => dispatch(setBalance(balance));

  const { selectedNetwork, walletAddress, coinBalance } = useSelector(
    (state) => ({
      selectedNetwork: state.network.selectedNetwork,
      walletAddress: state.walletInfo.walletAddress,
      coinBalance: state.walletInfo.balance,
    })
  );

  // effect
  useEffect(() => {
    if (!walletAddress) {
      return;
    }
    if (!selectedNetwork) {
      return;
    }

    async function settingBalance() {
      const url = GetRpcUrl(NetworkTypeToEnum(selectedNetwork));
      const balance = await getBalance(url, walletAddress);
      onSetCoinBalance(balance);
    }

    settingBalance();
  }, [walletAddress, selectedNetwork]);

  return (
    <div className="GoraniWallet_WalletInfo">
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Address"
              value={
                walletAddress ? midReplace(walletAddress, 16, 27, "...") : "..."
              }
              groupSeparator={""}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Balance"
              value={
                coinBalance ? KlayUnit.ConvertFromPeb(coinBalance, "KLAY") : "0"
              }
              precision={6}
              suffix={"Klay"}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WalletInfo;
