import React from "react";
import { ContextProvider } from "./context/ContextAPI";
import Main from "./Main";

export default function App() {
  return (
    <ContextProvider>
      <Main />
    </ContextProvider>
  );
};