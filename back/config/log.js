// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const logConfigPath = path.resolve(__dirname + "/conf/log.json");
const logConf = new Configuration(logConfigPath);
//const logConf = new Configuration(  '/etc/dplatform/conf.d/log.json' );

function Configuration(jsonPath) {
  return JSON.parse(fs.readFileSync(jsonPath));
}

export const LOGCONF = logConf.log;
