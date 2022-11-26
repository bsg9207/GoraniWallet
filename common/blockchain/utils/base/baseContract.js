// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import Contract from "./contract.js";

class CBaseContract extends Contract {
  constructor(rpc, fromAddress, toAddress) {
    // check params
    if (
      rpc === undefined ||
      fromAddress === undefined ||
      toAddress === undefined
    ) {
      throw Error("BaseContract - Invalid parameter");
    }

    if (rpc === "" || fromAddress === "" || toAddress === "") {
      throw Error("BaseContract - Empty parameter");
    }

    super();
    this.rpc = rpc;
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
  }

  // call token contract with abi
  CallWithABI = async (id, abi, params, returnType) => {
    return await this.CallContractWithABI(
      this.rpc,
      id,
      abi,
      params,
      this.fromAddress,
      this.toAddress,
      returnType
    );
  };

  // call token contract with signature
  CallWithSig = async (id, abiFunctionSig, returnType) => {
    return await this.CallContractWithSig(
      this.rpc,
      id,
      abiFunctionSig,
      this.fromAddress,
      this.toAddress,
      returnType
    );
  };
}

export default CBaseContract;
