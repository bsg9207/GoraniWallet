// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import Caver from "caver-js";
import TxLog from "./transactionLog.js";

// define transfer sig
const transferSig = "Transfer(address,address,uint256)";
const transferAbi = Caver.abi.encodeEventSignature(transferSig);

class TransferLog extends TxLog {
  // fromBlock : 검색할 log의 시작 block
  // toBlock : 검색할 log의 끝 block
  // tokenAddress : Transfer log의 대상 token
  // fromAddress : 보낸 주소
  // toAddress : 받는 주소
  GetTransferLog = async (
    fromBlock,
    toBlock,
    tokenAddress,
    fromAddress,
    toAddress
  ) => {
    // params
    const fromAddressParam = fromAddress
      ? Caver.abi.encodeParameter("address", fromAddress)
      : null;
    const toAddressParam = toAddress
      ? Caver.abi.encodeParameter("address", toAddress)
      : null;

    // transfer
    // topics[0] -> event signature
    // topics[1] -> address 'to' 받은 주소
    // topics[2] -> address 'from' 보낸 주소
    // data -> uint256 [token -'value' 토큰 갯수/ nft - 'token id']

    // set topics
    const topics = [transferAbi, fromAddressParam, toAddressParam];

    // get logs
    return await this.GetLogs(fromBlock, toBlock, tokenAddress, topics);
  };

  // get all transfer log
  // 두 address 간에 일어난 transfer event log 를 모두 가져온다.
  GetAllTransferLogs = async (fromAddress, toAddress) => {
    return await this.GetTransferLog(
      0x0,
      "latest",
      null,
      fromAddress,
      toAddress
    );
  };
}

export default TransferLog;

// var transfer_abi = [
//     // Transfer
//     {
//         "name": "Transfer",
//         "type": "event",
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "name": "from",
//                 "type": "address",
//             },
//             {
//                 "indexed": true,
//                 "name": "to",
//                 "type": "address",
//             },
//             {
//                 "indexed": false,
//                 "name": "value",
//                 "type": "uint256",
//             },
//         ],
//     },
// ]
