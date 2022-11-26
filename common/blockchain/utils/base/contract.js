// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { call } from '../../rpcRequest/eth/call.js';
import { encodeAbi, encodeFunctionCall } from '../encoder.js';
import { decodeParams } from '../decoder.js';

class Contract {
  // call contract with abi
  CallContractWithABI = async (
    rpc,
    id,
    abi,
    params,
    fromAddress,
    toAddress,
    returnType
  ) => {
    const encFuncAbi = encodeFunctionCall(abi, params);

    const result = await this.CallContract(
      rpc,
      id,
      fromAddress,
      toAddress,
      encFuncAbi,
      returnType
    );
    // console.log(result);

    return result;
  };

  // call contract with signature
  CallContractWithSig = async (
    rpc,
    id,
    abiFunctionSig,
    fromAddress,
    toAddress,
    returnType
  ) => {
    const encFuncSig = encodeAbi(abiFunctionSig);

    // call contract
    const result = await this.CallContract(
      rpc,
      id,
      fromAddress,
      toAddress,
      encFuncSig,
      returnType
    );
    // console.log(result);

    return result;
  };

  // call contract
  CallContract = async (rpc, id, fromAddress, toAddress, data, returnTypes) => {
    // function call
    const result = await call(rpc, id, [
      {
        from: fromAddress,
        to: toAddress,
        data: data,
      },
      'latest',
    ]);
    // console.log(result);

    if (returnTypes != null && result.result !== undefined) {
      // decodeing result
      let dec = decodeParams(returnTypes, result.result);

      return dec;
    } else {
      return result;
    }
  };
}

export default Contract;
