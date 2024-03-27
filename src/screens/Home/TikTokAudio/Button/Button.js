import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import Swal from "sweetalert2";
import "../../../../Styles.css";

export default function Button() {

  const { inputURLTikTokAudio } = useContextAPI();

  const sendURLTikTokAudio = () => {
    if (inputURLTikTokAudio !== "") {
      window.api?.getURLTikTokAudio(inputURLTikTokAudio);
    } else {
      Swal.fire({
        icon: "error",
        iconColor: "#E86969",
        text: "This TikTok link is incorrect"
      });
    };
  };

  window.api?.getURLTikTokAudioResponse(data => {
    if (data === "Downloading...") {
      Swal.fire({
        icon: "",
        showConfirmButton: false,
        text: data
      });
    } else if (data === "This TikTok link is incorrect") {
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
    <div className="buttonsContainer">
      <button
        className="buttons"
        onClick={() => {
          sendURLTikTokAudio();
        }}>
        Download
      </button>
    </div>
  );
};
