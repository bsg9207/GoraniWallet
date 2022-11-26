// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
// define action type
const typePrefix = "reducer.network.";
const NETWORK = typePrefix + "NETWORK";

// define action creator function
export const setNetwork = (selectedNetwork) => ({
  type: NETWORK,
  selectedNetwork,
});

const initialState = {
  selectedNetwork: "Cypress",
};

const network = (state = initialState, action) => {
  switch (action.type) {
    // network
    case NETWORK:
      return {
        ...state,
        selectedNetwork: action.selectedNetwork,
      };
    // default
    default:
      return state;
  }
};

export default network;
