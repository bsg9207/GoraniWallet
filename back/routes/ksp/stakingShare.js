// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from "../../common/genResponseData.js";
import KlayswapVotingKSP from "../../../Common/blockchain/klaytn/klayswap/klayswapVotingKSP.js";

const _stakingShare = async function (_req, _res, next) {
  let code = 200;
  let reason = "";
  let data = {};
  try {
    // get share
    const walletAddress = _req.body.walletAddress;
    const klayswapVotingKSP = new KlayswapVotingKSP(walletAddress);
    const vksp = await klayswapVotingKSP.BalanceOf(walletAddress);
    const totalSupply = await klayswapVotingKSP.TotalSupply();
    const share = (vksp / totalSupply) * 100;

    data = { walletAddress, share };
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

export const StakingShare = _stakingShare;
