import React from "react";
import { useContextAPI } from "../../context/ContextAPI";
import Header from "../../components/Header/Header";
import Swal from "sweetalert2";
import YouTubeIcon from "../../icons/YouTubeIcon.svg";
import "../../Styles.css";

export default function Home() {
  const { setInputURLYoutube, inputURLYoutube } = useContextAPI();

  const sendURLYoutube = () => {
    window.api?.getURLYoutube(inputURLYoutube);
  };

  const sendURLMusicYoutube = () => {
    window.api?.getURLMusicYoutube(inputURLYoutube);
  };

  window.api?.getURLYoutubeResponse(data => {
    if (data === "Downloading...") {
      Swal.fire({
        icon: "",
        showConfirmButton: false,
        text: data
      });
    } else if (data === "This YouTube link is incorrect") {
      Swal.fire({
        icon: "error",
        iconColor: "#E86969",
        text: data
      });
    } else if (data === "Download finished") {
      Swal.fire({
        icon: "success",
        iconColor: "#10B597",
        text: data
      });
    };
  });

  window.api?.getURLMusicYoutubeResponse(data => {
    if (data === "Downloading...") {
      Swal.fire({
        icon: "",
        showConfirmButton: false,
        text: data
      });
    } else if (data === "This YouTube link is incorrect") {
      Swal.fire({
        icon: "error",
        iconColor: "#E86969",
        text: data
      });
    } else if (data === "Download finished") {
      Swal.fire({
        icon: "success",
        iconColor: "#10B597",
        text: data
      });
    };
  });

  return (
    <div className="app">
      <Header />
      <div className="body">
        <div className="youTubeContainer">
          <div className="youTubeTitleContainer">
            <img
              src={YouTubeIcon}
              className="youTubeIcon"
              alt="YouTube Icon"
            />
            <p>
              YouTube
            </p>
          </div>
          <input
            value={inputURLYoutube}
            onChange={element => setInputURLYoutube(element.target.value)}
            className="input"
          />
          <div className="youTubeButtonsContainer">
            <button
              onClick={() => {
                sendURLYoutube();
              }}
              className="buttons"
              style={{ marginRight: "1.5vw" }}>
              Download Video
            </button>
            <button
              onClick={() => {
                sendURLMusicYoutube();
              }}
              className="buttons">
              Download Music
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
