import React from "react";
import { useClipboard } from "use-clipboard-copy";
import Highlight from "react-highlight";
import close from "../../assets/close.svg";
import copy from "../../assets/copy copy.svg";
import "./Popup.css";

function Popup(props) {
  const beautifyCode = (str) => {
    let level = 0;
    let tab = "  ";
    let formattedXML = "";

    str = str
      .replace(/>/g, ">\n")
      .replace(/<\/(?!\/)/g, "\n</")
      .replace("\n*", "\n");
    const arr = str.split("\n");
    arr.forEach((node, index) => {
      const cur = node.replace("\n", "").trim();
      let indent = "";

      if (index === 0 && /^<\?xml[\w\W]*>$/.test(cur)) {
        level = 0;
      } else if (/^<\/[\w\W]*>$/.test(cur)) {
        level--;
        indent = tab.repeat(level);
      } else if (/^<.*>$/.test(cur)) {
        indent = tab.repeat(level);
        level++;
      } else {
        indent = tab.repeat(level);
      }

      if (cur.length > 0) {
        formattedXML += indent + cur + "\n";
      }
    });

    return formattedXML;
  };

  const clipboard = useClipboard({
    onError() {
      alert("Произошла непредвиденная ошибка");
    },
    copiedTimeout: 3000,
  });

  function copyXml() {
    clipboard.copy(props.code);
  }

  return (
    <section className={`Popup ${props.popupIsOpen && "Popup_opened"}`}>
      <article className="Popup_buttons">
        <article className="Popup_button" onClick={copyXml}>
          <h3>Копировать </h3>
          <img
            className="Popup_button-image"
            src={copy}
            alt="закрыть"
            title="закрыть"
          />
        </article>
        <article className="Popup_button" onClick={props.closePopup}>
          <h3>Закрыть </h3>
          <img
            className="Popup_button-image"
            src={close}
            alt="закрыть"
            title="закрыть"
          />
        </article>
      </article>
      <Highlight className="xml">{beautifyCode(props.code)}</Highlight>
    </section>
  );
}

export default Popup;
