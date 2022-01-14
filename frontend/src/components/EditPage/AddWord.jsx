import React, { useState } from "react";
import axios from "axios";

/**
 * This function creates a component for adding a new word to the database
 * @returns a component for adding a new word
 */
const AddWord = ({ words, addWord }) => {
  /**
   * Input field values for Finnish and English words
   */
  const [inputValueFin, setInputValueFin] = useState("");
  const [inputValueEng, setInputValueEng] = useState("");

  /**
   * This function sends a request to the backend server to add a new word to the database
   */
  const addNewWord = async () => {
    /**
     * New object to be added
     */
    const obj = {
      fin: inputValueFin,
      eng: inputValueEng,
      id: Math.random(),
    };

    /**
     * If both values exist then add the word
     */
    if (obj.fin && obj.eng) {
      try {
        await axios.post("/words", obj);
        addWord(obj);
        setInputValueEng("");
        setInputValueFin("");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Fields should not be empty!");
    }
  };

  return (
    <div className="words__form">
      Add new word
      <div className="words__form-block">
        {/* input field for finnish word */}
        <input
          className="field"
          value={inputValueFin}
          type="text"
          placeholder="Suomeksi"
          onChange={(e) => setInputValueFin(e.target.value)}
        />
        {/* input field for english word */}
        <input
          className="field"
          value={inputValueEng}
          type="text"
          placeholder="In English"
          onChange={(e) => setInputValueEng(e.target.value)}
        />
        <button onClick={addNewWord}>Add</button>
      </div>
    </div>
  );
};

export default AddWord;
