// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from "../../common/genResponseData.js";
import KlayswapVotingKSP from "../../../Common/blockchain/Klaytn/Klayswap/KlayswapVotingKSP.js";

const _claimedReward = async function (_req, _res, next) {
  let code = 200;
  let reason = "";
  let data = {};
  try {
    // get claimed reward
    const walletAddress = _req.body.walletAddress;
    const klayswapVotingKSP = new KlayswapVotingKSP(walletAddress);
    const claimedReward = await klayswapVotingKSP.UserRewardSum(walletAddress);

    data = { walletAddress, claimedReward };
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

export const ClaimedReward = _claimedReward;
