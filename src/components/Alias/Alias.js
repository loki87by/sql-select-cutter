import React, { useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import { stringUpdater, query } from "../../utils/consts";
import copy from "../../assets/copy.svg";
import "./Alias.css";

function Alias(props) {
  const [isDataInputed, setDataInputed] = useState(false);

  const sqlQuery = `${query} ${props.data.table};`;

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
    const arr = props.aliases.slice()
    arr.push({
      data: stringUpdater(val),
      alias: props.data.alias
    })
    setDataInputed(true)
    props.setAliases(arr)
  }

  return (
    !isDataInputed ?
    <section>
    <p>Скопируйте следующий код:</p>
      <code>{sqlQuery}</code>
      <article>
                  <img
                    src={copy}
                    alt="копировать"
                    onClick={copyCode}
                  />
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
            value={''}
            onChange={(e) => setData(e.target.value)}
          />
        </article>
    </section>
    :
    <p>Данные приняты</p>
  );
}

export default Alias;
