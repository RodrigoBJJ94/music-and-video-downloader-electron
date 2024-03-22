import React from "react";
import { useContextAPI } from "../../../../context/ContextAPI";
import "../../../../Styles.css";

export default function Input() {

  const { inputURLYoutube, setInputURLYoutube } = useContextAPI();

  return (
    <input
      value={inputURLYoutube}
      onChange={element => setInputURLYoutube(element.target.value)}
      className="input"
    />
  );
};
