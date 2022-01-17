import React from "react";

export const ToolbarContext = React.createContext(null);

export const useToolbarContext = () => {
  return React.useContext(ToolbarContext);
};
