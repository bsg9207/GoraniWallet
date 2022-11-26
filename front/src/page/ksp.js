// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Divider } from "antd";
import React from "react";

// module
import WalletInfo from "../component/walletInfo.js";
import KSPInfo from "../component/kspInfo.js";
import KSPPoolVotingInfo from "../component/kspPoolVotingInfo.js";

const KSP = () => {
  return (
    <div className="GoraniWallet_KSP">
      <Divider orientation="left">Wallet</Divider>
      <WalletInfo />
      <Divider orientation="left">KSP</Divider>
      <KSPInfo />
      <Divider orientation="left">Pool Voting</Divider>
      <KSPPoolVotingInfo />
    </div>
  );
};

export default KSP;
