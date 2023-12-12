import React, { useEffect } from "react";

const HighlightSearchText = (props) => {
  useEffect(() => {
    const searchTermRegex = new RegExp(props.searchTerm, "i");
    const container = document.body;
    const nodes = Array.from(container.querySelectorAll("td"));
    const temporarySpans = Array.from(container.querySelectorAll('.span_tmp'))
    const temporaryTds = Array.from(container.querySelectorAll('.td_tmp'))
    temporarySpans.forEach((node => node.remove()))
    temporaryTds.forEach((node => node.classList.remove('td_tmp')))
    let counter = 0

    if (props.searchTerm !== "") {
      nodes.forEach(function (node) {
        props.setSearchCounter(counter)

        if (node.textContent.match(searchTermRegex)) {
          counter++
          const span = document.createElement("span");
          span.innerHTML = node.textContent.replace(
            searchTermRegex,
            function (match) {
              return (
                '<span style="background-color: grey">' + match + "</span>"
              );
            }
          );
          span.classList.add("span_tmp")
          node.appendChild(span);
          node.classList.add("td_tmp")
        }
      });
    }
  }, [props]);

  return <></>;
};

export default HighlightSearchText;
