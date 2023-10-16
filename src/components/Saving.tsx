import React from "react";
import { useInfoCtx } from "../context/useInfoCtx";

export const Saving = () => {
  const { saving, addSaving } = useInfoCtx();
  return (
    <div>
      <h2>Saving:{saving}</h2>
      <p>{Math.random()}</p>
      <button onClick={addSaving}>add saving</button>
    </div>
  );
};
