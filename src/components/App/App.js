import React, { useEffect, useState } from "react";
import Alias from "../Alias/Alias";
import Table from "../Table/Table";
import {
  stringUpdater,
  arrayUpdater,
  selectCutter,
  arrayLengthStabilizate,
} from "../../utils/consts";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [isScriptRunned, setScriptRunned] = useState(false);
  const [isDataInputed, setDataInputed] = useState(false);
  const [namesArray, setNamesArray] = useState([]);
  const [result, setResult] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [dataSelectValue, setDataSelectValue] = useState("");
  const [namesDataSelectValue, setNamesDataSelectValue] = useState("");
  const [namesInputed, setNamesInputed] = useState(false);
  const [fullTables, setFullTables] = useState([]);
  const [aliases, setAliases] = useState([]);

  function checkFullTables(str) {
    const alls = str.match(/\S+\.\*/gi);
    const tables = str.toUpperCase().replace(/(\S+\s)*FROM/, "");
    const array = alls.map((element) => {
      const cur = element.replace(/\.\*$/, "");
      const arr = tables.split(" ");
      const index = arr.findIndex((el) => el === cur);

      return { table: arr[index - 1], alias: cur };
    });
    setFullTables(array);
  }

  function setInputData(e) {
    const arg = e.target.value;
    setNamesDataSelectValue(arg);
    checkFullTables(arg);
    setNamesInputed(true);
  }

  useEffect(() => {

    if (fullTables.length === aliases.length) {
      const finString = namesDataSelectValue.replace(/\S+\.\*/gi, (match) => {
        const cur = match.replace(/\.\*$/, "");
        const coluumns = aliases.find((i) => i.alias === cur).data;
        const data = coluumns.map((i) => `${cur}.${i}`);

        return data;
      });
      let tmp = selectCutter(finString);
      let newData = [...tmp];
      setNamesArray(newData);
    }
  }, [
    fullTables.length,
    aliases.length,
    namesDataSelectValue,
    fullTables,
    aliases,
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
    const array = [];
    arr.forEach((i, ind) => {

      if (
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
    console.log(namesArray, data)

    for (let k = 0; k < namesArray.length; k++) {
      let tmpArr = [];

      for (let i = 0; i < data.length; i++) {
        tmpArr.push(data[i][k]);
      }

      if (
        !tmpArr.every((el) => el === null || el === undefined || el === "null")
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
          <input
            type="text"
            id="data_input"
            name="data_input"
            placeholder="Вставьте данные"
            value={dataSelectValue}
            onChange={(e) => setData(e.target.value)}
          />
        </article>
      ) : (
        <>
          <p>Данные приняты</p>
          {!namesInputed ? (
            <article>
              <label htmlFor={`names_input`}>Вставьте SQL-запрос</label>
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
          {fullTables.length > 0
            ? fullTables.map((item, index) => (
                <Alias
                  key={`alias-${index}`}
                  data={item}
                  index={index}
                  aliases={aliases}
                  setAliases={setAliases}
                />
              ))
            : ""}
          <button
            className="main_button"
            disabled={fullTables.length !== aliases.length}
            onClick={script}
          >
            Run
          </button>
        </>
      )}
    </section>
  ) : (
    <Table data={result} />
  );
}

export default App;
