import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [inputURLYoutube, setInputURLYoutube] = useState("");
  const [inputURLYoutubeMusic, setInputURLYoutubeMusic] = useState("");
  const [inputURLTikTok, setInputURLTikTok] = useState("");

  const values = {
    inputURLYoutube, setInputURLYoutube,
    inputURLYoutubeMusic, setInputURLYoutubeMusic,
    inputURLTikTok, setInputURLTikTok
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
