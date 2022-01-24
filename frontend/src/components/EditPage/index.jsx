import { useState, useEffect } from "react";
import axios from "axios";
import AddWord from "./AddWord";

import editSvg from "./../../img/edit.svg";
import removeSvg from "./../../img/remove.svg";

import "./EditPage.scss";

/**
 * This function renders the edit page
 * @returns edit page
 */
const EditPage = () => {
  /**
   * Array of words to render
   */
  const [words, setWords] = useState(null);

  /**
   * Getting an array by requesting a backend server
   */
  useEffect(() => {
    axios("/words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  /**
   * Updating data when the list changes
   */
  useEffect(() => {
    axios("/words").then(({ data }) => {
      setWords(data);
    });
  }, [words]);

  /**
   * This function adds a new word to the list
   * @param {object} word - word to add
   */
  const addWord = (word) => {
    const newList = [...words, word];
    setWords(newList);
  };
  /**
   * This function makes a request to delete an object from the database. After that the page is reloaded
   * @param {number} id - id of the object to be deleted
   */
  const deleteWord = async (id) => {
    if (window.confirm("Are you sure want to delete this word?")) {
      await axios.delete(`/words/${id}`);
      const newLists = words.filter((word) => word.id !== id);
      setWords(newLists);
    }
  };

  /**
   * This function updates the values of the object (word)
   * @param {object} word - word to edit
   */
  const editWord = async (word) => {
    /**
     * New values entered by the user
     */
    const newFin = window.prompt("Suomeksi", word.fin);
    const newEng = window.prompt("In English", word.eng);
    /**
     * Object with new values
     */
    const obj = {
      fin: newFin,
      eng: newEng,
      id: word.id,
    };
    /**
     * If the new object has both fields, then replace the old object with them
     */
    if (obj.fin && obj.eng) {
      try {
        await axios.patch("/words", obj);
        const newList = words.map((word) => {
          if (obj.id === word.id) {
            word.fin = obj.fin;
            word.eng = obj.eng;
          }
          return word;
        });
        setWords(newList);

        // document.location.reload(true);
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
        On this page you can edit vocabulary. You can add new words and edit or
        delete olds ones.
      </p>
      {/* If array of words exists then render it */}
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
      {/* Component for adding a new word */}
      <AddWord addWord={addWord} />
    </div>
  );
};

export default EditPage;
