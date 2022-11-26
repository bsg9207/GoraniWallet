// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import Caverjs from "caver-js";
import BaseUtils from "./baseUtils.js";

class TransactionLog extends BaseUtils {
  // fromBlock : 검색할 log의 시작 block
  // toBlock : 검색할 log의 끝 block
  // contractAddress : log의 대상 contract addresss
  // topics : 검색할 log 내용
  GetLogs = async (fromBlock, toBlock, contractAddress, topics) => {
    // caver
    const Caver = new Caverjs(this.networkUrl);

    // make options
    const options = {
      fromBlock: fromBlock,
      toBlock: toBlock,
      address: contractAddress,
      topics: topics,
    };

    // call get logs
    const result = await Caver.rpc.klay.getLogs(options);

    return result;
  };
}

export default TransactionLog;
