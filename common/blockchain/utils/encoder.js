// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import Web3ABI from 'web3-eth-abi';
import EtherABI from 'ethereumjs-abi';

function _encodeAbi(signature, ...args) {
  try {
    return '0x' + EtherABI.simpleEncode(signature, ...args).toString('hex');
  } catch (e) {
    console.log(e);
  } finally {
  }
}

function _encodeFunctionCall(abi, params) {
  try {
    return Web3ABI.encodeFunctionCall(abi, params);
  } catch (e) {
    console.log(e);
  } finally {
  }
}

function _encodeEventSignature(functionName) {
  try {
    return Web3ABI.encodeEventSignature(functionName);
  } catch (e) {
    console.log(e);
  } finally {
  }
}

// types - shoud be array
// value - shoud be encoded data
function _encodeParam(types, value) {
  try {
    return Web3ABI.encodeParameter(types, value);
  } catch (e) {
    console.log(e);
  } finally {
  }
}

function _encodeParams(types, value) {
  try {
    return Web3ABI.encodeParameters(types, value);
  } catch (e) {
    console.log(e);
  } finally {
  }
}

export const encodeAbi = _encodeAbi;
export const encodeFunctionCall = _encodeFunctionCall;
export const encodeEventSignature = _encodeEventSignature;
export const encodeParam = _encodeParam;
export const encodeParams = _encodeParams;
