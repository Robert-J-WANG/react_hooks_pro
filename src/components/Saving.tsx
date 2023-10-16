import React from "react";
import { useInfoCtx } from "../context/useInfoCtx";
import { useInfoCtr } from "../context/useInfoCtr";

export const Saving = () => {
  // rbt 使用useContext
  // const { saving, addSaving } = useInfoCtx();
  // rbt 使用useContainer
  const [state, setState] = useInfoCtr();
  const addSaving = () => {
    setState({ ...state, saving: state.saving + 1000 });
  };
  return (
    <div>
      <h2>Saving:{state.saving}</h2>
      <p>{Math.random()}</p>
      <button onClick={addSaving}>add saving</button>
    </div>
  );
};
