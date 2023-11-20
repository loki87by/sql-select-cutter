import React, { useState } from "react";
import InputSection from "../InputSection/InputSection";
import Table from "../Table/Table";
import {
  stringUpdater,
  stringSplitter,
  arrayUpdater,
} from "../../utils/consts";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [isScriptRunned, setScriptRunned] = useState(false);
  const [isDataInputed, setDataInputed] = useState(false);
  const [namesArray, setNamesArray] = useState([]);
  const [result, setResult] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [tablesArray, setTablesArray] = useState([1]);
  const [fullLength, setFullLength] = useState(NaN);
  const [dataSelectValue, setDataSelectValue] = useState("");
  const [namesSelectValue, setNamesSelectValue] = useState("");

  function arrayLengthStabilizate(q) {
    const columnsQ = q;
    const array = dataArray.slice();
    array.forEach((arr, index) => {
      let diff;

      if (arr.length < columnsQ) {
        diff = columnsQ - arr.length;

        for (let i = 0; i < diff; i++) {
          array[index].push("");
        }
      }

      if (arr.length > columnsQ) {
        diff = arr.length - columnsQ;

        for (let i = 0; i < diff; i++) {
          array[index].pop();
        }
      }
    });
    setDataArray(array);
    const full = array.flat();
    setFullLength(full.length);
  }

  function setData(val) {
    if (!isDataInputed) {
      const currentVal = stringUpdater(val);
      setDataSelectValue(currentVal);
      const tmp = currentVal.split(/\r\n|\r|\n/g);

      if (tmp[tmp.length - 1].length === 1 && tmp[0].length > 1) {
        tmp.pop();
      }

      if (tmp[tmp.length - 1].length === 1 && tmp[0].length > 1) {
        tmp.pop();
      }
      const tmpDataArr = [];
      tmp.forEach((i) => {
        const arr = stringSplitter(i);
        tmpDataArr.push(arr);
      });
      setDataArray(tmpDataArr);
      setDataInputed(true);
    }
  }

  function setNames(val) {
    if (namesSelectValue === "") {
      setNamesSelectValue(val);
    }

    if (val[val.length - 1].length === 1 && val[0].length > 1) {
      val.pop();
    }
    setNamesArray(val);
    arrayLengthStabilizate(val.length);
  }

  function script() {
    const stringLength = fullLength / namesArray.length;
    const tmp = [];

    for (let k = 0; k < namesArray.length; k++) {
      let tmpArr = [];

      for (let i = 0; i < stringLength; i++) {
        tmpArr.push(dataArray[i][k]);
      }

      if (!tmpArr.every((el) => el === "")) {
        tmp.push(k);
      }
      setScriptRunned(false);
    }
    const arr2upd = arrayUpdater(namesArray, tmp);
    const arr1upd = dataArray.map((i) => arrayUpdater(i, tmp));
    const res = [arr2upd, ...arr1upd];
    setResult(res.filter((i) => !i.every((k) => k === "")));
    setScriptRunned(true);
  }

  return !isScriptRunned ? (
    <>
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
          <p>Данные приняты</p>
        )}
      </section>
      {tablesArray.map((i) => (
        <InputSection
          key={`input_section-${Math.pow(i, i)}`}
          tablesArray={tablesArray}
          setTablesArray={setTablesArray}
          namesSelectValue={namesSelectValue}
          setNamesSelectValue={setNames}
          index={i}
        />
      ))}
      <button className="main_button" onClick={script}>
        Run
      </button>
    </>
  ) : (
    <Table data={result} />
  );
}

export default App;
