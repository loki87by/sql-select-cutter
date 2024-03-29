import React, { useEffect, useState } from "react";
import Alias from "../Alias/Alias";
import Table from "../Table/Table";
import Hint from "../Hint/Hint";
import { getData } from "../../utils/firebase";
import {
  stringUpdater,
  arrayUpdater,
  selectCutter,
  arrayLengthStabilizate,
  insertsChecker,
  findNReplaceLastElement,
} from "../../utils/helpers";
import question from "../../assets/question.svg";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [showedHindIndex, setShowedHindIndex] = useState(0);
  const [dataSelectValue, setDataSelectValue] = useState("");
  const [namesDataSelectValue, setNamesDataSelectValue] = useState("");
  const [fromTopHint, setFromTopHint] = useState(false);
  const [isScriptRunned, setScriptRunned] = useState(false);
  const [isDataInputed, setDataInputed] = useState(false);
  const [namesInputed, setNamesInputed] = useState(false);
  const [dataLengthChecked, setDataLengthChecked] = useState(false);
  const [namesArray, setNamesArray] = useState([]);
  const [result, setResult] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [fullTables, setFullTables] = useState([]);
  const [aliases, setAliases] = useState([]);

  function checkFullTables(str) {
    const alls = str.match(/\S+\.\*/gi);
    const tables = str
      .toUpperCase()
      .replace(/(\S+\s)*FROM/, "")
      .trim();
    if (/\s?\(?\*\)?[,\s]/gi.test(str)) {
      const cleaned = tables
        .replace(/where[\s*\S*]*/gi, "")
        .split(/[\n\t]|\s{2,}/);
      const cleaned2 = cleaned.join(" ").match(/^\S*\s\S*/gi);
      const cleaned3 = cleaned.map((i) =>
        i.replace(/([\s*\S*]*join )|(, )|( on [\s*\S*]*)/gi, "").trim()
      );
      const arr = [...cleaned2, ...cleaned3]
        .filter((i) => i !== "")
        .map((el) => {
          const cur = el.split(" ")[1];
          const tab = el.split(" ")[0];
          return { table: tab, alias: cur };
        });
      const uniqueObjects = arr.filter(
        (obj, index, self) =>
          index ===
          self.findIndex((t) => t.table === obj.table && t.alias === obj.alias)
      );
      setFullTables(
        uniqueObjects.filter((el) => el.table.toLowerCase() !== "on")
      );
    }

    if (alls) {
      const array = alls.map((element) => {
        const cur = element.toUpperCase().replace(/\.\*$/, "");
        const arr = tables.split(/\s/);
        const index = arr.findIndex((el) => el.toUpperCase() === cur);

        return { table: arr[index - 1], alias: cur };
      });
      setFullTables(array);
    }
  }

  function setInputData(e) {
    let arg = e.target.value;
    const start = arg
      .toLowerCase()
      .replace(/from\s.*/gi, "")
      .split(",")
      .map((el) => {
        if (el.trim().split(/\s/).length === 1) {
          return el;
        } else {
          return el.trim().split(/\s/).slice(1).join(" ");
        }
      })
      .join(", ");
    const end = arg.replace(/.*\sfrom/gi, "");
    arg = `${start} from ${end}`;
    setNamesDataSelectValue(arg);
    checkFullTables(arg);
    setNamesInputed(true);
  }

  function setDataFromLink(head, body) {
    setResult([head, ...body]);
    setDataInputed(true);
    setNamesInputed(true);
    setScriptRunned(true);
    window.location.hash = "";
  }

  useEffect(() => {
    if (window.location.hash !== "") {
      const link = window.location.hash.replace(/.*data=/gi, "");
      getData().then((res) => {
        const data = res.find((i) => i.id === link);

        if (data) {
          setDataFromLink(
            data.data.head,
            data.data.body.map((i) => JSON.parse(i))
          );
        } else {
          alert("Данная ссылка устарела и была удалена");
        }
      });
    }
  });

  useEffect(() => {
    if (fullTables.length === aliases.length) {
      const finString = namesDataSelectValue.replace(/\S+\.\*/gi, (match) => {
        const cur = match.replace(/\.\*$/, "").toUpperCase();
        const coluumns = aliases.find((i) => i.alias === cur).data;
        const data = coluumns.map((i) => `${cur}.${i}`);

        return data;
      });
      let tmp = selectCutter(finString).filter((i) => /[^.]$/.test(i));

      if (namesDataSelectValue === finString && tmp[0] === "*") {
        let tables = "";
        aliases.forEach((i, index) => {
          i.data.forEach((t, ind) => {
            if (ind === aliases.length - 1 && index === i.length - 1) {
              tables += `${i.alias}.${t}`;
            } else {
              tables += `${i.alias}.${t}, `;
            }
          });
        });
        const finString = namesDataSelectValue.replace("*", tables);
        tmp = selectCutter(finString).filter((i) => /[^.]$/.test(i));
      }
      let newData;
      newData = [...tmp];

      if (dataArray.length % newData.length !== 0) {
        const up = Math.ceil(dataArray.length / newData.length);
        const down = Math.floor(dataArray.length / newData.length);

        if (
          !dataLengthChecked &&
          dataArray.length + down >= newData.length * up
        ) {
          const curIndex = newData.length;
          let newDataArray = JSON.parse(JSON.stringify(dataArray));

          for (let i = curIndex * down - 1; i > 0; i -= curIndex) {
            if (
              /\s/.test(dataArray[i]) &&
              (isNaN(+dataArray[i]) ||
                dataArray[i].toLowerCase().trim() === "null")
            ) {
              const cur = dataArray[i].split(/\s/);
              const check = findNReplaceLastElement(cur, dataArray[0]);
              const ind = cur.findIndex((i) => i === check);
              let newEl =
                ind < 0
                  ? [dataArray[i].replace(check, "").trim(), check.trim()]
                  : ind === 0
                  ? [check, dataArray[i].replace(cur[ind], "")]
                  : [dataArray[i].replace(cur[ind], "").trim(), check.trim()];
              newDataArray = [
                ...newDataArray.slice(0, i),
                ...newEl,
                ...newDataArray.slice(i + 1),
              ];
            }
          }
          setDataLengthChecked(true);
          setDataArray(newDataArray);
        }
      }
      setNamesArray(newData);
    }
  }, [
    fullTables.length,
    aliases.length,
    namesDataSelectValue,
    fullTables,
    aliases,
    dataArray,
    dataLengthChecked,
  ]);

  function setData(val) {
    if (!isDataInputed) {
      const currentVal = stringUpdater(val);
      setDataSelectValue(val);
      setDataInputed(true);
      setDataArray(currentVal);
    }
  }

  function dataUpdater(arr) {
    const first = arr[0];
    let array = [];
    const hasNestedArray = arr.some((item) => Array.isArray(item));

    arr.forEach((i, ind) => {
      if (
        hasNestedArray &&
        ind % (namesArray.length - 1) === 0 &&
        ind !== 0 &&
        ind !== arr.length - 1
      ) {
        const curr = i.slice(0, 0 - first.length - 1);
        const next = i.slice(0 - first.length);
        array.push(curr);
        array.push(next);
      } else {
        array.push(i);
      }
    });

    return array;
  }

  function script() {
    let data = dataUpdater(dataArray);
    data = arrayLengthStabilizate(namesArray.length, data);
    const tmp = [];

    for (let k = 0; k < namesArray.length; k++) {
      let tmpArr = [];

      for (let i = 0; i < data.length; i++) {
        tmpArr.push(data[i][k]);
      }

      if (
        !tmpArr.every(
          (el) => el === null || el === undefined || el.toLowerCase() === "null"
        )
      ) {
        tmp.push(k);
      }
      setScriptRunned(false);
    }
    const arr2upd = arrayUpdater(namesArray, tmp);
    const arr1upd = data.map((i) => arrayUpdater(i, tmp));
    const res = [arr2upd, ...arr1upd];
    setResult(res.filter((i) => !i.every((k) => k === null)));

    setScriptRunned(true);
  }

  return !isScriptRunned ? (
    <section>
      {!isDataInputed ? (
        <article>
          <label htmlFor="data_input">
            Вставьте данные (результат запроса)
          </label>
          <img
            className="hint"
            src={question}
            alt="закрыть"
            title="закрыть"
            onMouseOver={(e) => {
              setFromTopHint(e.clientY);
              setShowedHindIndex(1);
            }}
            onMouseOut={() => {
              setShowedHindIndex(0);
            }}
          />
          <input
            type="text"
            id="data_input"
            name="data_input"
            placeholder="Вставьте данные"
            value={dataSelectValue}
            onChange={(e) => {
              if (insertsChecker(e.target.value.split(/\n/))) {
                setData(e.target.value);
              }
            }}
          />
        </article>
      ) : (
        <>
          <p>Данные приняты</p>
          {!namesInputed ? (
            <article>
              <label htmlFor={`names_input`}>Вставьте SQL-запрос</label>
              <img
                className="hint"
                src={question}
                alt="закрыть"
                title="закрыть"
                onMouseOver={(e) => {
                  setFromTopHint(e.clientY);
                  setShowedHindIndex(2);
                }}
                onMouseOut={() => {
                  setShowedHindIndex(0);
                }}
              />
              <input
                type="text"
                id={`names_input`}
                name={`names_input`}
                placeholder="Вставьте имена столбцов"
                value={namesDataSelectValue}
                onChange={setInputData}
              />
            </article>
          ) : (
            <p>Данные приняты</p>
          )}
          {fullTables.length > 0 ? (
            <Alias
              data={fullTables}
              aliases={aliases}
              setAliases={setAliases}
              setShowedHindIndex={setShowedHindIndex}
              setFromTop={setFromTopHint}
            />
          ) : (
            ""
          )}
          <button
            className="main_button"
            disabled={fullTables.length !== aliases.length}
            onClick={script}
          >
            Run
          </button>
        </>
      )}
      <Hint
        index={showedHindIndex}
        popupIsOpen={showedHindIndex > 0}
        fromTop={fromTopHint + 50}
      />
    </section>
  ) : (
    <Table data={result} />
  );
}

export default App;
