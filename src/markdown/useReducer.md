## React useReducer 一气化三清技能

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
const initState = {
  name: "Robert",
  score: 0,
};
export const UseReducerCop = () => {
  // 创建状态
  const [state, setState] = useState(initState);
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

1. 第1个是reducer函数： 用来设置如何更新状态

2. 第2个是状态数据initialState:  状态数据的初始化，是一个状态对象

3. 第3个是initializer:可选参数 ( 后面的方法中会使用到......)

    

##### useReducer钩子返回2个属性：

1. 更新后的状态数据state对象
2. 更新状态的方法dispatch（可以取名为setState, 但其能使用分发功能）, 需要传入具体的实参action对象。该dispatch函数执行触发action，带来状态的变化

```tsx
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

#### 方法4：useReducer的第三个参数的使用

1. useReducer的第三个参数initializer （initialFnc)，惰性初始化，提升性能(调用的时候初始化数据)
2. 它是一个回调函数且一定要返回一个对象数据，目标就是做性能优化
3. 实际应用不多，下面以存储状态到本地功能为例(刷新页面时，以本地存储的状态数据为初始数据渲染)

```tsx
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
```

#### 方法5：useReducer如何实现异步操作？

##### 缺陷：

useReducer本身无法实现异步功能，因为去dispatch方法就是纯函数结构，无法在dispatch里面编写异步函数

##### 解决方案：

**1.** 在dispatch函数外部进行异步操作，编写异步函数

**2.** 将useReducer的dispatch函数和异步函数包裹进一个自定义的dispatch函数

**3.** 直接使用自定义的dispatch函数

##### 案例功能：

给点赞和点踩按钮添加点击音乐（使用外部音乐源，播放音乐是异步功能）

```tsx
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
```



#### 使用的总结：

1. 项目复杂，涉及到全局状态时，使用第三方状态管理库：redux, mobx, zustand

2. 只涉及到组件相关的状态时，可以使用react提供的原生钩子useState和useReducer

3. 状态只是简单的类型，比如number,  string, boolen时，使用useState钩子更方便

4. 稍微复杂的状态时，使用useReducer钩子

5. useReducer的第三个参数能优化性能

6. 使用第三方库immer和use-immmer提供的useImmerReducer钩子，能直接更改原状态

7. 异步操作时，单独封装一个自定义的dispatch函数，在自定义的dispatch函数中分别进行异步操作和useReducer的dispatch方法的调用，

    并且，在组件中直接使用自定义的dispatch函数

8. 需要多组件传递状态时，可以配合useContext钩子使用

#### 最优方案：

useImmerReducer（直接修改原状态） + wrapedDispatch（自定义的dispatch，需要异步操作的话）+ useContainer(页面不重绘，来自第三方库*react-tracked*， 需要多组件传递状态的话)



