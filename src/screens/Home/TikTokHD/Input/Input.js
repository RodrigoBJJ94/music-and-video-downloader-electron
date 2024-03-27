import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import "../../../../Styles.css";

export default function Input() {

  const { inputURLTikTokHD, setInputURLTikTokHD } = useContextAPI();

  return (
    <input
      value={inputURLTikTokHD}
      onChange={element => setInputURLTikTokHD(element.target.value)}
      className="input"
    />
  );
};
