import img1 from "../../src/assets/img1-min.png";
import img2 from "../../src/assets/img2-min.png";
import img3 from "../../src/assets/img3-min.png";

export const queryStart = `SELECT column_name, table_name
FROM USER_TAB_COLUMNS
WHERE table_name `
export const queryBodyPreStart = `\n) ORDER BY CASE\n`
export const queryBodyStart = `WHEN table_name = `
export const queryBodyEnd = ` THEN `
export const queryEnd = ` END, column_id;`

export const hints = [
  [
    {
      tag: "h3",
      content: "Выполните запрос в своей IDE и кликните на результат",
      params: { className: "Hint_text" },
    },
    {
      tag: "img",
      content: null,
      params: { src: img1, alt: "img", className: "Hint_img Hint_img_first" },
    },
    {
      tag: "h3",
      content: "Нажмите CTRL+A, затем CTRL+C",
      params: { className: "Hint_text" },
    },
  ],
  [
    {
      tag: "h3",
      content: "Выполните запрос в своей IDE и кликните на результат",
      params: { className: "Hint_text" },
    },
    {
      tag: "img",
      content: null,
      params: { src: img2, alt: "img", className: "Hint_img Hint_img_first" },
    },
    {
      tag: "h3",
      content: "Нажмите CTRL+A, затем CTRL+C",
      params: { className: "Hint_text" },
    },
  ],
  [
    {
      tag: "h3",
      content: "Выполните запрос в своей IDE и кликните на результат",
      params: { className: "Hint_text" },
    },
    {
      tag: "img",
      content: null,
      params: { src: img3, alt: "img", className: "Hint_img Hint_img_second" },
    },
    {
      tag: "h3",
      content: "Нажмите CTRL+A, затем CTRL+C",
      params: { className: "Hint_text" },
    },
  ],
];

export const baseUrl = "https://loki87by.github.io/sql-select-cutter/";
