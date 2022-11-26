// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
// define action type
const typePrefix = "reducer.walletInfo.";
const ADDRESS = typePrefix + "address";
const BALANCE = typePrefix + "balance";

// define action creator function
export const setWalletAddress = (walletAddress) => ({
  type: ADDRESS,
  walletAddress,
});

export const setBalance = (balance) => ({
  type: BALANCE,
  balance,
});

const initialState = {
  walletAddress: "",
  balance: "0",
};

const walletInfo = (state = initialState, action) => {
  switch (action.type) {
    // address
    case ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    // balance
    case BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    // default
    default:
      return state;
  }
};

export default walletInfo;
