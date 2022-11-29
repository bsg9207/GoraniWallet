// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from "../../common/genResponseData.js";
import KlayswapVotingKSP from "../../../Common/blockchain/klaytn/klayswap/KlayswapVotingKSP.js";
import { getLatestBlockNumber } from "../../../Common/blockchain/rpcRequest/eth/blockNumber.js";
import {
  eNetworkType,
  GetRpcUrl,
} from "../../../Common/blockchain/network/network.js";

const _claimableReward = async function (_req, _res, next) {
  let code = 200;
  let reason = "";
  let data = {};
  try {
    // get claimable reward
    const walletAddress = _req.body.walletAddress;
    const klayswapVotingKSP = new KlayswapVotingKSP(walletAddress);
    const curBlockNumber = await getLatestBlockNumber(
      GetRpcUrl(eNetworkType.Cypress),
      1
    );
    const claimableReward = await klayswapVotingKSP.ClaimableReward(
      walletAddress,
      curBlockNumber
    );

    data = { walletAddress, claimableReward: claimableReward };
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

export const ClaimableReward = _claimableReward;
