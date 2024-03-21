import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [inputURLYoutube, setInputURLYoutube] = useState("");
  const [inputURLMusicYoutube, setInputURLMusicYoutube] = useState("");

  const values = {
    inputURLYoutube, setInputURLYoutube,
    inputURLMusicYoutube, setInputURLMusicYoutube
  };

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );
};

export const useContextAPI = () => {
  const context = useContext(Context);

  return context;
};
