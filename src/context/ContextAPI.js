import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [test, setTest] = useState(0);

  const values = {
    test, setTest
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
