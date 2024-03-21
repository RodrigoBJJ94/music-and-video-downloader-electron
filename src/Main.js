import React from "react";
import { useContextAPI } from "./context/ContextAPI";
import Header from "./components/Header/Header";
import Swal from "sweetalert2";
import "./Styles.css";

export default function Main() {

  const { setInputURLYoutube, inputURLYoutube } = useContextAPI();

  const sendURLYoutube = () => {
    window.api?.getURLYoutube(inputURLYoutube);
  };

  const sendURLMusicYoutube = () => {
    window.api?.getURLMusicYoutube(inputURLYoutube);
  };

  window.api?.getURLYoutubeResponse(data => {
    Swal.fire({
      icon: "warning",
      iconColor: "#E86969",
      text: data
    });
  });

  window.api?.getURLMusicYoutubeResponse(data => {
    Swal.fire({
      icon: "warning",
      iconColor: "#E86969",
      text: data
    });
  });

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
          Download Youtube Video
        </button>
        <button
          onClick={() => {
            sendURLMusicYoutube();
          }}>
          Download Youtube Music
        </button>
      </div>
    </div>
  );
};
