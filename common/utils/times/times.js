// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
function _getCurrentTimestamp() {
  return new Date().getTime();
}

function _getCurrentUnixtime() {
  //return 되는 시간은 GMT
  return Math.floor(new Date().getTime() / 1000);
}

function _getCurrentUnixdate() {
  //return 되는 시간은 GMT
  return Math.floor(new Date().getTime() / 86400000) * 86400;
}

function _gmtToUnixtime(gmt) {
  let dateTime;
  try {
    dateTime = new Date(gmt);
    return Math.floor(dateTime.getTime() / 1000);
  } catch (e) {
    console.log(e);
  } finally {
    dateTime = undefined;
  }
}

function _unixtimeToGMT(unixTime) {
  let dateTime;
  try {
    dateTime = new Date(unixTime * 1000);
    return dateTime.toGMTString();
  } catch (e) {
    console.log(e);
  } finally {
    dateTime = undefined;
  }
}

export const getCurrentTimestamp = _getCurrentTimestamp;
export const getCurrentUnixtime = _getCurrentUnixtime;
export const getCurrentUnixdate = _getCurrentUnixdate;
export const gmtToUnixtime = _gmtToUnixtime;
export const unixtimeToGMT = _unixtimeToGMT;
