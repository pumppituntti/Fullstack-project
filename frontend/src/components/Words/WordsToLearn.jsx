import { useNavigate } from "react-router-dom";

const WordsToLearn = ({ words }) => {
  let navigate = useNavigate();
  return (
    <div>
      {words.map((word) => (
        <div className="words__pair" key={word.id}>
          {word.fin} = {word.eng}
        </div>
      ))}
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
