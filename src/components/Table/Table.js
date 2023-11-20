import React from "react";
import { useClipboard } from "use-clipboard-copy";
import copy from "../../assets/copy.svg";
import "./Table.css";

function Table(props) {
  const clipboard = useClipboard({
    onError() {
      alert("Произошла непредвиденная ошибка");
    },
    copiedTimeout: 3000,
  });

  function copyColumn(index) {
    let string = "";
    props.data.forEach((el, ind) => {
      if (ind === 0) {
        string = `${el[index]}: `;
      } else if (ind === props.data.length - 1) {
        string += `${el[index]}.`;
      } else {
        string += `${el[index]}, `;
      }
      clipboard.copy(string);
    });
  }

  /* const copyToClipboard = useCallback(() => {

  }, [clipboard, orderId]); */

  return (
    <table>
      <tbody>
        {props.data.map((row, ind) => (
          <tr key={`row-${ind}`}>
            {row.map((cell, index) => (
              <td
                title={ind === 1 ? "копировать данные столбца в буфер" : ""}
                key={`cell-${index}`}
              >
                {cell}
                {ind === 0 ? (
                  <img
                    src={copy}
                    alt="копировать"
                    onClick={() => {
                      copyColumn(index);
                    }}
                  />
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
