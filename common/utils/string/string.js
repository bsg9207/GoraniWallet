// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
function _midReplace(str, start, end, newText) {
  return str.substring(0, start) + newText + str.substring(end + 1);
}

export const midReplace = _midReplace;
