import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import WordsToLearn from "./WordsToLearn";

import "./Words.scss";

const Words = ({ isPlayable }) => {
  const ref = useRef(null);
  const [words, setWords] = useState(null);
  const [score, setScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [finToEng, setFinToEng] = useState(true);

  useEffect(() => {
    axios("http://localhost:8080/words").then(({ data }) => {
      const shuffledData = data.sort((a, b) => 0.5 - Math.random());
      setWords(shuffledData);
      setWords(data);
    });
  }, []);

  const checkWord = (e, word) => {
    if (finToEng) {
      if (e.target.value.toLowerCase() === word.eng.toLowerCase()) {
        setScore(score + 1);
        return true;
      }
    } else {
      if (e.target.value.toLowerCase() === word.fin.toLowerCase()) {
        setScore(score + 1);
        return true;
      } else return false;
    }
  };

  let divStyle = {
    color: "blue",
  };

  return (
    <div className="words">
      {words === null ? (
        "Loading..."
      ) : isPlayable ? (
        !isChecked ? (
          <div>
            <h2>Play</h2>
            {words.map((word) => (
              <div className="words__pair" style={divStyle} key={word.id}>
                {finToEng ? word.fin : word.eng} ={" "}
                <input
                  className="words__pair-answer"
                  placeholder="Type answer"
                  ref={ref}
                  onChange={(e) => {
                    if (checkWord(e, word)) {
                      console.log("hello");
                    }
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
              <button
                onClick={() => {
                  setFinToEng(!finToEng);
                }}
              >
                Change language
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Play</h2>
            {words.map((word) => (
              <div className="words__pair" key={word.id}>
                {finToEng ? word.fin : word.eng} ={" "}
                <input
                  className="words__pair-answer"
                  placeholder="Type answer"
                  onChange={(e) => {
                    if (checkWord(e, word)) {
                      console.log("hello");
                    }
                  }}
                />
              </div>
            ))}
            <div>
              <h3>Your score is {score}</h3>
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
