type TMode = "简" | "繁";
declare class Number2Han {
  private modeMap;
  convert(num: number | string, mode?: TMode): string;
}
declare const num2Han: Number2Han;
export default num2Han;
export {};
