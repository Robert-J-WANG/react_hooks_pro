import React from "react";
import { useInfoCtx } from "../context/useInfoCtx";
import { useInfoCtr } from "../context/useInfoCtr";

// rbt 1. 使用useContext
/*
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
*/

// rbt 2. 使用useContainer (useState)
/* 
export const Saving = () => {
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
*/

// rbt 3. 使用useContainer (useReducer)躺平版
export const Saving = () => {
  const [state, dispatch] = useInfoCtr();
  return (
    <div>
      <h2>Saving:{state.saving}</h2>
      <p>{Math.random()}</p>
      <button onClick={() => dispatch({ type: "addSaving" })}>
        add saving
      </button>
    </div>
  );
};
