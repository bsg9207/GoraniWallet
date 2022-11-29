// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from '../../common/genResponseData.js';
import KlayswapUtil from '../../../common/blockchain/klaytn/klayswap/klayswapUtils.js';
import { eNetworkType, GetRpcUrl } from '../../../common/blockchain/network/network.js';

const _priceOnKSP = async function (_req, _res, next) {
  let code = 200;
  let reason = '';
  let data = {};
  try {
    const fromAddress = '0x0000000000000000000000000000000000000000'
    const tokenAddress = _req.body.tokenAddress;
    const klayswapUtil = new KlayswapUtil(fromAddress);
    const priceOnKSP = await klayswapUtil.GetTokenPriceOnKSP(tokenAddress);

    data = { tokenAddress, priceOnKSP };
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

export const PriceOnKSP = _priceOnKSP;
