// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from '../../common/genResponseData.js';
import { getBalance } from '../../../common/blockchain/rpcRequest/eth/getBalance.js';
import {
  eNetworkType,
  GetRpcUrl,
} from '../../../common/blockchain/network/network.js';

const _balance = async function (_req, _res, next) {
  let code = 200;
  let reason = '';
  let data = {};
  try {
    const walletAddress = _req.body.walletAddress;
    const rpc = GetRpcUrl(eNetworkType.Cypress);
    const balance = await getBalance(rpc, walletAddress);

    data = { walletAddress, balance };
  } catch (e) {
    if (e) {
      code = 500;
      reason = e.message;
    }
  } finally {
    _res.setHeader('Content-Type', 'application/json');

    const res = genResponseData(code, reason, data);
    _res.send(res);
  }
};

export const Balance = _balance;
