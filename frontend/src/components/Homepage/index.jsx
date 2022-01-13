import { useNavigate } from "react-router-dom";

/**
 * This function renders the home page
 * @returns homepage
 */
const Homepage = () => {
  let navigate = useNavigate();

  return (
    <div className="Homepage">
      <h2>LearnEnglish!</h2>
      <p>Hi! In this app you can learn Finnish and English words!</p>
      <p>
        To start learning words or playing, just click on the section you want
        on the left side.
      </p>
      <p>If you are teacher, you can edit word list, by clicking this button</p>{" "}
      {/* Button for teacher to go to edit page */}
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
