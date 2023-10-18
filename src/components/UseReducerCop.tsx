import { useReducer, useState } from "react";
import { useImmerReducer } from "use-immer";

/* --------------- //rbt: 1. 使用useState钩子 --------------- */

/*
 // 初始化数据
const initialState = {
  name: "Robert",
  score: 0,
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, setState] = useState(initialState);
  // 创建action方法
  const increment = () => {
    setState((prevState) => ({ ...prevState, score: prevState.score + 1 }));
  };
  const decrement = () => {
    setState((prevState) => ({ ...prevState, score: prevState.score - 1 }));
  };
  return (
    <>
      <div className="box">
        <h1>{state.name}</h1>
      </div>
      <div className="box">
        <button onClick={increment}>👍</button>
        <h2>{state.score}</h2>
        <button onClick={decrement}>👎</button>
      </div>
    </>
  );
};
 
*/

/* -------------- //rbt: 2. 使用useReducer钩子 -------------- */
/* 
type Taction = {
  type: "increment" | "decrement";
  payload: number;
};

// 初始化数据
const initialState = {
  name: "Robert",
  score: 0,
};
const reducer = (state: typeof initialState, action: Taction) => {
  switch (action.type) {
    case "increment":
      return { ...state, score: state.score + action.payload };
    case "decrement":
      return { ...state, score: state.score - action.payload };
    default:
      return state;
  }
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="box">
        <h1>{state.name}</h1>
      </div>
      <div className="box">
        <button onClick={() => dispatch({ type: "increment", payload: 2 })}>
          👍
        </button>
        <h2>{state.score}</h2>
        <button onClick={() => dispatch({ type: "decrement", payload: 2 })}>
          👎
        </button>
      </div>
    </>
  );
}; 
*/

/* ------------ //rbt: 3. 使用useImmerReducer钩子 ----------- */
type TAction = {
  type: "increment" | "decrement";
  payload: number;
};
const initialState = {
  name: "Robert",
  score: 0,
};
const reducer = (state: typeof initialState, action: TAction) => {
  switch (action.type) {
    case "increment":
      state.score += action.payload;
      break;
    case "decrement":
      state.score += action.payload;
      break;
    default:
      break;
  }
};

export const UseReducerCop = () => {
  // 创建状态
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <>
      <div className="box">
        <h1>{state.name}</h1>
      </div>
      <div className="box">
        <button onClick={() => dispatch({ type: "increment", payload: 2 })}>
          👍
        </button>
        <h2>{state.score}</h2>
        <button onClick={() => dispatch({ type: "decrement", payload: 2 })}>
          👎
        </button>
      </div>
    </>
  );
};
