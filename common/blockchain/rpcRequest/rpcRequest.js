// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { HttpRequest } from "../../utils/request/httpRequest.js";

const rpcRequest = async (url, method, param, id) => {
  const data = {
    jsonrpc: "2.0",
    method: method,
    params: param,
    id: id,
  };
  return await HttpRequest("POST", url, data);
};

export const RpcRequest = rpcRequest;
