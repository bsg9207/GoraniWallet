// Created by Seunggwan, Back on 2022.09.30
import { RpcRequest } from "../rpcRequest.js";

async function _getBalance(rpc, address) {
  try {
    // request
    const result = await RpcRequest(
      rpc,
      "eth_getBalance",
      [address, "latest"],
      1
    );

    // convert to decimal from hex
    const balance = parseInt(result.result, 16);

    return balance;
  } catch (e) {
    console.log(e);
  }
}

export const getBalance = _getBalance;
