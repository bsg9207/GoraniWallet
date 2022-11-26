// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { RpcRequest } from "../rpcRequest.js";

async function _call(rpc, id, params) {
  try {
    return await RpcRequest(rpc, "eth_call", params, id);
  } catch (e) {
    console.log(e);
  }
}

export const call = _call;
