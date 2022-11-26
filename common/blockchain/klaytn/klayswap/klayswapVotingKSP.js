// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import {
  CONTRACT_KlayswapVotingKSP,
  CONTRACT_KlayswapToken,
} from "./contractAddressList.js";
import ERC20 from "../../contract/erc20.js";
import Caver from "caver-js";
import TransferLog from "../utils/transferLog.js";
import { eNetworkType, GetRpcUrl } from "../../network/network.js";

class KlayswapVotingKSP extends ERC20 {
  // constructor
  constructor(fromAddress) {
    const rpc = GetRpcUrl(eNetworkType.Cypress);
    const contractAddress = CONTRACT_KlayswapVotingKSP;
    super(rpc, fromAddress, contractAddress);
  }

  // get governance contract address
  Governance = async () => {
    const governanceSig = "governance()";
    const returnParam = ["address"];

    const result = await this.CallWithSig(1, governanceSig, returnParam);
    return result[0];
  };

  // get user reward sum
  UserRewardSum = async (walletAddress) => {
    const abi = {
      type: "function",
      name: "userRewardSum",
      inputs: [{ type: "address", name: "wallet" }],
    };
    const inputParams = [walletAddress];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);
    return result[0];
  };

  // mining
  Mining = async () => {
    const miningSig = "mining()";
    const returnParam = ["uint256"];

    const result = await this.CallWithSig(1, miningSig, returnParam);
    return result[0];
  };

  // get locked ksp amount
  LockedKSP = async (walletAddress) => {
    const abi = {
      type: "function",
      name: "lockedKSP",
      inputs: [{ type: "address", name: "wallet" }],
    };
    const inputParams = [walletAddress];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);

    return result[0];
  };

  // get unlock time
  UnlockTime = async (walletAddress) => {
    const abi = {
      type: "function",
      name: "unlockTime",
      inputs: [{ type: "address", name: "wallet" }],
    };
    const inputParams = [walletAddress];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);
    return result[0];
  };

  // get lock period
  LockPeriod = async (walletAddress) => {
    const abi = {
      type: "function",
      name: "lockPeriod",
      inputs: [{ type: "address", name: "wallet" }],
    };
    const inputParams = [walletAddress];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);
    return result[0];
  };

  // mining index
  MiningIndex = async () => {
    const miningIndexSig = "miningIndex()";
    const returnParam = ["uint256"];

    const result = await this.CallWithSig(1, miningIndexSig, returnParam);
    return result[0];
  };

  // get last mined index
  LastMined = async () => {
    const lastMinedSig = "lastMined()";
    const returnParam = ["uint256"];

    const result = await this.CallWithSig(1, lastMinedSig, returnParam);
    return result[0];
  };

  // get snapshot balance
  SnapshotBalance = async (walletAddress, idx) => {
    const abi = {
      type: "function",
      name: "snapShotBalance",
      inputs: [
        { type: "address", name: "wallet" },
        { type: "uint256", name: "idx" },
      ],
    };
    const inputParams = [walletAddress, idx];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);
    return result[0];
  };

  // get user last index
  UserLastIndex = async (walletAddress) => {
    const abi = {
      type: "function",
      name: "userLastIndex",
      inputs: [{ type: "address", name: "wallet" }],
    };
    const inputParams = [walletAddress];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);
    return result[0];
  };

  // get snapshot block
  SnapshotBlock = async (walletAddress, idx) => {
    const abi = {
      type: "function",
      name: "snapShotBlock",
      inputs: [
        { type: "address", name: "wallet" },
        { type: "uint256", name: "idx" },
      ],
    };
    const inputParams = [walletAddress, idx];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);
    return result[0];
  };

  // get snapshot count
  SnapshotCount = async (walletAddress) => {
    const abi = {
      type: "function",
      name: "snapShotCount",
      inputs: [{ type: "address", name: "wallet" }],
    };
    const inputParams = [walletAddress];
    const returnTypes = ["uint256"];

    const result = await this.CallWithABI(1, abi, inputParams, returnTypes);
    return result[0];
  };

  // get claimable reward
  ClaimableReward = async (walletAddress, currentBlockNumber) => {
    // last snapshot block number
    const snapshotCount = await this.SnapshotCount(walletAddress);
    const snapshotBlock = await this.SnapshotBlock(
      walletAddress,
      snapshotCount - 1
    );

    const fromblock = Caver.utils.toHex(snapshotBlock);
    const toBlock = Caver.utils.toHex(currentBlockNumber);
    const transferLog = new TransferLog(this.rpc);
    const result = await transferLog.GetTransferLog(
      fromblock,
      toBlock,
      CONTRACT_KlayswapToken,
      CONTRACT_KlayswapToken,
      walletAddress
    );

    const lastLog = result[result.length - 1];
    const lastClaimedBlock = parseInt(lastLog.blockNumber, 16);

    const diffBlock = currentBlockNumber - lastClaimedBlock;
    const kspPerBlock = 0.5 * 0.5;
    const vksp = await this.BalanceOf(walletAddress);
    const totalSupply = await this.TotalSupply();
    const share = vksp / totalSupply;

    const claimableReward = diffBlock * kspPerBlock * share;

    return claimableReward.toString();
  };
}

export default KlayswapVotingKSP;
