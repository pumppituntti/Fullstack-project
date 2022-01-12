import React, { useState, useEffect } from "react";
import axios from "axios";
import WordsToLearn from "./WordsToLearn";

import "./Words.scss";

const Words = ({ isPlayable }) => {
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
      } else return false;
    } else {
      if (e.target.value.toLowerCase() === word.fin.toLowerCase()) {
        setScore(score + 1);
      } else return false;
    }
  };

  return (
    <div className="words">
      {words === null ? (
        "Loading..."
      ) : isPlayable ? (
        !isChecked ? (
          <div>
            <h2>Play</h2>
            <button
              onClick={() => {
                setFinToEng(!finToEng);
              }}
            >
              Change language
            </button>
            {words.map((word) => (
              <div className="words__pair" key={word.id}>
                {finToEng ? word.fin : word.eng} ={" "}
                <input
                  className="words__pair-answer"
                  placeholder="Type answer"
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
            <h2>Play</h2>
            {words.map((word) => (
              <div className="words__pair" key={word.id}>
                {finToEng ? word.fin : word.eng} ={" "}
                <input
                  className="words__pair-answer"
                  placeholder="Type answer"
                  onChange={(e) => {
                    checkWord(e, word);
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
