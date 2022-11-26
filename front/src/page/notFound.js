// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Result } from "antd";

const NotFound = () => {
  return (
    <div className="GoraniWallet_NotFound">
      <Result
        icon={<QuestionCircleOutlined />}
        title={"404"}
        subTitle="The page does not exist."
      ></Result>
    </div>
  );
};

export default NotFound;
