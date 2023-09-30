import React, { useState } from "react";
import Output from "./Output";

function KeywordSearch() {
  const [showOutput, setShowOutput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleSearchButton() {
    setShowOutput(true);
    setInputValue("");
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        id="search"
      />
      <button onClick={handleSearchButton}>Suchen</button>
      {showOutput && <Output />}
    </div>
  );
}

export default KeywordSearch;
