import React, { useState } from "react";
import InputSection from "../InputSection/InputSection";
import Table from "../Table/Table";
import { stringUpdater, arrayUpdater } from "../../utils/consts";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [isScriptRunned, setScriptRunned] = useState(false);
  const [isDataInputed, setDataInputed] = useState(false);
  const [namesArray, setNamesArray] = useState([]);
  const [result, setResult] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [tablesArray, setTablesArray] = useState([1]);
  const [dataSelectValue, setDataSelectValue] = useState([]);
  const [namesSelectValue, setNamesSelectValue] = useState([]);

  function arrayLengthStabilizate(q, arr) {
    const columnsQ = q;
    let array = [];
    if (arr.length === columnsQ) {
      array.push(arr);
    } else {
      for (let i = 1; i <= arr.length / columnsQ; i++) {
        const tmp = [];
        arr.forEach((item, ind) => {
          if (ind < columnsQ * i && ind >= columnsQ * (i - 1)) {
            tmp.push(item);
          }
        });
        array.push(tmp);
      }
    }

    return array;
  }

  function setData(val) {
    if (!isDataInputed) {
      const currentVal = stringUpdater(val);
      setDataSelectValue(currentVal);
      setDataInputed(true);
      setDataArray(currentVal);
    }
  }

  function setNames(val) {
    if (namesSelectValue.length > 0) {
      setNamesSelectValue(val);
    }

    setNamesArray(val);
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
          {tablesArray.map((i) => (
            <InputSection
              key={`input_section-${Math.pow(i, i)}`}
              index={i}
              tablesArray={tablesArray}
              namesSelectValue={namesSelectValue}
              setTablesArray={setTablesArray}
              setNamesSelectValue={setNames}
            />
          ))}
          <button
            className="main_button"
            disabled={namesArray.length === 0}
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
