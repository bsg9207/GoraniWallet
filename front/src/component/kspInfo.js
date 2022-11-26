// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Button } from "antd";
import { useSelector } from "react-redux/es/exports";

// module
import KlayUnit from "../../../common/blockchain/klaytn/klayUnit.js";
import {
  GetRpcUrl,
  NetworkTypeToEnum,
} from "../../../common/blockchain/network/network.js";
import { getLatestBlockNumber } from "../../../common/blockchain/rpcRequest/eth/blockNumber.js";
import KlayswapVotingKSP from "../../../common/blockchain/klaytn/klayswap/klayswapVotingKSP.js";

const KSPInfo = () => {
  // state
  const [lockedKSP, setLockedKSP] = useState("0");
  const [amountVKSP, setAmountVKSP] = useState("0");
  const [shareRatio, setShareRatio] = useState("0");
  const [claimedReward, setClaimedReward] = useState("0");
  const [claimableReward, setClaimableReward] = useState("0");
  const [dayReward, setDayReward] = useState("0");
  const [onRefresh, setOnRefresh] = useState(false);

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

    setKSPInfo();
  }, [walletAddress, selectedNetwork]);

  const setKSPInfo = async () => {
    const klayswapVotingKSP = new KlayswapVotingKSP(walletAddress);

    // get locked ksp
    const lockedKSP = await klayswapVotingKSP.LockedKSP(walletAddress);
    setLockedKSP(lockedKSP);

    // get vksp
    const vksp = await klayswapVotingKSP.BalanceOf(walletAddress);
    setAmountVKSP(vksp);

    // calc share
    const totalSupply = await klayswapVotingKSP.TotalSupply();
    const share = vksp / totalSupply;
    const shareRatio = share * 100;
    setShareRatio(shareRatio);

    // get claimed reward
    const claimedReward = await klayswapVotingKSP.UserRewardSum(walletAddress);
    setClaimedReward(claimedReward);

    // get claimable reward

    // get current block number
    const curBlockNumber = await getLatestBlockNumber(
      GetRpcUrl(NetworkTypeToEnum(selectedNetwork)),
      1
    );

    const calcClaimableReward = await klayswapVotingKSP.ClaimableReward(
      walletAddress,
      curBlockNumber
    );
    setClaimableReward(calcClaimableReward);

    // calc day reward
    const dayBlocks = 24 * 60 * 60;
    const kspPerBlock = 0.5 * 0.5;
    const dayReward = dayBlocks * kspPerBlock * share;
    setDayReward(dayReward);
  };

  const onClickRefresh = async () => {
    // on refresh
    setOnRefresh(true);

    await setKSPInfo();

    // finished refresh
    setOnRefresh(false);
  };

  return (
    <div className="GoraniWallet_KSPInfo">
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
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Locked KSP"
              value={
                lockedKSP ? KlayUnit.ConvertFromPeb(lockedKSP, "KLAY") : "0"
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="vKSP"
              value={
                amountVKSP ? KlayUnit.ConvertFromPeb(amountVKSP, "KLAY") : "0"
              }
            ></Statistic>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Staking Share (%)"
              value={shareRatio}
              precision={6}
            ></Statistic>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Claimed Reward"
              value={
                claimedReward
                  ? KlayUnit.ConvertFromPeb(claimedReward, "KLAY")
                  : "0"
              }
              precision={6}
            ></Statistic>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Claimable Reward"
              value={claimableReward}
              precision={6}
            ></Statistic>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Day Reward"
              value={dayReward}
              precision={6}
            ></Statistic>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KSPInfo;
