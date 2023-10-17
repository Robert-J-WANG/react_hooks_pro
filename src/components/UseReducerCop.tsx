import { useState } from "react";

// 初始化数据
const initiValue = {
  name: "Robert",
  score: 0,
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, setState] = useState(initiValue);
  // 创建action方法
  const increament = () => {
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
        {/* 使用状态和方法 */}
        <button onClick={increament}>👍</button>
        <h2>{state.score}</h2>
        <button onClick={decrement}>👎</button>
      </div>
    </>
  );
};
