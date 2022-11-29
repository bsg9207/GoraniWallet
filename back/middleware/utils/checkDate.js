// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import {
  gmtToUnixtime,
  getCurrentUnixtime,
} from "../../../common/utils/times/times.js";

// 시간 차는 최대 3분
const VALID_TIME_DIFF = 3 * 60;

function _checkDate(req) {
  try {
    const reqDate = req.headers["request-date"];
    const reqTimestamp = gmtToUnixtime(reqDate);
    const curTimestamp = getCurrentUnixtime();

    const timeDiff = curTimestamp - reqTimestamp;

    if (timeDiff < VALID_TIME_DIFF) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw e;
  }
}

export const checkDate = _checkDate;
