import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios";

import { Words } from "./components";

function App() {
  // const [words, setWords] = useState(null);
  // const [inputValue, setInputValue] = useState("");
  // const [checker, setChecker] = useState(false);

  let navigate = useNavigate();

  return (
    <div className="App">
      <div className="App__sidebar">
        <span
          onClick={() => {
            navigate(`/`);
          }}
        >
          Home
        </span>
        <span
          onClick={() => {
            navigate(`/learn`);
          }}
        >
          Learn
        </span>
        <span
          onClick={() => {
            navigate(`/play`);
          }}
        >
          Play
        </span>
      </div>
      <div className="App__content">
        <Routes>
          <Route exact path="/learn" element={<Words isPlayable={false} />} />
          <Route exact path="/play" element={<Words isPlayable={true} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
