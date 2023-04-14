var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _mode;
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
    __privateAdd(this, _mode, "\u7B80");
  }
  get num_map() {
    return __privateGet(this, _mode) === "\u7B80" ? num_map : num_map_fan;
  }
  get unit_map() {
    return __privateGet(this, _mode) === "\u7B80" ? unit_map : unit_map_fan;
  }
  setMode(mode) {
    __privateSet(this, _mode, mode);
  }
  convert(num) {
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
          (a, c) => `${a}${this.num_map[c]}`,
          ""
        );
        return `\u70B9${val2}`;
      }
      return "";
    };
    if (len < 2) {
      return `${prefix}${this.num_map[numStr]}${decimal()}`;
    }
    if (len === 2) {
      const val2 = numStr[0] === "1" ? this.unit_map["1"] : `${this.num_map[numStr[0]]}${this.unit_map["1"]}`;
      return `${prefix}${val2}${this.num_map[numStr[1]]}${decimal()}`;
    }
    const val = Array.from(numStr).reverse().reduce((a, c, i) => {
      const idx = Number(i);
      const value = this.num_map[c];
      let unitIdx = idx % 4 === 0 && idx > 0 ? 4 : idx % 4;
      if (idx > 7) {
        unitIdx = idx === 8 ? idx : idx % 8;
      }
      const unit = this.unit_map[unitIdx.toString()];
      return `${value}${unit || ""}${a}`;
    }, decimal());
    return `${prefix}${val}`;
  }
}
_mode = new WeakMap();
var num2Han = new Number2Han();
export { num2Han as default };
