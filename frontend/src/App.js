import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { EditPage, Homepage, Words } from "./components";

import bookSvg from "./img/book.svg";
import homeSvg from "./img/home.svg";
import checkSvg from "./img/check.svg";

/**
 * The main function of the application
 * @returns sidebar with links and main content
 */
function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <div className="App__sidebar">
        {/* Homepage button */}
        <span
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img src={homeSvg} alt="home icon" />
          Home
        </span>
        {/* Learn page button */}
        <span
          onClick={() => {
            navigate(`/learn`);
          }}
        >
          <img src={bookSvg} alt="book icon" />
          Learn
        </span>
        {/* Play page button */}
        <span
          onClick={() => {
            navigate(`/play`);
          }}
        >
          <img src={checkSvg} alt="check icon" />
          Play
        </span>
      </div>
      {/* The main content of the application, displayed depending on the url, using routing */}
      <div className="App__content">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/learn" element={<Words isPlayable={false} />} />
          <Route exact path="/play" element={<Words isPlayable={true} />} />
          <Route exact path="/edit" element={<EditPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
