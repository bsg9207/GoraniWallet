// Created by Seunggwan, Back on 2022.07.12
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { CONTRACT_KlayswapUtils } from "./contractAddressList.js";
import CBaseContract from "../../utils/base/baseContract.js";
import KlayUnit from "../klayUnit.js";
import { eNetworkType, GetRpcUrl } from "../../network/network.js";

class KlayswapUtils extends CBaseContract {
  // constructor
  constructor(fromAddress) {
    const contractAddress = CONTRACT_KlayswapUtils;
    const rpc = GetRpcUrl(eNetworkType.Cypress);
    super(rpc, fromAddress, contractAddress);
  }

  // get pool data
  GetPoolData = async (lpAddress) => {
    const abi = {
      name: "getPoolData",
      inputs: [{ type: "address", name: "lp" }],
    };

    return await this.CallWithABI(
      1,
      abi,
      [lpAddress],
      [
        "uint", // miningRate
        "uint", // rateDecimals
        "address", // tokenA
        "uint", // amountA
        "address", // tokenB
        "uint", // amountB
        "uint", // airdropCount
        "address[]", // airdropTokens
        "uint[]", // airdropSettings
      ]
    );
  };

  // estimate swap
  EstimateSwap = async (tokenIn, tokenOut, amountIn, path) => {
    const abi = {
      type: "function",
      name: "estimateSwap",
      inputs: [
        { type: "address", name: "tokenIn" },
        { type: "address", name: "tokenOut" },
        { type: "uint256", name: "amountIn" },
        { type: "address[]", name: "path" },
      ],
    };

    const result = await this.CallWithABI(
      1,
      abi,
      [tokenIn, tokenOut, amountIn, path],
      ["uint256"]
    );

    return result[0];
  };

  // get token price on usdt
  GetTokenPriceOnKSP = async (token) => {
    const usdtAddress = "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167";
    let result = "";

    try {
      result = await this.EstimateSwap(
        token,
        usdtAddress,
        KlayUnit.ConvertToPeb(1, "KLAY"),
        []
      );

      result = KlayUnit.ConvertUnit(result, "uKLAY", "KLAY");
    } catch (e) {
      if (e) {
        console.log(e.message);
        result = "not available";
      }
    } finally {
      return result;
    }
  };
}

export default KlayswapUtils;
