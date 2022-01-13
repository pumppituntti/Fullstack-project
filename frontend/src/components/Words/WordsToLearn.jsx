import { useNavigate } from "react-router-dom";

/**
 * This function renders a list of words (without the ability to interact with them)
 * @param {Array} words - an array of words to render
 * @returns list of finnish and english words
 */
const WordsToLearn = ({ words }) => {
  let navigate = useNavigate();

  return (
    <div>
      <h2>Learn</h2>
      {words.map((word) => (
        <div className="words__pair" key={word.id}>
          {word.fin} = {word.eng}
        </div>
      ))}
      {/* Button to switch to game mode */}
      <button
        onClick={() => {
          navigate(`/play`);
        }}
      >
        Try yourself!
      </button>
    </div>
  );
};

export default WordsToLearn;
