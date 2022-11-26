// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import BaseContract from "../utils/base/baseContract.js";

class ERC20 extends BaseContract {
  // get name
  Name = async () => {
    const nameSig = "name()";
    const returnType = ["string"];
    const result = await this.CallWithSig(1, nameSig, returnType);

    return result[0];
  };

  // get symbol
  Symbol = async () => {
    const symbolSig = "symbol()";
    const returnType = ["string"];
    const result = await this.CallWithSig(1, symbolSig, returnType);

    return result[0];
  };

  // get total supply
  TotalSupply = async () => {
    const totalSupplySig = "totalSupply()";
    const returnType = ["uint"];
    const result = await this.CallWithSig(1, totalSupplySig, returnType);

    return result[0];
  };

  // get balance of
  BalanceOf = async (owner) => {
    const abiBalanceOf = {
      name: "balanceOf",
      inputs: [{ name: "owner", type: "address" }],
    };
    const params = [owner];
    const returnType = ["uint256"];

    const result = await this.CallWithABI(1, abiBalanceOf, params, returnType);

    return result[0];
  };
}

export default ERC20;
