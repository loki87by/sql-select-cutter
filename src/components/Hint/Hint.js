import React, { createElement } from "react";
import { hints } from "../../utils/consts";
import "../Popup/Popup.css";
import "./Hint.css";

function Hint(props) {
  return (
    <section
      style={{ top: `${props.fromTop}px` }}
      className={`Popup ${props.popupIsOpen && "Popup_opened"} Hint`}
    >
      {props.popupIsOpen
        ? hints[props.index - 1].map((el, ind) =>
            createElement(
              el.tag,
              { ...el.params, key: `hint-${ind}` },
              el.content
            )
          )
        : ""}
    </section>
  );
}

export default Hint;
