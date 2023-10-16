import { ReactNode, createContext, useContext, useState } from "react";

type TProviderProps = {
  children: ReactNode;
};
const initValue = {
  age: 0,
  addAge: () => {},
  saving: 0,
  addSaving: () => {},
};
const infoCtx = createContext(initValue);
export const InfoCtxProvider = (props: TProviderProps) => {
  const [age, setAge] = useState(18);
  const addAge = () => {
    setAge((prev) => prev + 1);
  };
  const [saving, setSaving] = useState(1000);
  const addSaving = () => {
    setSaving((prev) => prev + 1000);
  };
  return (
    <infoCtx.Provider value={{ age, addAge, saving, addSaving }}>
      {props.children}
    </infoCtx.Provider>
  );
};

export const useInfoCtx = () => {
  return useContext(infoCtx);
};
