import React, { useState, useEffect, useRef } from "react";
import { useClipboard } from "use-clipboard-copy";
import Popup from "../Popup/Popup";
import HighlightSearchText from "../HighlightSearchText/HighlightSearchText";
import { debounce } from "../../utils/helpers";
import { addData } from "../../utils/firebase";
import { baseUrl } from "../../utils/consts";
import copy from "../../assets/copy.svg";
import eye from "../../assets/eye.svg";
import close from "../../assets/close copy.svg";
import magnifier from "../../assets/magnifier.svg";
import "./Table.css";

function Table(props) {
  const [currentXml, setCurrentXml] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCounter, setSearchCounter] = useState(0);
  const [findedPosition, setFindedPosition] = useState(NaN);
  const [editingInputIndex, setEditingInputIndex] = useState(NaN);
  const [isEditing, setEditing] = useState(false);
  const [popupIsOpen, setPopupOpened] = useState(false);
  const [urlIsSetted, urlSetted] = useState(false);
  const [shortUrlIsSetted, shortUrlSetted] = useState(false);
  const [filters, setFilters] = useState([]);
  const [xmls, setXmls] = useState([]);
  const [dataArray, setDataArray] = useState(
    props.data.filter((i, ind) => ind > 0)
  );

  const searchRef = useRef(null);

  const clipboard = useClipboard({
    onError() {
      alert("Произошла непредвиденная ошибка");
    },
    copiedTimeout: 3000,
  });

  useEffect(() => {
    if (isEditing) {
      searchRef.current.focus();
    }
  }, [editingInputIndex, isEditing]);

  function getFullLink() {
    const head = props.data[0];
    const data = props.data.filter((i, ind) => ind > 0);
    const body = data.map((i) => JSON.stringify(i));
    addData({ head, body }).then((res) => {
      clipboard.copy(`${baseUrl}#data=${res}`);
      urlSetted(true);
    });
  }

  function getShortLink() {
    const head = props.data[0];
    const data = dataArray;
    const body = data.map((i) => JSON.stringify(i));
    addData({ head, body }).then((res) => {
      clipboard.copy(`${baseUrl}#data=${res}`);
      shortUrlSetted(true);
    });
  }

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

  function resetData() {
    setFilters([]);
    setEditingInputIndex(NaN);
    setEditing(false);
    setDataArray(props.data.filter((i, ind) => ind > 0));
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

  function openPopup(index) {
    setCurrentXml(xmls[index]);
    setPopupOpened(true);
  }

  function closePopup() {
    setCurrentXml("");
    setPopupOpened(false);
  }

  function setGlobalSearch(val) {
    setSearchTerm(val);
  }

  useEffect(() => {
    if(findedPosition) {
      const indexLeft = (findedPosition + 1) - (Math.floor((findedPosition + 1) / props.data[0].length) * props.data[0].length) - 1
      const indexTop = findedPosition
      const container = document.body;
      const nodes = Array.from(container.querySelectorAll("td"));
      if ((nodes[indexLeft].offsetLeft > window.innerWidth) || (nodes[indexTop].offsetTop > window.innerHeight)) {
        const elementX = nodes[indexLeft].offsetLeft
        const elementY = nodes[indexTop].offsetTop
        const scrollPositionLeft = {
          left: elementX > window.innerWidth ? elementX : 0,
          behavior: "smooth"
        }
        const scrollPositionTop = {
          top: elementY > window.innerHeight ? elementY : 0,
          behavior: "smooth"
        }
        const root = container.querySelector("#root")
        window.scrollTo(scrollPositionTop);
        root.scrollTo(scrollPositionLeft);
      }
    }
  })

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
      const arr = dataArray.map((row) =>
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
    <section className="Table">
      <article className="Table_title Table_title_search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setGlobalSearch(e.target.value);
          }}
          placeholder="Глобальный поиск"
        />
        {searchCounter === 0 ? (
          <img
            src={magnifier}
            alt="поиск"
            title="искать по всей таблице"
            className="Table_title_search-content"
          />
        ) : (
          <p className="Table_title_search-content">{`результатов: ${searchCounter}`}</p>
        )}
      </article>
      <article className="Table_title">
        {filters.length > 0 ? (
          <p onClick={resetData} style={{ cursor: "pointer" }}>
            Сбросить все фильтры
          </p>
        ) : (
          ""
        )}
        <p onClick={getFullLink} style={{ cursor: "pointer" }}>
          {urlIsSetted
            ? "Ссылка скопирована в буфер обмена"
            : `Получить ссылку на ${
                filters.length > 0 ? "полную " : ""
              } таблицу`}
        </p>
        {filters.length > 0 ? (
          <p onClick={getShortLink} style={{ cursor: "pointer" }}>
            {shortUrlIsSetted
              ? "Ссылка скопирована в буфер обмена"
              : "Получить ссылку на таблицу с фильтрами"}
          </p>
        ) : (
          ""
        )}
      </article>
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
          <HighlightSearchText
            searchTerm={searchTerm}
            setSearchCounter={setSearchCounter}
            setFindedPosition={setFindedPosition}
          />
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
    </section>
  );
}

export default Table;
