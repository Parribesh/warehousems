import { useState, createContext } from "react";

const RenderContext = createContext();

export const RenderProvider = ({ children }) => {
  const [state, setState] = useState({ item: "" });

  return (
    <RenderContext.Provider value={{ state, setState }}>
      {children}
    </RenderContext.Provider>
  );
};

export default RenderContext;
