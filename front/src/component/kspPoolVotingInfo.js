// Created by Seunggwan, Back on 2022.11.17
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Button } from "antd";
import { useSelector } from "react-redux/es/exports";

// module
import KlayUnit from "../../../common/blockchain/klaytn/klayUnit.js";
import KlayswapPoolVoting from "../../../common/blockchain/klaytn/klayswap/klayswapPoolVoting.js";
import ERC20 from "../../../common/blockchain/contract/erc20.js";
import {
  eNetworkType,
  GetRpcUrl,
} from "../../../common/blockchain/network/network.js";

const KSPPoolVotingInfo = () => {
  // state
  const [onRefresh, setOnRefresh] = useState(false);
  const [votingPoolCount, setVotingPoolCount] = useState("0");
  const [votingPoolInfoList, setVotingPoolInfoList] = useState([]);

  // reducer
  const { selectedNetwork, walletAddress } = useSelector((state) => ({
    selectedNetwork: state.network.selectedNetwork,
    walletAddress: state.walletInfo.walletAddress,
  }));

  // effect
  useEffect(() => {
    if (!walletAddress) {
      return;
    }
    if (!selectedNetwork) {
      return;
    }

    setPoolVotingInfo();
  }, [walletAddress, selectedNetwork]);

  const setPoolVotingInfo = async () => {
    // voting pool count
    const klayswapPoolVoting = new KlayswapPoolVoting(walletAddress);
    const votingPoolCount = await klayswapPoolVoting.UserVotingPoolCount(
      walletAddress
    );
    setVotingPoolCount(votingPoolCount);

    // voting pool info list
    const votingPoolInfo = [];
    for (let i = 0; i < votingPoolCount; i++) {
      const address = await klayswapPoolVoting.UserVotingPoolAddress(
        walletAddress,
        i
      );
      const amount = await klayswapPoolVoting.UserVotingPoolAmount(
        walletAddress,
        i
      );
      const token = new ERC20(
        GetRpcUrl(eNetworkType.Cypress),
        walletAddress,
        address
      );

      const info = {
        name: await token.Name(),
        amount: KlayUnit.ConvertFromPeb(amount, "KLAY"),
      };
      votingPoolInfo.push(info);
    }

    votingPoolInfo
      ? setVotingPoolInfoList(votingPoolInfo)
      : setVotingPoolInfoList([]);
  };

  const onClickRefresh = async () => {
    // on refresh
    setOnRefresh(true);

    await setPoolVotingInfo();

    // finished refresh
    setOnRefresh(false);
  };

  const renderVotingPoolInfoList = () => {
    return votingPoolInfoList.length !== 0 ? (
      votingPoolInfoList.map((item) =>
        renderVotingPoolInfo(item.name, item.amount, "0")
      )
    ) : (
      <div></div>
    );
  };

  const renderVotingPoolInfo = (name, votingAmount, reward) => {
    return (
      <div style={{ marginBottom: "8px", marginTop: "8px" }}>
        <Card>
          <Row gutter={(0, 72)}>
            <Col span={12}>
              <Statistic title="Pool" value={name}></Statistic>
            </Col>
            <Col span={12}>
              <Statistic title="Voting Amount" value={votingAmount}></Statistic>
            </Col>
          </Row>
        </Card>
      </div>
    );
  };

  return (
    <div className="GoraniWallet_KSPPoolVotingInfo">
      <div style={{ marginBottom: "8px" }}>
        <Row gutter={[8, 8]} justify="space-between">
          <Col></Col>
          <Col>
            <Button onClick={onClickRefresh} loading={onRefresh}>
              Refresh Info
            </Button>
          </Col>
        </Row>
      </div>
      <Row gutter={(8, 8)} justify="space-between">
        <Col span={6}>
          <Card>
            <Statistic
              title="Voting Pool Count"
              value={votingPoolCount ? votingPoolCount : "0"}
            ></Statistic>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      {renderVotingPoolInfoList()}
    </div>
  );
};

export default KSPPoolVotingInfo;
