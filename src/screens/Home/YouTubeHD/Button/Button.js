import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import Swal from "sweetalert2";
import "../../../../Styles.css";

export default function Button() {

  const { inputURLYoutubeHD } = useContextAPI();

  const sendURLYoutubeHD = () => {
    window.api?.getURLYoutubeHD(inputURLYoutubeHD);
  };

  window.api?.getURLYoutubeHDResponse(data => {
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
    } else {
      Swal.fire({
        icon: "error",
        iconColor: "#E86969",
        text: data
      });
    };
  });

  return (
    <div className="buttonsContainer">
      <button
        onClick={() => {
          sendURLYoutubeHD();
        }}
        className="buttons"
        style={{ marginRight: "1.5vw" }}>
        Download
      </button>
    </div>
  );
};
