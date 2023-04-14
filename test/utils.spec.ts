import num2Han from "../src/num2Han";

describe("utils", () => {
    test("参数错误", () => {
        expect(num2Han.convert(NaN)).toBe("");
        expect(num2Han.convert(null as unknown as number)).toBe("");
        expect(num2Han.convert(undefined as unknown as number)).toBe("");
        expect(num2Han.convert({} as unknown as number)).toBe("");
        expect(num2Han.convert("dasd" as unknown as number)).toBe("");
        expect(num2Han.convert("" as unknown as number)).toBe("");
        expect(num2Han.convert([] as unknown as number)).toBe("");
        expect(num2Han.convert((() => {}) as unknown as number)).toBe("");
    });
    test("小数位数", () => {
        expect(num2Han.convert(0.5)).toBe("零点五");
        expect(num2Han.convert(-0.5)).toBe("负零点五");
        expect(num2Han.convert(1.23)).toBe("一点二三");
        expect(num2Han.convert(19.9876)).toBe("十九点九八七六");
        expect(num2Han.convert(-19.9876)).toBe("负十九点九八七六");
    });
    test("个位数", () => {
        expect(num2Han.convert(0)).toBe("零");
        expect(num2Han.convert(1)).toBe("一");
        expect(num2Han.convert(9)).toBe("九");
    });
    test("十位数", () => {
        expect(num2Han.convert(12)).toBe("十二");
        expect(num2Han.convert(22)).toBe("二十二");
        expect(num2Han.convert(92)).toBe("九十二");
    });
    test("百位数", () => {
        expect(num2Han.convert(123)).toBe("一百二十三");
        expect(num2Han.convert(999)).toBe("九百九十九");
    });
    test("千位数", () => {
        expect(num2Han.convert(1234)).toBe("一千二百三十四");
        expect(num2Han.convert(9999)).toBe("九千九百九十九");
    });
    test("万位数", () => {
        expect(num2Han.convert(51234)).toBe("五万一千二百三十四");
        expect(num2Han.convert(99999)).toBe("九万九千九百九十九");
    });
    test("十万位数", () => {
        expect(num2Han.convert(651234)).toBe("六十五万一千二百三十四");
        expect(num2Han.convert(999999)).toBe("九十九万九千九百九十九");
    });
    test("百万位数", () => {
        expect(num2Han.convert(7651234)).toBe("七百六十五万一千二百三十四");
        expect(num2Han.convert(9999999)).toBe("九百九十九万九千九百九十九");
    });
    test("千万位数", () => {
        expect(num2Han.convert(87651234)).toBe(
            "八千七百六十五万一千二百三十四"
        );
        expect(num2Han.convert(99999999)).toBe(
            "九千九百九十九万九千九百九十九"
        );
    });
    test("亿位数", () => {
        expect(num2Han.convert(187651234)).toBe(
            "一亿八千七百六十五万一千二百三十四"
        );
        expect(num2Han.convert(199999999)).toBe(
            "一亿九千九百九十九万九千九百九十九"
        );
    });
    test("十亿位数", () => {
        expect(num2Han.convert(2187651234)).toBe(
            "二十一亿八千七百六十五万一千二百三十四"
        );
        expect(num2Han.convert(2199999999)).toBe(
            "二十一亿九千九百九十九万九千九百九十九"
        );
    });
    test("百亿位数", () => {
        expect(num2Han.convert(12187651234)).toBe(
            "一百二十一亿八千七百六十五万一千二百三十四"
        );
        expect(num2Han.convert(92199999999)).toBe(
            "九百二十一亿九千九百九十九万九千九百九十九"
        );
        expect(num2Han.convert("92199999999.12345556")).toBe(
            "九百二十一亿九千九百九十九万九千九百九十九点一二三四五五五六"
        );
    });
    test("千亿位数", () => {
        expect(num2Han.convert("992199999999.12345556")).toBe(
            "九千九百二十一亿九千九百九十九万九千九百九十九点一二三四五五五六"
        );
    });
    test("设置新的配置", () => {
        num2Han.setMode("繁");
        expect(num2Han.convert(1.23)).toBe("壹点贰叁");
        expect(num2Han.convert(187651234)).toBe(
            "壹億捌仟柒佰陆拾伍萬壹仟贰佰叁拾肆"
        );
    });
});
