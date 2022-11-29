// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { genResponseData } from "../../common/genResponseData.js";

const _pong = async function (_req, _res, next) {
  const code = 200;
  const reason = "";
  const data = "pong";
  try {
  } catch (e) {
  } finally {
    _res.setHeader("Content-Type", "application/json");

    const res = genResponseData(code, reason, data);
    _res.send(res);
  }
};

export const pong = _pong;
