// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { checkDate } from "./utils/checkDate.js";

const _middleWare_auth = async function (req, res, next) {
  try {
    console.log("Entriy _middleWare_auth");

    // 1. check date
    // 서버 시간과 비교해서 최대 3분전에 시작된 http request 만 허용
    const fCheckDate = checkDate(req);
    if (fCheckDate === false) {
      const error = {
        code: 403,
        message: "[unauthorized] invalid date",
      };
      throw error;
    }

    next();
  } catch (e) {
    next(e);
  } finally {
  }
};

export const MiddleWare_Auth = _middleWare_auth;
