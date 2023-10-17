import { useReducer, useState } from "react";

//rbt: 1. 使用useState钩子

/*
 // 初始化数据
const initiValue = {
  name: "Robert",
  score: 0,
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, setState] = useState(initiValue);
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
//rbt: 2. 使用useReducer钩子
type Taction = {
  type: "increment" | "decrement";
  overload: number;
};

// 初始化数据
const initiValue = {
  name: "Robert",
  score: 0,
};
const reducer = (state: typeof initiValue, action: Taction) => {
  switch (action.type) {
    case "increment":
      return { ...state, score: state.score + action.overload };
    case "decrement":
      return { ...state, score: state.score - action.overload };
    default:
      return state;
  }
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, dispatch] = useReducer(reducer, initiValue);

  return (
    <>
      <div className="box">
        <h1>{state.name}</h1>
      </div>
      <div className="box">
        <button onClick={() => dispatch({ type: "increment", overload: 2 })}>
          👍
        </button>
        <h2>{state.score}</h2>
        <button onClick={() => dispatch({ type: "decrement", overload: 2 })}>
          👎
        </button>
      </div>
    </>
  );
};
