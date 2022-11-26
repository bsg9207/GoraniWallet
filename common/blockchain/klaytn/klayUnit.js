// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import Caver from "caver-js";

export default class KlayUnit {
  // convert value to klay
  static ToKlay(value, fromUnit) {
    return this.ConvertUnit(value, fromUnit, "KLAY");
  }

  // convert value from klay
  static FromKlay(value, toUnit) {
    return this.ConvertUnit(value, "KLAY", toUnit);
  }

  // convert value to ston
  static ToSton(value, fromUnit) {
    return this.ConvertUnit(value, fromUnit, "Ston");
  }

  // convert value from ston
  static FromSton(value, toUnit) {
    return this.ConvertUnit(value, "Ston", toUnit);
  }

  // convert value to pebfromUnit
  static ToPeb(value, fromUnit) {
    return this.ConvertToPeb(value, fromUnit);
  }

  // convert value from peb
  static FromPeb(value, toUnit) {
    return this.ConvertFromPeb(value, toUnit);
  }

  // get unit
  //{
  //    peb:   '1',
  //    kpeb:  '1000',
  //    Mpeb:  '1000000',
  //    Gpeb:  '1000000000',

  //    Ston:  '1000000000',

  //    uKLAY: '1000000000000',
  //    mKLAY: '1000000000000000',

  //    KLAY:  '1000000000000000000',

  //    kKLAY: '1000000000000000000000',
  //    MKLAY: '1000000000000000000000000',
  //    GKLAY: '1000000000000000000000000000',
  //}
  static GetUnit(unit) {
    const unitMap = Caver.utils.unitMap;
    return unitMap[unit];
  }

  // convert from peb
  static ConvertFromPeb(value, toUnit) {
    return Caver.utils.convertFromPeb(value, toUnit);
  }

  // convert to peb
  static ConvertToPeb(value, fromUnit) {
    return Caver.utils.convertToPeb(value, fromUnit);
  }

  // convert `fromUnit` to `toUnit`
  static ConvertUnit(value, fromUnit, toUnit) {
    // convert to peb
    const valueToPeb = this.ConvertToPeb(value, fromUnit);

    // convert to `toUnit`
    return this.ConvertFromPeb(valueToPeb, toUnit);
  }
}
