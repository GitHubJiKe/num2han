import num2Han from "num2han";

const children = document.querySelector("ul")?.children;
// @ts-ignore
Array.from(children).forEach((item) => {
  item.setAttribute("data-num", item.innerHTML);
  item.innerHTML += "<br/> -> " + num2Han.convert(item.innerHTML);
});
num2Han.setMode("繁");
// @ts-ignore
Array.from(children).forEach((item) => {
  item.innerHTML +=
    "<br/> -> " + num2Han.convert(item.getAttribute("data-num") as string);
});
