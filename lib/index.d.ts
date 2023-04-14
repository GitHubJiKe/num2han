type TMode = "简" | "繁";
declare class Number2Han {
    private mode;
    private get num_map();
    private get unit_map();
    setMode(mode: TMode): void;
    convert(num: number | string): string;
}
declare const num2Han: Number2Han;
export default num2Han;
export {};
