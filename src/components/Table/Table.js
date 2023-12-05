import React, { useState, useEffect } from "react";
import { useClipboard } from "use-clipboard-copy";
import Popup from "../Popup/Popup";
import copy from "../../assets/copy.svg";
import eye from "../../assets/eye.svg";
import "./Table.css";

function Table(props) {
  const [currentXml, setCurrentXml] = useState("");
  const [popupIsOpen, setPopupOpened] = useState(false);
  const [xmls, setXmls] = useState([]);

  const clipboard = useClipboard({
    onError() {
      alert("Произошла непредвиденная ошибка");
    },
    copiedTimeout: 3000,
  });

  function openPopup(index) {
    setCurrentXml(xmls[index]);
    setPopupOpened(true);
  }

  function closePopup() {
    setCurrentXml("");
    setPopupOpened(false);
  }

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

  useEffect(() => {
    if (props.data !== undefined) {
      const arr = props.data.map((row, ind) =>
        row
          .map((cell) => {
            if (cell[0] === "<" && cell[cell.length - 1] === ">") {
              return cell;
            } else {
              return null;
            }
          })
          .find((i) => i !== null)
      );
      setXmls(arr);
    }
  }, [props.data]);

  return (
    <>
      <table>
        <tbody>
          {props.data.map((row, ind) => (
            <tr key={`row-${ind}`}>
              {row.map((cell, index) => {
                return (
                  <td
                    title={ind === 1 ? "копировать данные столбца в буфер" : ""}
                    key={`cell-${index}`}
                  >
                    {cell[0] === "<" && cell[cell.length - 1] === ">"
                      ? "XML"
                      : cell}
                    {ind === 0 ? (
                      <img
                        src={copy}
                        alt="копировать"
                        title="копировать"
                        onClick={() => {
                          copyColumn(index);
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {cell[0] === "<" && cell[cell.length - 1] === ">" ? (
                      <img
                        src={eye}
                        alt="показать"
                        title="показать"
                        onClick={() => {
                          openPopup(ind);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Popup
        popupIsOpen={popupIsOpen}
        code={currentXml}
        closePopup={closePopup}
      />
    </>
  );
}

export default Table;
