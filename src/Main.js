import React from "react";
import { useContextAPI } from "./context/ContextAPI";
import Header from "./components/Header/Header";
import "./Styles.css";

export default function Main() {

  const { setInputURLYoutube, inputURLYoutube } = useContextAPI();

  console.log(inputURLYoutube);

  const sendURLYoutube = () => {
    window.api?.getURLYoutube(inputURLYoutube);
  };

  return (
    <div className="app">
      <Header />
      <div className="body">
        <input
          value={inputURLYoutube}
          onChange={element => setInputURLYoutube(element.target.value)}
          style={{
            width: "25vw", height: "5vh", marginTop: "2vh", marginLeft: "1vw", marginRight: "1vw"
          }}
        />
        <button
          onClick={() => {
            sendURLYoutube();
          }}>
          Download
        </button>
      </div>
    </div>
  );
};
