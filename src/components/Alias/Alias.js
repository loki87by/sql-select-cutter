import React from "react";
import "./Alias.css";
import { query } from "../../utils/consts";

function Alias(props) {

  return (
    <article>
      <p>{`${query} ${props.data};`}</p>
    </article>
  );
}

export default Alias;
