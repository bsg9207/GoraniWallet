// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import Web3ABI from 'web3-eth-abi';

// types - shoud be array
// value - shoud be encoded data
function _decodeParam(types, value) {
  try {
    return Web3ABI.decodeParameter(types, value);
  } catch (e) {
    console.log(e);
  } finally {
  }
}

function _decodeParams(types, value) {
  try {
    return Web3ABI.decodeParameters(types, value);
  } catch (e) {
    console.log(e);
  } finally {
  }
}

export const decodeParam = _decodeParam;
export const decodeParams = _decodeParams;
