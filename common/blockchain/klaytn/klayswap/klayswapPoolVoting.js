// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { CONTRACT_KlayswapPoolVoting } from "../klayswap/contractAddressList.js";
import CBaseContract from "../../utils/base/baseContract.js";
import { eNetworkType, GetRpcUrl } from "../../network/network.js";

class KlayswapPoolVoting extends CBaseContract {
  // constructor
  constructor(fromAddress) {
    const rpc = GetRpcUrl(eNetworkType.Cypress);
    const contractAddress = CONTRACT_KlayswapPoolVoting;

    super(rpc, fromAddress, contractAddress);
  }

  // is valid pool
  IsValidPool = async (lpAddress) => {
    const abi = {
      name: "isValidPool",
      inputs: [{ type: "address", name: "lp" }],
    };
    const param = [lpAddress];
    const returnType = ["bool"];

    const result = await this.CallWithABI(1, abi, param, returnType);
    return result[0];
  };

  // pool count
  PoolCount = async () => {
    const teamWalletSig = "poolCount()";
    const returnParam = ["uint256"];

    const result = await this.CallWithSig(1, teamWalletSig, returnParam);
    return result[0];
  };

  // get user voting pool address
  UserVotingPoolAddress = async (walletAddress, idx) => {
    const abi = {
      name: "userVotingPoolAddress",
      inputs: [
        { type: "address", name: "user" },
        { type: "uint256", name: "idx" },
      ],
    };
    const param = [walletAddress, idx];
    const returnType = ["address"];

    const result = await this.CallWithABI(1, abi, param, returnType);
    return result[0];
  };

  // get user voting pool amount
  UserVotingPoolAmount = async (walletAddress, idx) => {
    const abi = {
      name: "userVotingPoolAmount",
      inputs: [
        { type: "address", name: "user" },
        { type: "uint256", name: "idx" },
      ],
    };
    const param = [walletAddress, idx];
    const returnType = ["uint256"];

    const result = await this.CallWithABI(1, abi, param, returnType);
    return result[0];
  };

  // get user voting pool count
  UserVotingPoolCount = async (walletAddress) => {
    const abi = {
      name: "userVotingPoolCount",
      inputs: [{ type: "address", name: "user" }],
    };
    const param = [walletAddress];
    const returnType = ["uint256"];

    const result = await this.CallWithABI(1, abi, param, returnType);
    return result[0];
  };
}

export default KlayswapPoolVoting;
