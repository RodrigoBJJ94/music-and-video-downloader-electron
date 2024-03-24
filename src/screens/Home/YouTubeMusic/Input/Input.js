import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import "../../../../Styles.css";

export default function Input() {

  const { inputURLYoutubeMusic, setInputURLYoutubeMusic } = useContextAPI();

  return (
    <input
      value={inputURLYoutubeMusic}
      onChange={element => setInputURLYoutubeMusic(element.target.value)}
      className="input"
    />
  );
};
