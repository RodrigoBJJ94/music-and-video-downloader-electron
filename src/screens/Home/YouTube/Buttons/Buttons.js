import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import Swal from "sweetalert2";
import Video from "./Video/Video";
import Music from "./Music/Music";
import "../../../../Styles.css";

export default function Buttons() {

  const { inputURLYoutube } = useContextAPI();

  const sendURLTikTok = () => {
    window.api?.getURLTikTok(inputURLYoutube);
  };

  window.api?.getURLTikTokResponse(data => {
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
      <Video />
      <Music />
      <button onClick={() => sendURLTikTok()}>
        TitTok Download
      </button>
    </div>
  );
};
