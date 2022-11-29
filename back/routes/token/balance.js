// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from "../../common/genResponseData.js";
import ERC20 from "../../../common/blockchain/contract/erc20.js";
import {
  eNetworkType,
  GetRpcUrl,
} from "../../../common/blockchain/network/network.js";

const _balance = async function (_req, _res, next) {
  let code = 200;
  let reason = "";
  let data = {};
  try {
    const walletAddress = _req.body.walletAddress;
    const tokenAddress = _req.body.tokenAddress;
    const rpc = GetRpcUrl(eNetworkType.Cypress);

    const token = new ERC20(rpc, walletAddress, tokenAddress);
    const balance = await token.BalanceOf(walletAddress);

    data = { walletAddress, tokenAddress, tokenBalance: balance };
  } catch (e) {
    if (e) {
      code = 500;
      reason = e.message;
    }
  } finally {
    _res.setHeader("Content-Type", "application/json");

    const res = genResponseData(code, reason, data);
    _res.send(res);
  }
};

export const Balance = _balance;
