import React, { /* useEffect, */ useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import Highlight from "react-highlight";
import { insertsChecker, aliasesQuery } from "../../utils/helpers";
import copy from "../../assets/copy.svg";
import question from "../../assets/question.svg";
import "./Alias.css";

function Alias(props) {
  const [isDataInputed, setDataInputed] = useState(false);

  const sqlQuery = aliasesQuery(props.data)

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
    const array = val.split(',')
    let tmp = []
    for (let i = 0; i <= Math.ceil(array.length/2); i++) {

      if(array[i*2] && array[i*2 + 1]){
      tmp.push({
        columnName: array[i*2].trim(), table: array[i*2 + 1].trim()
      })}
    }
    const groupedByTable = tmp.reduce((acc, column) => {
      const {columnName, table} = column;

      if (!acc[table]) {
        acc[table] = { table, data: [] };
      }
      acc[table].data.push(columnName);
      return acc;
    }, {});
    const result = Object.values(groupedByTable);
    result.forEach((obj) => {
      arr.push({
        data: obj.data,
        alias: props.data.find(i => i.table.toLowerCase() === obj.table.toLowerCase()).alias
      });
    })
    console.log(arr)
    setDataInputed(true);
    props.setAliases(arr);
  }

/*   useEffect(() => {
window.document.querySelectorAll('.hljs').forEach(element => {
  let text = element.textContent;
  let newText = text.replace(/,/g, '<span class="comma">,</span>').replace(/\(/g, '<span class="bracket">(</span>').replace(/\)/g, '<span class="bracket">)</span>');
  element.innerHTML = newText;
})
  },[]) */

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
        <img
          className="hint"
          src={question}
          alt="закрыть"
          title="закрыть"
          onMouseOver={(e) => {
            props.setFromTop(e.clientY);
            props.setShowedHindIndex(3);
          }}
          onMouseOut={() => {
            props.setShowedHindIndex(0);
          }}
        />
        <input
          type="text"
          id={`alias_${props.index}_input`}
          name={`alias_${props.index}_input`}
          placeholder="Вставьте данные"
          value={""}
          onChange={(e) => {
            if (insertsChecker(e.target.value.split(/\n/))) {
              setData(e.target.value);
            }
          }}
        />
      </article>
    </section>
  ) : (
    <p>Данные приняты</p>
  );
}

export default Alias;
