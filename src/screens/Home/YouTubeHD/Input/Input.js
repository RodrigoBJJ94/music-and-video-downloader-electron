import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import "../../../../Styles.css";

export default function Input() {

  const { inputURLYoutubeHD, setInputURLYoutubeHD } = useContextAPI();

  return (
    <input
      value={inputURLYoutubeHD}
      onChange={element => setInputURLYoutubeHD(element.target.value)}
      className="input"
    />
  );
};
