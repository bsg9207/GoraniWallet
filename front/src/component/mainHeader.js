// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { Link } from "react-router-dom";
import { Col, Row, Space } from "antd";

// module
import NetworkSelector from "./networkSelector.js";
import BlocknumberView from "./blockNumberView.js";
import ThemeSwitch from "./themeSwitch.js";

// css
import "./css/mainHeader.css";

const MainHeader = () => {
  return (
    <div className="GoraniWallet_MainHeader">
      <Row justify="space-between">
        <Col>
          <Space>
            <Link to="/">GoraniWallet</Link>
          </Space>
        </Col>
        <Col>
          <Space size={"middle"} align="center">
            <NetworkSelector />
            <BlocknumberView />
            <ThemeSwitch />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default MainHeader;
