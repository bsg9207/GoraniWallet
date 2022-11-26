// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Divider } from 'antd';
import React from 'react';

// module
import WalletInfo from '../component/walletInfo.js';

const KSP = () => {
  return (
    <div className="GoraniWallet_KSP">
      <Divider orientation="left">Wallet</Divider>
      <WalletInfo />
    </div>
  );
};

export default KSP;
