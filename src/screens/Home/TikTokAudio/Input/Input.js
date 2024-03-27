import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import "../../../../Styles.css";

export default function Input() {

  const { inputURLTikTokAudio, setInputURLTikTokAudio } = useContextAPI();

  return (
    <input
      value={inputURLTikTokAudio}
      onChange={element => setInputURLTikTokAudio(element.target.value)}
      className="input"
    />
  );
};
