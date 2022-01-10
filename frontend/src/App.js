import React, { useState, useEffect } from "react";
import axios from "axios";

import { Words } from "./components";

import "./App.css";

function App() {
  const [words, setWords] = useState(null);
  const [inputValue, setInputValue] = useState("");
  // const [checker, setChecker] = useState(false);

  useEffect(() => {
    axios("http://localhost:8080/words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  return (
    <div className="App">
      <Words />
    </div>
  );
}

export default App;
