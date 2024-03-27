import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [inputURLYoutubeHD, setInputURLYoutubeHD] = useState("");
  const [inputURLYoutube, setInputURLYoutube] = useState("");
  const [inputURLYoutubeMusic, setInputURLYoutubeMusic] = useState("");
  const [inputURLTikTokHD, setInputURLTikTokHD] = useState("");
  const [inputURLTikTok, setInputURLTikTok] = useState("");
  const [inputURLTikTokAudio, setInputURLTikTokAudio] = useState("");

  const values = {
    inputURLYoutubeHD, setInputURLYoutubeHD,
    inputURLYoutube, setInputURLYoutube,
    inputURLYoutubeMusic, setInputURLYoutubeMusic,
    inputURLTikTokHD, setInputURLTikTokHD,
    inputURLTikTok, setInputURLTikTok,
    inputURLTikTokAudio, setInputURLTikTokAudio
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
