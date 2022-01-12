import React, { useState } from "react";
import axios from "axios";

const AddWord = () => {
  const [inputValueFin, setInputValueFin] = useState("");
  const [inputValueEng, setInputValueEng] = useState("");

  const addWord = async () => {
    const obj = {
      fin: inputValueFin,
      eng: inputValueEng,
    };

    if (obj.fin && obj.eng) {
      try {
        await axios.post("http://localhost:8080/words", obj);
        document.location.reload(true);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Fields should not be empty!");
    }
  };

  const editWord = async () => {
    const obj = {
      fin: inputValueFin,
      eng: inputValueEng,
      id: 12,
    };

    if (obj.fin && obj.eng) {
      try {
        await axios.patch("http://localhost:8080/words", obj);
        document.location.reload(true);
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
        <input
          className="field"
          type="text"
          placeholder="Suomeksi"
          onChange={(e) => setInputValueFin(e.target.value)}
        />
        <input
          className="field"
          type="text"
          placeholder="In English"
          onChange={(e) => setInputValueEng(e.target.value)}
        />
        <button onClick={addWord}>Add</button>
      </div>
    </div>
  );
};

export default AddWord;
