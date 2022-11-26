// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import ChainList from "../../../common/blockchain/network/chainList.js";
import { eNetworkType } from "../../../common/blockchain/network/network.js";
import { setNetwork } from "../reducer/networkReducer.js";

const NetworkSelector = () => {
  // state
  const [optionsList, setOptionsList] = useState();

  const dispatch = useDispatch();
  const onSetNetwork = (network) => dispatch(setNetwork(network));

  // effect
  useEffect(() => {
    async function init() {
      const optionsList = createOptions();

      setOptionsList(optionsList);
    }
    init();
  }, []);

  // on change
  const onChange = (value) => {
    console.log("selected:", value);
    onSetNetwork(value);
  };

  // create options
  const createOptions = () => {
    let optionsKlaytn = [];
    for (let network in eNetworkType) {
      // pass unknwon
      if (eNetworkType[network] === eNetworkType.Unknown) {
        continue;
      }

      optionsKlaytn.push(network);
    }

    let optionsList = [];
    for (let chain in ChainList) {
      let options = [];
      if (chain === "Klaytn") {
        for (let idx in optionsKlaytn) {
          const network = optionsKlaytn[idx];
          options.push({ label: network, value: network, id: idx });
        }
      }

      optionsList.push({
        label: chain,
        options: options,
      });
    }

    return optionsList;
  };

  return (
    <Select
      defaultValue="Cypress"
      style={{ width: 150 }}
      onChange={onChange}
      options={optionsList}
    ></Select>
  );
};

export default NetworkSelector;
