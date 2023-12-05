import React, { useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import Highlight from "react-highlight";
import { queryStart, queryEnd } from "../../utils/consts";
import copy from "../../assets/copy.svg";
import "./Alias.css";

function Alias(props) {
  const [isDataInputed, setDataInputed] = useState(false);

  const sqlQuery = `${queryStart}${props.data.table}${queryEnd}`;

  const clipboard = useClipboard({
    onError() {
      alert("Произошла непредвиденная ошибка");
    },
    copiedTimeout: 3000,
  });

  function copyCode() {
    clipboard.copy(sqlQuery);
  }

  function setData(val) {
    const arr = props.aliases.slice();
    arr.push({
      data: val.split(/,|\s+/),
      alias: props.data.alias,
    });
    setDataInputed(true);
    props.setAliases(arr);
  }

  return !isDataInputed ? (
    <section
      style={{
        backgroundColor: "rgba(253, 241, 241, .42)",
        width: "max-content",
        padding: "1vmin",
        margin: "1vmax",
      }}
    >
      <p>Скопируйте следующий код:</p>
      <Highlight className="sql">{sqlQuery}</Highlight>
      <article onClick={copyCode} style={{ cursor: "pointer" }}>
        <img src={copy} alt="копировать" title="копировать" />
        <p>Скопировать код</p>
      </article>
      <p>Вставьте его в свою IDE и запустите</p>
      <article>
        <label htmlFor={`alias_${props.index}_input`}>
          Вставьте данные (результат запроса)
        </label>
        <input
          type="text"
          id={`alias_${props.index}_input`}
          name={`alias_${props.index}_input`}
          placeholder="Вставьте данные"
          value={""}
          onChange={(e) => setData(e.target.value)}
        />
      </article>
    </section>
  ) : (
    <p>Данные приняты</p>
  );
}

export default Alias;
