// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Divider } from "antd";
import React from "react";

// module
import WalletInfo from "../component/walletInfo.js";

// css
import "./css/asset.css";

const Asset = () => {
  return (
    <div className="GoraniWallet_Asset">
      <Divider orientation="left">Wallet</Divider>
      <WalletInfo />
    </div>
  );
};

export default Asset;
