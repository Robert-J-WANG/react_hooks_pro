## React useReducer 

#### 特点：

1. 和useState一样，useReducer也是react提供的管理局部状态的原生hook，但是，其功能远比useState强大

​	

#### 准备demo项目和组件:

准备一个组件UseReducerCop，实现用户Robert 的点赞数，组件中有一个h2标签显示当前点赞数，还有2个按钮，点击按赞按钮，点赞数加1，点击按踩按钮，点赞数减1

```tsx
export const UseReducerCop = () => {
  return (
    <>
      <div className="box">
        <h1>Robert</h1>
      </div>
      <div className="box">
        <button>👍</button>
        <span>0</span>
        <button>👎</button>
      </div>
    </>
  );
};
```

#### 方法1：使用useState实现，非常容易实现

```tsx
import { useState } from "react";

// 初始化数据
const initialState = {
  name: "Robert",
  score: 0,
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, setState] = useState(initialState);
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
        <h1>Robert</h1>
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
```

#### 方法2：如何使用useReducer实现呢？

##### useReducer钩子接收3个参数：

1. 第1个是reducer： action方法对象，用来设置如何更新状态

2. 第2个是状态数据initialState:  状态数据的初始化，是一个状态对象

3. 第3个是可选参数 ( 后面的方法中会使用到......)

    

##### useReducer钩子返回2个属性：

1. 更新后的状态数据state对象
2. 更新状态的方法dispatch对象（可以取名为setState, 但其能使用分发功能）

```tsx
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
```



#### 方法3：升级版useImmerReducer

##### useReducer缺陷：

使用useReducer，在action方法里更新状态时，要遵循状态的不可变性，因此，每次使用到状态，都需要...拷贝原状态，再进行修改替换，如何状态时多层嵌套时，使用起来非常繁琐。

##### 解决方案：

使用第三方库immer和use-immer提供的useImmerReducer钩子替换react原生钩子useReducer

首先安装库

```bash
yarn add immer use-immer
```

使用useImmerReducer，并且，在action中直接修改原状态

```tsx
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
```



