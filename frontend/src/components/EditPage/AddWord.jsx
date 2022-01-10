import React, { useState } from "react";
import axios from "axios";

const AddWord = () => {
  const [inputValueFin, setInputValueFin] = useState("");
  const [inputValueEng, setInputValueEng] = useState("");

  const AddWord = async () => {
    const obj = {
      fin: inputValueFin,
      eng: inputValueEng,
    };

    if (obj.fin && obj.eng) {
      await axios.post("http://localhost:8080/words", obj);
      setInputValueEng("");
      setInputValueFin("");
      alert("Added!");
    } else {
      alert("Fields should not be empty!");
    }
  };

  return (
    <div className="words__form">
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
        <button onClick={AddWord}>Add new word</button>
      </div>
    </div>
  );
};

export default AddWord;
