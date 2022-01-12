import { useNavigate } from "react-router-dom";

const Homepage = () => {
  let navigate = useNavigate();

  return (
    <div className="Homepage">
      <h2>LearnEnglish!</h2>
      <p>Hi! In this app you can learn Finnish and English words!</p>
      <p>
        If you are teacher, you can edit word list, by clicking this button
      </p>{" "}
      <div>
        <button
          onClick={() => {
            navigate(`/edit`);
          }}
        >
          I am teacher
        </button>
      </div>
    </div>
  );
};

export default Homepage;
