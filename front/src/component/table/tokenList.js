// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Statistic, Table } from "antd";
import { useSelector } from "react-redux/es/exports";

// module
import supportTokenList from "../../utils/supportTokenList.js";
import ERC20 from "../../../../common/blockchain/contract/erc20.js";
import {
  GetRpcUrl,
  NetworkTypeToEnum,
} from "../../../../common/blockchain/network/network.js";
import KlayUnit from "../../../../common/blockchain/klaytn/klayUnit.js";
import KlayswapUtil from "../../../../common/blockchain/klaytn/klayswap/klayswapUtils.js";

const TokenList = () => {
  // const
  const columns = [
    { title: "Symbol", dataIndex: "symbol", key: "symbol" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Balance", dataIndex: "balance", key: "balance" },
    { title: "Price On KSP", dataIndex: "price", key: "price" },
    { title: "Asset", dataIndex: "asset", key: "asset" },
  ];

  // state
  const [tableData, setTableData] = useState([]);
  const [onRefresh, setOnRefresh] = useState(false);
  const [totalAsset, setTotalAsset] = useState(0);

  // reducer
  const { selectedNetwork, walletAddress } = useSelector((state) => ({
    selectedNetwork: state.network.selectedNetwork,
    walletAddress: state.walletInfo.walletAddress,
  }));

  // effect
  useEffect(() => {
    if (!walletAddress) return;

    setTokenListData();
  }, [walletAddress]);

  useEffect(() => {
    if (!walletAddress || !tableData) return;

    let totalAsset = 0;
    for (const row in tableData) {
      const rowData = tableData[row];
      totalAsset += rowData.asset;
    }

    setTotalAsset(totalAsset);
  }, [walletAddress, tableData]);

  // functions
  const setTokenListData = async () => {
    let list = [];
    let idx = 0;

    for (const token in supportTokenList) {
      let tokenData = await getTokenData(supportTokenList[token]);

      tokenData.key = idx.toString();
      list.push(tokenData);

      idx++;

      // sleep for avoid 'too many request'
      await sleep(100);
    }

    // set table data
    setTableData(list);
  };

  const getTokenData = async (tokenAddress) => {
    const url = GetRpcUrl(NetworkTypeToEnum(selectedNetwork));
    const token = new ERC20(url, walletAddress, tokenAddress);
    const balance = KlayUnit.ConvertFromPeb(
      await token.BalanceOf(walletAddress),
      "KLAY"
    );

    const klayswapUtils = new KlayswapUtil(walletAddress);
    const price = await klayswapUtils.GetTokenPriceOnKSP(tokenAddress);
    const asset = price === "not available" ? 0 : Number(balance * price);

    return {
      name: await token.Name(),
      symbol: await token.Symbol(),
      balance: balance,
      price: price,
      asset: asset,
    };
  };

  const onClickRefresh = async () => {
    // on refresh
    setOnRefresh(true);

    await setTokenListData();

    // finished refresh
    setOnRefresh(false);
  };

  return (
    <div className="GoraniWallet_TokenList">
      <Row gutter={[8, 8]} justify="space-between">
        <Col></Col>
        <Col>
          <Button onClick={onClickRefresh} loading={onRefresh}>
            Refresh
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Asset"
              prefix="$"
              value={totalAsset ? totalAsset : "0"}
            ></Statistic>
          </Card>
        </Col>
        <Col span={12}></Col>
        <Col span={24}>
          <Table columns={columns} dataSource={[...tableData]}></Table>
        </Col>
      </Row>
    </div>
  );
};

export default TokenList;

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
