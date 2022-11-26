// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved

// class for utils
// base for class that using network url
export default class BaseUtils {
  constructor(networkUrl) {
    if (!networkUrl) {
      console.log("Wrong parameter");
      return null;
    }

    this.networkUrl = networkUrl;
  }
}
