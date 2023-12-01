import React, { useState } from "react";
import Alias from "../Alias/Alias";
import Table from "../Table/Table";
import {
  stringUpdater,
  arrayUpdater,
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
  //const [tablesArray, setTablesArray] = useState([1]);
  const [dataSelectValue, setDataSelectValue] = useState("");
  const [namesDataSelectValue, setNamesDataSelectValue] = useState("");
  const [namesInputed, setNamesInputed] = useState(false);
  const [fullTables, setFullTables] = useState([]);
  //const [aliases, setAliases] = useState([]);
  const [fullTablesIsEmpty, setFullTablesIsEmpty] = useState(true);

  function checkFullTables(str) {
    const alls = str.match(/\S+\.\*/gi);
    //setAliases(alls)
    setFullTablesIsEmpty(false);
    const tables = str.toUpperCase().replace(/(\S+\s)*FROM/, "");
    const array = alls.map((element) => {
      const cur = element.replace(/\.\*$/, "");
      const arr = tables.split(" ");
      const index = arr.findIndex((el) => el === cur);
      return arr[index - 1];
    });
    setFullTables(array);
    console.log(array);
  }

  const selectCutter = (data) => {
    const select = data
      .toLowerCase()
      .replace(/select\s*/, "")
      .replace(/\s*from\s[\s\S]*/, "");
    const string = select.replace(/( +)|(\n)/g, (match, p1, p2) => {
      if (p1) {
        return " ";
      } else if (p2) {
        return "\n";
      } else {
        return match;
      }
    });
    const array = string.split(/,\s/g);
    const res = array.map((i) => {
      return i.replace(/^\S*\s/, "");
    });
    return res;
  };

  function setInputData(e) {
    const arg = e.target.value;
    setNamesDataSelectValue(arg);
    checkFullTables(arg);
    let tmp = selectCutter(arg);
    let newData = [...tmp];
    setNamesArray(newData);
    setNamesInputed(true);
  }

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
          <label htmlFor="data_input">Вставьте данные </label>
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
          {!fullTablesIsEmpty
            ? fullTables.map((item, index) => (
                <Alias key={`alias-${index}`} data={item} />
              ))
            : ""}
          <button
            className="main_button"
            disabled={fullTablesIsEmpty === true && namesArray.length === 0}
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
