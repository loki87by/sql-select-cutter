import React, { useState, useEffect } from "react";
import InputSection from "../InputSection/InputSection";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [isScriptRunned, setScriptRunned] = useState(false);
  const [namesArray, setNamesArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [temporaryArray, setTemporaryArray] = useState([]);
  const [tablesArray, setTablesArray] = useState([1]);
  const [notNullIndexes, setNotNullIndexes] = [];
  const [namesSelectValue, setNamesSelectValue] = useState("");
  const [dataSelectValue, setDataSelectValue] = useState("");
  const [fullLength, setFullLength] = useState(NaN);

  useEffect(() => {
    if (dataSelectValue !== "") {
      const tmp = input1.split(`\n`);
      if (tmp[tmp.length - 1].length === 1 && tmp[0].length > 1) {
        tmp.pop();
      }
      setTemporaryArray(tmp);
      const tmpDataArr = [];
      temporaryArray.forEach((i) => {
        const arr = i.split(",");
        arr.pop();
        tmpDataArr.push(arr);
      });
      setDataArray(tmpDataArr);
      setFullLength(tmpDataArr.flat().length);
    }
  }, [dataSelectValue]);

  useEffect(() => {
    if (namesSelectValue !== "") {
      const tmp = input2.split(`\n`);
      if (tmp[tmp.length - 1].length === 1 && tmp[0].length > 1) {
        tmp.pop();
      }
      setNamesArray(tmp);
      console.log(namesArray);
    }
  }, [namesSelectValue]);

  function arrayUpdater(array) {
    const arrayUpdate = array.map((i, ind) => {
      if (notNullIndexes.includes(ind)) {
        return i;
      }
    });
    console.log(arrayUpdate);
    return arrayUpdate;
  }

  function script() {
    const stringLength = fullLength / temporaryArray.length;
    for (let i = 0; i < stringLength; i++) {
      let tmpArr = [];
      for (k = 0; k < temporaryArray.length; k++) {
        tmpArr.push(dataArray[k][i]);
      }
      console.log(tmpArr, tmpArr, i);
      if (tmpArr[i].every !== "") {
        const tmp = notNullIndexes;
        tmp.push(i);
        setNotNullIndexes(tmp);
      }
      setScriptRunned(false)
    }
    const arr2upd = arrayUpdater(arr2);
    console.log(arr2);
    const arr1upd = dataArray.map((i) => arrayUpdater(i));
    console.log(dataArray);
    const res = [arr2upd, ...arr1upd];
    console.log(res);
  }

  return !isScriptRunned ? (
    <>
      <section>
        <label htmlFor="data_input">Вставьте данные</label>
        <input
          type="text"
          id="data_input"
          name="data_input"
          placeholder="Вставьте данные"
          value={dataSelectValue}
          onChange={(e) => setDataSelectValue(e.target.value)}
        />
      </section>
      {tablesArray.map((i) => (
        <InputSection
          key={`input_section-${Math.pow(i, i)}`}
          tablesArray={tablesArray}
          setTablesArray={setTablesArray}
          namesSelectValue={namesSelectValue}
          setNamesSelectValue={setNamesSelectValue}
          index={i}
        />
      ))}
      <button onClick={script}>Run</button>
    </>
  ) : (
    <></>
  );
}

export default App;
