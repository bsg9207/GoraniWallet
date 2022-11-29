// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import routerConf from "../config/router.js";

const route_loader = {};
route_loader.init = async function (app) {
  console.log("called route_loader.init.");
  return await initRoutes(app);
};

async function initRoutes(app) {
  try {
    const infoLen = routerConf.route_info.length;
    console.log("number of routers : %d", infoLen);

    for (let i = 0; i < infoLen; i++) {
      let curItem = routerConf.route_info[i];

      const curModule = await import(curItem.file);
      if (curItem.type === "get") {
        app.get(curItem.path, curModule[curItem.method]);
      } else if (curItem.type === "post") {
        app.post(curItem.path, curModule[curItem.method]);
      } else if (curItem.type === "put") {
        app.put(curItem.path, curModule[curItem.method]);
      } else if (curItem.type === "delete") {
        app.delete(curItem.path, curModule[curItem.method]);
      } else {
        app.post(curItem.path, curModule[curItem.method]);
      }
      console.log(
        "set route file: %s, path: %s, method: %s, type: %s ",
        curItem.file,
        curItem.path,
        curItem.method,
        curItem.type
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export default route_loader;
