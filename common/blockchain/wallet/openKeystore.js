// Created by Seunggwan, Back on 2023.10.11
// Copyright (c) 2022-2023 Seunggwan, Back - All rights reserved.
import ethJSWallet from 'ethereumjs-wallet';

const _openWalletFromKeystoreV3 = async (objKeystore, password) => {
  return await ethJSWallet.default.fromV3(objKeystore, password);
};

export const openWalletFromKeystoreV3 = _openWalletFromKeystoreV3;
