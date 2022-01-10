import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Words.scss";

const Words = ({ isPlayable }) => {
  const [words, setWords] = useState(null);
  const [score, setScore] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    axios("http://localhost:8080/words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  const checkWord = (e, word) => {
    if (e.target.value.toLowerCase() === word.eng.toLowerCase()) {
      setScore(score + 1);
    }
  };

  return (
    <div className="words">
      <h2>Words</h2>
      {words === null
        ? "Loading..."
        : isPlayable
        ? words.map((word) => (
            <div className="words__pair" key={word.id}>
              {word.fin} ={" "}
              <input
                placeholder="Type here in English"
                onChange={(e) => {
                  checkWord(e, word);
                }}
              />
            </div>
          ))
        : words.map((word) => (
            <div className="words__pair__list" key={word.id}>
              {word.fin} = {word.eng}
            </div>
          ))}
      {isPlayable ? (
        <div>
          <button
            onClick={() => {
              alert(`Your score is ${score}`);
            }}
          >
            Check answer
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate(`/play`);
          }}
        >
          Try yourself!
        </button>
      )}
    </div>
  );
};

export default Words;
