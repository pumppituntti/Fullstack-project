import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Words.scss";

const Words = () => {
  const [words, setWords] = useState(null);
  const [inputValue, setInputValue] = useState("");
  //   const [checker, setChecker] = useState(false);

  useEffect(() => {
    axios("http://localhost:8080/words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  return (
    <div className="words">
      <h2>Words</h2>
      {words === null
        ? "Loading..."
        : words.map((word) => (
            <div className="words__pair" key={word.id}>
              {word.fin} ={" "}
              <input
                placeholder="Type here in English"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div>
                <button
                  onClick={() => {
                    if (inputValue.toUpperCase === word.eng.toUpperCase)
                      alert("YOURE GODDAMN RIGHT!");
                    else alert("You have a mistake! Try again!");
                  }}
                >
                  Check answer
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Words;
