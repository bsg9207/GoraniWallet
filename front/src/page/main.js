// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import ConnectWalletButton from "../component/button/connectWalletButton";
import MainHeader from "../component/mainHeader";
import WalletMenu from "../component/walletMenu";

// css
import "./css/main.css";

// antd element
const { Content, Footer } = Layout;

const MainPage = () => {
  return (
    <Layout className="GoraniWallet_Layout">
      <MainHeader />
      <ConnectWalletButton />

      <Content>
        <WalletMenu />
        <Outlet />
      </Content>

      <Footer></Footer>
    </Layout>
  );
};

export default MainPage;
