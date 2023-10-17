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

##### useuseReducer钩子接收3个arguments：

1. 第1个是reducer action方法对象，用来甚至如何更新状态

2. 第2个是状态数据state

3. 第3个是可选参数

##### useuseReducer钩子返回2个属性：

1. 更新后的状态数据state
2. 更新状态的方法dispatch（可以取名为setState, 但其能使用分发功能）





