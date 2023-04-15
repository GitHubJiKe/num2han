var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const num_map = {
  "0": "\u96F6",
  "1": "\u4E00",
  "2": "\u4E8C",
  "3": "\u4E09",
  "4": "\u56DB",
  "5": "\u4E94",
  "6": "\u516D",
  "7": "\u4E03",
  "8": "\u516B",
  "9": "\u4E5D"
};
const num_map_fan = {
  "0": "\u96F6",
  "1": "\u58F9",
  "2": "\u8D30",
  "3": "\u53C1",
  "4": "\u8086",
  "5": "\u4F0D",
  "6": "\u9646",
  "7": "\u67D2",
  "8": "\u634C",
  "9": "\u7396"
};
const unit_map = {
  "1": "\u5341",
  "2": "\u767E",
  "3": "\u5343",
  "4": "\u4E07",
  "8": "\u4EBF"
};
const unit_map_fan = {
  "1": "\u62FE",
  "2": "\u4F70",
  "3": "\u4EDF",
  "4": "\u842C",
  "8": "\u5104"
};
class Number2Han {
  constructor() {
    __publicField(this, "modeMap", {
      \u7B80: {
        num_map,
        unit_map
      },
      \u7E41: {
        num_map: num_map_fan,
        unit_map: unit_map_fan
      }
    });
  }
  convert(num, mode) {
    let m = mode || "\u7B80";
    const { num_map: num_map2, unit_map: unit_map2 } = this.modeMap[m];
    const isString = typeof num === "string";
    const isObject = typeof num === "object";
    if (num === void 0 || num === null || isNaN(num) || isObject) {
      return "";
    }
    if (isString && !num) {
      return "";
    }
    let numStr = isString ? num : String(num), decimalStr = "";
    if (numStr.includes(".")) {
      [numStr, decimalStr] = numStr.split(".");
    }
    let prefix = "";
    if (numStr.includes("-")) {
      prefix = "\u8D1F";
      numStr = numStr.replace("-", "");
    }
    const len = numStr.length;
    const decimal = () => {
      if (decimalStr) {
        const val2 = Array.from(decimalStr).reduce(
          (a, c) => `${a}${num_map2[c]}`,
          ""
        );
        return `\u70B9${val2}`;
      }
      return "";
    };
    if (len < 2) {
      return `${prefix}${num_map2[numStr]}${decimal()}`;
    }
    if (len === 2) {
      const val2 = numStr[0] === "1" ? unit_map2["1"] : `${num_map2[numStr[0]]}${unit_map2["1"]}`;
      return `${prefix}${val2}${num_map2[numStr[1]]}${decimal()}`;
    }
    const val = Array.from(numStr).reverse().reduce((a, c, i) => {
      const idx = Number(i);
      const value = num_map2[c];
      let unitIdx = idx % 4 === 0 && idx > 0 ? 4 : idx % 4;
      if (idx > 7) {
        unitIdx = idx === 8 ? idx : idx % 8;
      }
      const unit = unit_map2[unitIdx.toString()];
      return `${value}${unit || ""}${a}`;
    }, decimal());
    return `${prefix}${val}`;
  }
}
const num2Han = new Number2Han();
export { num2Han as default };
