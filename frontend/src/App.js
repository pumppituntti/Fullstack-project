import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [words, setWords] = useState(null);

  useEffect(() => {
    axios("http://localhost:8080/words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  return (
    <div className="App">
      <h2>Words</h2>
      {words === null
        ? "Loading"
        : words.map((word) => (
            <div key={word.id}>
              {word.fin} = {word.eng}
            </div>
          ))}
    </div>
  );
}

export default App;
