// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Skeleton, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";

// module
import {
  GetRpcUrl,
  NetworkTypeToEnum,
} from "../../../common/blockchain/network/network.js";
import { getLatestBlockNumber } from "../../../common/blockchain/rpcRequest/eth/blockNumber.js";

// css
import "./css/blockNumberView.css";

const BlocknumberView = () => {
  // state
  const [blockNumber, setBlockNumber] = useState("loading...");

  // reducer
  const { selectedNetwork } = useSelector((state) => ({
    selectedNetwork: state.network.selectedNetwork,
  }));

  // effect
  useEffect(() => {
    const getBlockNumber = setInterval(async () => {
      if (!selectedNetwork) return;

      const url = GetRpcUrl(NetworkTypeToEnum(selectedNetwork));
      const curBlockNumber = await getLatestBlockNumber(url, 1);

      if (curBlockNumber && blockNumber !== curBlockNumber) {
        setBlockNumber(curBlockNumber);
      }
    }, 1000);

    return () => clearInterval(getBlockNumber);
  }, [selectedNetwork]);

  return (
    <div className="GoraniWallet_BlockNumberView">
      {blockNumber === "loading..." ? (
        <Skeleton.Input size={"small"} active={true}></Skeleton.Input>
      ) : (
        <Space size={"default"} align="center">
          #{blockNumber}
        </Space>
      )}
    </div>
  );
};

export default BlocknumberView;
