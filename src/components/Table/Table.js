import React, { useState, useEffect, useRef } from "react";
import { useClipboard } from "use-clipboard-copy";
import Popup from "../Popup/Popup";
import { debounce } from "../../utils/helpers";
import copy from "../../assets/copy.svg";
import eye from "../../assets/eye.svg";
import close from "../../assets/close copy.svg";
import magnifier from "../../assets/magnifier.svg";
import "./Table.css";

function Table(props) {
  const [currentXml, setCurrentXml] = useState("");
  const [editingInputIndex, setEditingInputIndex] = useState(NaN);
  const [isEditing, setEditing] = useState(false);
  const [popupIsOpen, setPopupOpened] = useState(false);
  const [dataArray, setDataArray] = useState(
    props.data.filter((i, ind) => ind > 0)
  );
  const [filters, setFilters] = useState([]);
  const [xmls, setXmls] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      searchRef.current.focus();
    }
  }, [editingInputIndex, isEditing]);

  /*   function resetData() {
    setFilters([]);
    setDataArray(props.data.filter((i, ind) => ind > 0));
  } */

  function updateData() {
    let data = props.data.filter((i, ind) => ind > 0);
    let currents = filters.slice();
    if (currents.some((i) => i.data.length === 0)) {
      const arr = currents.filter((i) => i.data.length > 0);
      currents = arr;
      setFilters(arr);
    }
    currents.forEach((fil) => {
      const arrWithFil = data.filter((row) =>
        row[fil.index].toLowerCase().includes(fil.data.toLowerCase())
      );
      data = arrWithFil;
    });
    setDataArray(data);
  }

  function findIn(index) {
    setEditingInputIndex(index);
    setEditing(true);
    const arr = filters.slice();
    arr.push({ index: index, data: "" });
    setFilters(arr);
  }

  function killFilter(index) {
    const arr = filters.slice();
    const cur = filters.findIndex((i) => i.index === index);
    filters[cur].data = "";
    setEditingInputIndex(NaN);
    setEditing(false);
    setFilters(arr);
    debounce(updateData, 100);
  }

  function setFilter(value, index) {
    const arr = filters.slice();
    const cur = filters.findIndex((i) => i.index === index);
    filters[cur].data = value;
    setFilters(arr);
    debounce(updateData, 500);
  }

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
    dataArray.forEach((el, ind) => {
      if (ind === 0) {
        string = `${el[index]}: `;
      } else if (ind === dataArray.length - 1) {
        string += `${el[index]}.`;
      } else {
        string += `${el[index]}, `;
      }
      clipboard.copy(string);
    });
  }

  useEffect(() => {
    if (dataArray !== undefined) {
      const arr = dataArray.map((row, ind) =>
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
  }, [dataArray]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {props.data[0].map((cell, index) => {
              return (
                <td key={`table_head-${index}`}>
                  {filters.some((i) => i.index === index) ? (
                    <div className="table_head-cell">
                      <input
                        ref={editingInputIndex === index ? searchRef : null}
                        type="text"
                        placeholder="что ищем?"
                        onChange={(e) => {
                          setFilter(e.target.value, index);
                        }}
                      />
                      <img
                        className="table_search-close"
                        src={close}
                        alt="сбросить"
                        title="сбросить фильтр"
                        onClick={() => {
                          killFilter(index);
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={magnifier}
                        alt="поиск"
                        title="искать по столбцу"
                        onClick={() => {
                          findIn(index);
                        }}
                      />
                      {cell}
                      <img
                        src={copy}
                        alt="копировать"
                        title="копировать"
                        onClick={() => {
                          copyColumn(index);
                        }}
                      />
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataArray.map((row, ind) => (
            <tr key={`row-${ind}`}>
              {row.map((cell, index) => {
                return (
                  <td key={`cell-${index}`}>
                    {cell[0] === "<" && cell[cell.length - 1] === ">"
                      ? "XML"
                      : cell}
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
