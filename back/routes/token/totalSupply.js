// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from '../../common/genResponseData.js';
import ERC20 from '../../../common/blockchain/contract/erc20.js';
import {
  eNetworkType,
  GetRpcUrl,
} from '../../../common/blockchain/network/network.js';

const _totalSupply = async function (_req, _res, next) {
  let code = 200;
  let reason = '';
  let data = {};
  try {
    const walletAddress = '0x0000000000000000000000000000000000000000';
    const tokenAddress = _req.body.tokenAddress;
    const rpc = GetRpcUrl(eNetworkType.Cypress);

    const token = new ERC20(rpc, walletAddress, tokenAddress);
    const totalSupply = await token.TotalSupply();

    data = { tokenAddress, tokenTotalSupply: totalSupply };
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

export const TotalSupply = _totalSupply;
