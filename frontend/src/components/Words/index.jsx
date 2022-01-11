import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Words.scss";
import WordsToLearn from "./WordsToLearn";

const Words = ({ isPlayable }) => {
  const [words, setWords] = useState(null);
  const [score, setScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    axios("http://localhost:8080/words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  const checkWord = (e, word) => {
    if (e.target.value.toLowerCase() === word.eng.toLowerCase()) {
      setScore(score + 1);
    } else return false;
  };

  return (
    <div className="words">
      <h2>Words</h2>
      {words === null ? (
        "Loading..."
      ) : isPlayable ? (
        !isChecked ? (
          <div>
            {words.map((word) => (
              <div className="words__pair" key={word.id}>
                {word.fin} ={" "}
                <input
                  placeholder="Type here in English"
                  onChange={(e) => {
                    checkWord(e, word);
                  }}
                />
              </div>
            ))}
            <div>
              <button
                onClick={() => {
                  setIsChecked(true);
                }}
              >
                Check answer
              </button>
            </div>
          </div>
        ) : (
          <div>
            {words.map((word) => (
              <div className="words__pair" key={word.id}>
                {word.fin} ={" "}
                <input
                  placeholder="Type here in English"
                  onChange={(e) => {
                    checkWord(e, word);
                  }}
                />
              </div>
            ))}
            <div>
              Your score is {score}
              <button
                onClick={() => {
                  document.location.reload(true);
                }}
              >
                Try again
              </button>
            </div>
          </div>
        )
      ) : (
        <WordsToLearn words={words} />
      )}
    </div>
  );
};

export default Words;
