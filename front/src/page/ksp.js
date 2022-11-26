// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Divider } from "antd";
import React from "react";
import KSPInfo from "../component/kspInfo.js";

// module
import WalletInfo from "../component/walletInfo.js";

const KSP = () => {
  return (
    <div className="GoraniWallet_KSP">
      <Divider orientation="left">Wallet</Divider>
      <WalletInfo />
      <Divider orientation="left">KSP</Divider>
      <KSPInfo />
    </div>
  );
};

export default KSP;
