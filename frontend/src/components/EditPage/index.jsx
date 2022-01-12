import { useState, useEffect } from "react";
import axios from "axios";
import AddWord from "./AddWord";

import editSvg from "./../../img/edit.svg";
import removeSvg from "./../../img/remove.svg";

import "./EditPage.scss";

const EditPage = () => {
  const [words, setWords] = useState(null);

  useEffect(() => {
    axios("http://localhost:8080/words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  const deleteWord = async (id) => {
    if (window.confirm("Are you sure want to delete this word?")) {
      await axios.delete(`http://localhost:8080/words/${id}`);
      document.location.reload(true);
    }
  };

  const editWord = async (word) => {
    const newFin = window.prompt("Suomeksi", word.fin);
    const newEng = window.prompt("In English", word.eng);

    const obj = {
      fin: newFin,
      eng: newEng,
      id: word.id,
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
    <div className="words">
      <p>
        On this page you can edit vocabulary. You can add new words or delete
        olds ones.
      </p>
      {words === null
        ? "Loading..."
        : words.map((word) => (
            <div className="words__pair__list" key={word.id}>
              {word.fin} = {word.eng}
              <img
                src={editSvg}
                alt="edit icon"
                onClick={() => {
                  editWord(word);
                }}
              />
              <img
                src={removeSvg}
                alt="remove icon"
                onClick={() => {
                  deleteWord(word.id);
                }}
              />
            </div>
          ))}
      <AddWord />
    </div>
  );
};

export default EditPage;
