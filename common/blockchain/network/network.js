// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import networkURL from "./networkUrl.js";
export const eNetworkType = {
  Unknown: -1,
  Baobab: 1001,
  Cypress: 8217,
};

export function NetworkTypeToEnum(networkType) {
  switch (networkType) {
    case "Klaytn Baobab":
    case "Baobab":
      return eNetworkType.Baobab;
    case "Klaytn Cypress":
    case "Cypress":
      return eNetworkType.Cypress;
    default:
      return "Unknown network type";
  }
}

export function NetworkTypeToString(networkType) {
  switch (networkType) {
    case eNetworkType.Baobab:
      return "Klaytn Baobab";
    case eNetworkType.Cypress:
      return "Klaytn Cypress";
    case eNetworkType.Hitop:
      return "Hitop";
    default:
      return "Unknown network type";
  }
}

export function GetRpcUrl(networkType) {
  switch (networkType) {
    case eNetworkType.Baobab:
      return networkURL.baobabURL;
    case eNetworkType.Cypress:
      return networkURL.cypressURL;
    case eNetworkType.Hitop:
      return networkURL.hitopURL;
    default:
      return networkURL.cypressURL;
  }
}

export function IsBaobab(networkType) {
  return networkType === eNetworkType.Baobab;
}

export function IsCypress(networkType) {
  return networkType === eNetworkType.Cypress;
}

export function IsHitop(networkType) {
  return networkType === eNetworkType.Hitop;
}
