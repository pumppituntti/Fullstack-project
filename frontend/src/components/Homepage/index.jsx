import { useNavigate } from "react-router-dom";

const Homepage = () => {
  let navigate = useNavigate();

  return (
    <div className="Homepage">
      <h2>Homepage</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea veniam,
        minima molestiae adipisci aliquid at officia aspernatur exercitationem
        odio harum.
      </p>
      <p>If you are teacher, you can edit word list, by clicking this button</p>{" "}
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
