// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    label: <Link to="Asset">Asset</Link>,
    key: "asset",
    icon: <DollarOutlined />,
  },
  {
    label: <Link to="Ksp">ksp</Link>,
    key: "ksp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="7">
        <path
          fill="#ff9632"
          d="m10.2 14.4 9.78 9.8H54L19.4 5.1zm-.7.7L.4 24.2h18.2zm-.3-1 9.4-9.5L10.2 0 1.3 22.1z"
        />
      </svg>
    ),
  },
];

const WalletMenu = () => {
  const [current, setCurrent] = useState("asset");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="GoraniWallet_WalletMenu">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default WalletMenu;
