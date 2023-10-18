import { useReducer, useState } from "react";
import { useImmerReducer } from "use-immer";

/* --------------- //rbt: 1. 使用useState钩子 --------------- */

/*
 // 初始化数据
const initState = {
  name: "Robert",
  score: 0,
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, setState] = useState(initState);
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
const initState = {
  name: "Robert",
  score: 0,
};
const reducer = (state: typeof initState, action: Taction) => {
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
  const [state, dispatch] = useReducer(reducer, initState);

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
/* 
type TAction = {
  type: "increment" | "decrement";
  payload: number;
};
const initState = {
  name: "Robert",
  score: 0,
};
const reducer = (state: typeof initState, action: TAction) => {
  switch (action.type) {
    case "increment":
      state.score += action.payload;
      break;
    case "decrement":
      state.score -= action.payload;
      break;

    default:
      break;
  }
};

export const UseReducerCop = () => {
  // 创建状态
  const [state, dispatch] = useImmerReducer(reducer, initState);
  console.log(typeof state);

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

/* --------//rbt: 4. 使用useReducer钩子的第三个参数initialFnc的使用 --------*/
/* 
type TAction = {
  type: "increment" | "decrement";
  payload: number;
};
const initState = {
  name: "Robert",
  score: 0,
};
const reducer = (state: typeof initState, action: TAction) => {
  switch (action.type) {
    case "increment":
      state.score += action.payload;
      break;
    case "decrement":
      state.score -= action.payload;
      break;

    default:
      break;
  }
  // 将state对象转换为字符串格式，存储到本地
  localStorage.setItem("my-state", JSON.stringify(state));
};

// 设置useImmerReducer的第三个参数，用来性能优化
const initAction = () => {
  // 获取本地存储
  const res = JSON.parse(localStorage.getItem("my-state")!);

  if (!!res) {
    // 如果有本地存储，这返回本地存储的值作为状态的初始值
    return res;
  } else return initState; // 否则，则使用原先设置的初始状态
};

export const UseReducerCop = () => {
  // 设置useImmerReducer的第三个参数，用于提升性能
  const [state, dispatch] = useImmerReducer(reducer, initState, initAction);
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

/* --------//rbt: 5. useReducer钩子如何处理异步操作 --------*/

// 1. 在dispatch函数外部进行异步操作
// 2. 将dispatch函数和异步操作包裹进一个自定义的dispatch函数
// 3. 直接使用自定义的dispatch函数

type TAction = {
  type: "increment" | "decrement";
  payload: number;
};
const initState = {
  name: "Robert",
  score: 0,
};
const reducer = (state: typeof initState, action: TAction) => {
  switch (action.type) {
    case "increment":
      state.score += action.payload;
      break;
    case "decrement":
      state.score -= action.payload;
      break;
    default:
      break;
  }
  // 将state对象转换为字符串格式，存储到本地
  localStorage.setItem("my-state", JSON.stringify(state));
};

// 设置useImmerReducer的第三个参数，用来性能优化
const initAction = () => {
  // 获取本地存储
  const res = JSON.parse(localStorage.getItem("my-state")!);
  if (!!res) {
    // 如果有本地存储，这返回本地存储的值作为状态的初始值
    return res;
  } else return initState; // 否则，则使用原先设置的初始状态
};

export const UseReducerCop = () => {
  // 设置useImmerReducer的第三个参数，用于提升性能
  const [state, dispatch] = useImmerReducer(reducer, initState, initAction);
  // 自定义dispatch函数
  const wrapedDispatch = async (action: TAction) => {
    const audio = new Audio();
    switch (action.type) {
      case "increment":
        audio.src =
          "https://www.codehamster.com/wp-content/uploads/2022/06/up1.mp3";
        break;
      case "decrement":
        audio.src =
          "https://www.codehamster.com/wp-content/uploads/2022/06/down1.mp3";
        break;
      default:
        break;
    }
    await audio.play(); // audio.play()是异步操作，返回的是一个promise对象，使用async await
    dispatch(action);
  };
  return (
    <>
      <div className="box">
        <h1>{state.name}</h1>
      </div>
      <div className="box">
        <button
          onClick={() => wrapedDispatch({ type: "increment", payload: 2 })}
        >
          👍
        </button>
        <h2>{state.score}</h2>
        <button
          onClick={() => wrapedDispatch({ type: "decrement", payload: 2 })}
        >
          👎
        </button>
      </div>
    </>
  );
};
