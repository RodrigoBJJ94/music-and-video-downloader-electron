import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import "../../../../Styles.css";

export default function Input() {

  const { inputURLTikTok, setInputURLTikTok } = useContextAPI();

  return (
    <input
      value={inputURLTikTok}
      onChange={element => setInputURLTikTok(element.target.value)}
      className="input"
    />
  );
};
