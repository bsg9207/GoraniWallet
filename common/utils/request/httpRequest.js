// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import Axios from "axios";

const _httpRequest = async (method, url, data) => {
  let axiosConfig = { method: method, url: url, data: data };
  let res = undefined;

  try {
    res = await Axios(axiosConfig);
    return res.data;
  } catch (e) {
    throw Error(e.message);
  } finally {
    axiosConfig = undefined;
    res = undefined;
  }
};

const _httpRequestEx = async (method, url, headers, data) => {
  let axiosConfig = {
    method: method,
    url: url,
    headers: headers,
    data: data,
  };
  let res = undefined;

  try {
    res = await Axios(axiosConfig);
    return res.data;
  } catch (e) {
    throw Error(e.message);
  } finally {
    axiosConfig = undefined;
    res = undefined;
  }
};

export const HttpRequest = _httpRequest;
export const HttpRequestEx = _httpRequestEx;
