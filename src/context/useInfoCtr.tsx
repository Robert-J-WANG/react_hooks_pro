import { useState, ReactNode } from "react";
import { createContainer } from "react-tracked";

type TProviderProps = {
  children: ReactNode;
};

const initalValue = () => {
  return useState({ age: 18, saving: 1000 });
};

const infoCtr = createContainer(initalValue);

export const InfoCtrProvider = (props: TProviderProps) => {
  return <infoCtr.Provider>{props.children}</infoCtr.Provider>;
};

export const useInfoCtr = () => {
  return infoCtr.useTracked();
};
