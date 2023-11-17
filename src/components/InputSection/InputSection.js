import React, { useState } from "react";
import "./InputSection.css";

function InputSection(props) {
  const [dataSelectValue, setDataSelectValue] = useState("");
  const [selectValue, setSelectValue] = useState(0);
  const baseData = props.namesSelectValue;

  function updateParentData() {
    const oldData = baseData.slice();
    const tmp = dataSelectValue.split(`\n`);
    if (tmp[tmp.length - 1].length === 1 && tmp[0].length > 1) {
      tmp.pop();
    }
    let newData = [];
    if (selectValue > 0) {
      newData = [...tmp, ...oldData];
    } else {
      newData = [...oldData, ...tmp];
    }
    setNamesSelectValue(newData);
  }

  function setInputData(e) {
    setDataSelectValue(e.target.value);
    updateParentData();
  }

  function setSelectData(e) {
    setSelectValue(e.target.value);
    updateParentData();
  }

  function addSection() {
    const nextIndex = props.index + 1;
    props.setTablesArray([...props.tablesArray, nextIndex]);
  }

  return (
    <section>
      <label htmlFor={`names_${props.index}_input`}>
        Вставьте имена столбцов
      </label>
      <input
        type="text"
        id={`names_${props.index}_input`}
        name={`names_${props.index}_input`}
        placeholder="Вставьте имена столбцов"
        value={dataSelectValue}
        onChange={setInputData}
      />
      {props.index > 1 ? (
        <select defaultValue={0} onChange={setSelectData}>
          <option value={0}>добавить справа</option>
          <option value={1}>добавить слева</option>
        </select>
      ) : (
        ""
      )}
      <button type="button" onClick={addSection}>
        добавить столбцы
      </button>
    </section>
  );
}

export default InputSection;
