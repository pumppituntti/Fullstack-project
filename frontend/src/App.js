import React, { useState, useEffect } from "react";
import axios from "axios";

import { Words } from "./components";

function App() {
  // const [words, setWords] = useState(null);
  // const [inputValue, setInputValue] = useState("");
  // const [checker, setChecker] = useState(false);

  // useEffect(() => {
  //   axios("http://localhost:8080/words").then(({ data }) => {
  //     setWords(data);
  //   });
  // }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <span>Home</span>
        <span>Learn</span>
        <span>Play</span>
      </div>
      <div className="App__content">
        <Words />
      </div>
    </div>
  );
}

export default App;
