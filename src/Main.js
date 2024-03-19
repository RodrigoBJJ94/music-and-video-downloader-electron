import React from "react";
import { useContextAPI } from "./context/ContextAPI";
import Header from "./components/Header/Header";
import "./Styles.css";

export default function Main() {

  const { test } = useContextAPI();

  console.log(test);

  return (
    <div className="app">
      <Header />
      <div className="body"></div>
    </div>
  );
};
