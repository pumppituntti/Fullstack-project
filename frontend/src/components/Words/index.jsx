import React, { useState, useEffect } from "react";
import axios from "axios";
import WordsToLearn from "./WordsToLearn";

import "./Words.scss";

/**
 * This function renders a list of words to play or learn depending on the value of the variable isPlayable
 * @param {boolean} isPlayable - boolean for separate rendering of the game and the list to learn
 * @returns list of the words
 */
const Words = ({ isPlayable }) => {
  /**
   * Array with words to render
   */
  const [words, setWords] = useState(null);
  /**
   * Score counter
   */
  const [score, setScore] = useState(0);
  /**
   * Boolean to check game over or not
   */
  const [isChecked, setIsChecked] = useState(false);
  /**
   * Boolean to check "direction of translation" (Finnish to English or vice versa)
   */
  const [finToEng, setFinToEng] = useState(true);
  /**
   * An array with the correct answers given by the user
   */
  const [rightAnswers, setRightAnswers] = useState([]);
  /**
   * Getting an array by requesting a backend server
   * After receiving, the array is shuffled in random order
   */
  useEffect(() => {
    axios("/words/").then(({ data }) => {
      const shuffledData = data.sort((a, b) => 0.5 - Math.random());
      setWords(shuffledData);
      setWords(data);
    });
  }, []);

  /**
   * Updating data when starting a new game
   */
  useEffect(() => {
    axios("/words/").then(({ data }) => {
      const shuffledData = data.sort((a, b) => 0.5 - Math.random());
      setWords(shuffledData);
      setWords(data);
    });
  }, [isChecked]);

  /**
   * This function checks if the value entered by the user matches the value from the list (did the user write the correct word?)
   * @param {React.ChangeEvent<HTMLInputElement>} e - the current event of the input field
   * @param {object} word - word to compare input to
   */
  const checkWord = (e, word) => {
    // checking direction of translation
    if (finToEng) {
      // if the input matches the correct answer, the score incremented and the answer is added to the list of correct ones
      if (e.target.value.toLowerCase() === word.eng.toLowerCase()) {
        setScore(score + 1);
        const newList = [...rightAnswers, word];
        setRightAnswers(newList);
      }
    } else {
      if (e.target.value.toLowerCase() === word.fin.toLowerCase()) {
        setScore(score + 1);
        const newList = [...rightAnswers, word];
        setRightAnswers(newList);
      }
    }
  };

  return (
    <div className="words">
      {/* If array of words exists then render it */}
      {words === null ? (
        "Loading..."
      ) : isPlayable ? (
        !isChecked ? (
          // If results are not checked
          <div>
            <h2>Play</h2>
            {/* Render words with input fields for the game*/}
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
              {/* Button to check the result */}
              <button
                onClick={() => {
                  setIsChecked(true);
                }}
              >
                Check answer
              </button>
              {/* Button to change language */}
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
          // If results are checked
          <div>
            <h2>Play</h2>
            {/* Render correct answers */}
            {rightAnswers.map((word) => (
              <div
                className="words__pair"
                style={{ color: "green" }}
                key={word.id}
              >
                {finToEng ? word.fin : word.eng} ={" "}
                <input
                  type="button"
                  className="words__pair-answer"
                  style={{ color: "green" }}
                />
              </div>
            ))}
            <div>
              <h3>Your score is {score}</h3>
              {/* Button to restart */}
              <button
                onClick={() => {
                  setIsChecked(false);
                  setScore(0);
                  setRightAnswers([]);
                  setWords([]);
                }}
              >
                Try again
              </button>
            </div>
          </div>
        )
      ) : (
        // If !isPlayable, then rendering a list of words to learn
        <WordsToLearn words={words} />
      )}
    </div>
  );
};

export default Words;
