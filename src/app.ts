import num2Han from "num2han";

const h1 = document.createElement("h1");
const h2 = document.createElement("h1");
h1.innerHTML = num2Han.convert(123);
num2Han.setMode("繁");
h2.innerHTML = num2Han.convert(3123123);
document.body.append(h1, h2);
