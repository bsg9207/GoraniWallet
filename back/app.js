// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
// module
import express, { json } from "express";

import flash from "connect-flash";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import expressSession from "express-session";

import cors from "cors";
import logger from "morgan";

import rfs from "rotating-file-stream";

import http from "http";

import fs from "fs";

// local module
// middleware
import { MiddleWare_Auth } from "./middleware/auth.js";

// router
import route_loader from "./routes/route_loader.js";

// get config
import routerConf from "./config/router.js";
import { LOGCONF } from "./config/log.js";

// log
const accessLogRotation = (time, index) => {
  if (!time) return LOGCONF.name;
  for (let i = LOGCONF.rotation; i > 0; i--) {
    let logFile = LOGCONF.path + "/" + LOGCONF.name + "." + i;
    if (fs.existsSync(logFile)) {
      if (i == LOGCONF.rotation) {
        fs.unlinkSync(logFile);
      } else {
        let newFile = LOGCONF.path + "/" + LOGCONF.name + "." + (i + 1);
        fs.renameSync(logFile, newFile);
      }
    } else {
    }
  }
  return LOGCONF.name + ".1";
};

const accessLogStream = rfs.createStream(accessLogRotation, {
  interval: LOGCONF.interval,
  path: LOGCONF.path,
});

// create express instance
const app = express();

// set port
console.log("routerConf.server_port : %d", routerConf.server_port);
app.set("port", routerConf.server_port);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser());

// session
app.use(
  expressSession({
    secret: "!sjskwkfgktpdy@2021", // 비밀키
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1, // 세션 유효기간 1 day
    },
  })
);

// SET log
app.use(logger(LOGCONF.format, { stream: accessLogStream }));

app.use(flash());

// set cors
app.use(cors());

//===== Middle Ware 사용 설정 =====//
app.use(MiddleWare_Auth);

app.use(json());

// set router
route_loader.init(app);

//===== 에러 페이지 처리 =====//
const errorHandler = function (err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  if (err.code !== undefined) {
    return res.status(err.code).end(err.message);
  }

  return res.status(404).end("");
};

app.use(errorHandler);

//===== 서버 시작 =====//
//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함morgan
process.on("uncaughtException", function (err) {
  console.log("uncaughtException 발생함 : " + err);
  console.log("서버 프로세스 종료하지 않고 유지함.");
  console.log(err.stack);
});

app.on("close", function () {
  console.log("Express 서버 객체가 종료됩니다.");
});

// 시작된 서버 객체를 리턴받도록 합니다.
const server = http.createServer(app).listen(8080, () => {
  console.log("Server start with port[" + app.get("port") + "]");
});
