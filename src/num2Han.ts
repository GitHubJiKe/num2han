const num_map = {
  "0": "零",
  "1": "一",
  "2": "二",
  "3": "三",
  "4": "四",
  "5": "五",
  "6": "六",
  "7": "七",
  "8": "八",
  "9": "九",
};
const num_map_fan = {
  "0": "零",
  "1": "壹",
  "2": "贰",
  "3": "叁",
  "4": "肆",
  "5": "伍",
  "6": "陆",
  "7": "柒",
  "8": "捌",
  "9": "玖",
};
const unit_map = {
  "1": "十",
  "2": "百",
  "3": "千",
  "4": "万",
  "8": "亿",
};
const unit_map_fan = {
  "1": "拾",
  "2": "佰",
  "3": "仟",
  "4": "萬",
  "8": "億",
};

type TNumKey = keyof typeof num_map;
type TUnitKey = keyof typeof unit_map;
type TMode = "简" | "繁";
class Number2Han {
  private modeMap = {
    简: {
      num_map,
      unit_map,
    },
    繁: {
      num_map: num_map_fan,
      unit_map: unit_map_fan,
    },
  };

  convert(num: number | string, mode?: TMode) {
    let m = mode || "简";
    const { num_map, unit_map } = this.modeMap[m];
    const isString = typeof num === "string";
    const isObject = typeof num === "object";
    if (num === undefined || num === null || isNaN(num as number) || isObject) {
      return "";
    }
    if (isString && !num) {
      return "";
    }
    let numStr = isString ? num : String(num),
      decimalStr = "";
    if (numStr.includes(".")) {
      [numStr, decimalStr] = numStr.split(".");
    }
    let prefix = "";
    if (numStr.includes("-")) {
      prefix = "负";
      numStr = numStr.replace("-", "");
    }
    const len = numStr.length;
    const decimal = () => {
      if (decimalStr) {
        const val = Array.from(decimalStr).reduce(
          (a, c) => `${a}${num_map[c as TNumKey]}`,
          ""
        );
        return `点${val}`;
      }
      return "";
    };
    if (len < 2) {
      return `${prefix}${num_map[numStr as TNumKey]}${decimal()}`;
    }
    if (len === 2) {
      const val =
        numStr[0] === "1"
          ? unit_map["1"]
          : `${num_map[numStr[0] as TNumKey]}${unit_map["1"]}`;
      return `${prefix}${val}${num_map[numStr[1] as TNumKey]}${decimal()}`;
    }
    const val = Array.from(numStr)
      .reverse()
      .reduce((a, c, i) => {
        const idx = Number(i);
        const value = num_map[c as TNumKey];
        let unitIdx = idx % 4 === 0 && idx > 0 ? 4 : idx % 4;
        if (idx > 7) {
          unitIdx = idx === 8 ? idx : idx % 8;
        }
        const unit = unit_map[unitIdx.toString() as TUnitKey];
        return `${value}${unit || ""}${a}`;
      }, decimal());
    return `${prefix}${val}`;
  }
}
const num2Han = new Number2Han();
export default num2Han;
export {};
