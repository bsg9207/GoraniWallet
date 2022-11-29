// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from "../../common/genResponseData.js";

// pong
const _pong = async function (_req, _res, next) {
  const code = 200;
  const reason = "";
  let data = {};
  try {
    data = { request: _req.body, response: "pong" };
  } catch (e) {
  } finally {
    const res = genResponseData(code, reason, data);

    _res.setHeader('Content-Type', 'application/json');
    _res.send(res);
  }
};

export const pong = _pong;
