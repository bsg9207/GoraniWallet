// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved

// generate data for response
const _genResponseData = (code, reason, data) => {
  const res = {
    code: code !== undefined ? code : "",
    reason: reason !== undefined ? reason : "",
    data: data !== undefined ? data : "",
  };

  return JSON.stringify(res, null, 2);
};

export const genResponseData = _genResponseData;
