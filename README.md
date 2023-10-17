## React context 隔空取物技能

####  特点：

1. 只能在React组件中使用
2. 可以避免prop层层传递
3. 当Context任意一个值发生改变，所以后代组件都会重新渲染（复杂项目使用时，有明显的效率问题）
4. 可以使用在小项目中，并能通过第三方插件进行优化

#### 状态数据的使用方法对比：

| props                                                        | context（未封装）                                            | context（封装）                                         | container                                                    | 使用useReducer钩子                                           | 使用useImmerReducer钩子                                      |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 状态提升，把状态值放置在所有组件共同的父组件中， 然后通过props逐层传递给子组件 | 状态提升，把状态值放置在所有组件共同的父组件中，使用context的内置对象provider包裹子组件，通过value属性携带状态，任意子组件直接调用useContext钩子使用 | 将所有context相关的代码进行封装，让状态数据和组件相分离 | 使用第三方库*react-tracked*创建的container对象，使用useState钩子创建状态对象，并通过container携带，使用provider包裹子组件，调用Container.useTracked钩子，获得[state, setState]进行使用 | 使用第三方库*react-tracked*创建的container对象，使用useReducer钩子创建状态数据，同时也创建action方法 | 使用第三方库*react-tracked*创建的container对象，使用第三方库immer和use-immer创建immerReducer，携带状态数据和action方法 |
| useState钩子                                                 | creatContext, Context.provider, useContext                   | 同上                                                    | createContainer，useState，useTracked()                      | createContainer，useReducer,useTracked()                     | createContainer，useImmerReducer，useTracked                 |
| 逐层传递，过程繁琐                                           | 不需逐层传递，谁使用，谁调用useContext钩子                   | 同上                                                    | 不需逐层传递，谁使用，谁调用useTracked()钩子                 | 不需逐层传递，谁使用，谁调用useTracked()钩子                 | 不需逐层传递，谁使用，谁调用useTracked()钩子                 |
| 如果嵌套多层组件，==需要逐层传递==                           | ==状态数据和组件在同一个文件中==，比较混乱                   | 代码结构比较简洁，==但是，所有后代组件都会重新==        | 解决了子组件页面重绘的问题，==但是：需要手写action函数来更行状态，较为繁琐== | 没有页面重绘问题，不需单独手写action方法，但是：更新状态时，仍要保证原状态的不可变，==每次都要用...展开原状态==，才能更新，比较繁琐 | 不需要每次都要用...展开原状态，==直接更改原状态==            |

#### 准备demo项目和组件:

##### 需求：父组件UseContextCop，2个子组件AgeInfo和Saving。AgeInfo包含h1标签(显示age), 按钮标签（更新age）。Saving包含h1标签(显示saving), 按钮标签（更新saving）。

```tsx
export const UseContextCop = () => {
  return (
    <>
      <div className="box">
        <h1>react useContext example</h1>
      </div>
      <div className="box">
        <AgeInfo  />
      </div>
      <div className="box">
        <Saving />
      </div>
    </>
  );
}; 
```

```tsx
export const AgeInfo = () => {
  return (
    <div>
      <h2>age:18</h2>
      <button >Happy birthday</button>
    </div>
  );
};
```

```tsx
export const Saving = () => {
  return (
    <div>
      <h2>saving:1000</h2>
      <button >add saving</button>
    </div>
  );
};
```

#### 方法1：使用props传递状态数据

父组件中创建状态数据和action方法，通过props传递给子组件

```tsx
 export const UseContextCop = () => {
  const [age, setAge] = useState(18);
  const addAge = () => {
    setAge((prevAge) => prevAge + 1);
  };
  const [saving, setSaving] = useState(1000);
  const addSaving = () => {
    setSaving((prev) => prev + 1000);
  };
  return (
      <div className="box">
        <h1>react useContext example</h1>
      </div>
      <div className="box">
        <AgeInfo age={age} addAge={addAge} />
      </div>
      <div className="box">
        <Saving saving={saving} addSaving={addSaving} />
      </div>
  );
};
```

子组件接收props，并使用（以AgeInfo组件为例）

```tsx
type Tprops = {
  age: number;
  addAge: () => void;
}; 
export const AgeInfo = ({ age, addAge }: Tprops) => {
  return (
    <div>
      <h2>age:{age}</h2>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
}; 
```

#### 方法2：使用react Context对象

父组件创建react Context对象，准备好状态数据和action方法，通过provider的value属性，携带数据，并用provider包裹子组件

```tsx
// 定义初始值模型
const initalValue = {
  age: 0,
  addAge: () => {},
  saving: 0,
  addSaving: () => {},
};
// 创建Context对象，并暴露出去，能让子组件引入
export const InfoContext = createContext(initalValue);

export const UseContextCop = () => {
  // 定义状态
  const [age, setAge] = useState(18);
  const addAge = () => {
    setAge((prevAge) => prevAge + 1);
  };
  const [saving, setSaving] = useState(1000);
  const addSaving = () => {
    setSaving((prev) => prev + 1000);
  };
  return (
      // 使用provider包裹，并通过value携带状态数据和方法
      <InfoContext.Provider value={{ age, addAge, saving, addSaving }}>
        <div className="box">
          <h1>react useContext example</h1>
        </div>
        <div className="box">
          <AgeInfo />
        </div>
        <div className="box">
          <Saving />
        </div>
      </InfoContext.Provider>
  );
};
```

子组件直接调用useContext钩子获取状态数据并使用

```tsx
 export const AgeInfo = () => {
  const { age, addAge } = useContext(InfoContext);
  return (
    <div>
      <h2>age:{age}</h2>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
}; 
```

#### 方法3：对Context对象的封装

上面的方法中，状态信息和组件都在同一个文件中，代码结构很杂乱。context相关的代码抽封。

创建新的组件useInfoCtx，来封装context相关的代码

```tsx
import { ReactNode, createContext, useContext, useState } from "react";

type TProviderProps = {
  children: ReactNode;
};
// 定义状态数据模型
const initValue = {
  age: 0,
  addAge: () => {},
  saving: 0,
  addSaving: () => {},
};
// 创建Context对象
const infoCtx = createContext(initValue);
// 创建并暴露InfoCtxProvider钩子，用于在父组件中包裹子组件，同时携带状态数据
export const InfoCtxProvider = (props: TProviderProps) => {
  const [age, setAge] = useState(18);
  const addAge = () => {
    setAge((prev) => prev + 1);
  };
  const [saving, setSaving] = useState(1000);
  const addSaving = () => {
    setSaving((prev) => prev + 1000);
  };
  return (
    <infoCtx.Provider value={{ age, addAge, saving, addSaving }}>
      {props.children}
    </infoCtx.Provider>
  );
};
// 创建并暴露useInfoCtx钩子，用于子组件的调用，返回value携带的数据和方法
export const useInfoCtx = () => {
  return useContext(infoCtx);
};
```

父组件引入InfoCtxProvider钩子，并且包裹子组件

```tsx
export const UseContextCop = () => {
  return (
      <InfoCtxProvider>
        <div className="box">
          <h1>react useContext example</h1>
        </div>
        <div className="box">
          <AgeInfo />
        </div>
        <div className="box">
          <Saving />
        </div>
      </InfoCtxProvider>
  );
};
```

子组件调用useInfoCtx钩子，并使用返回的数据和方法

```tsx
 export const AgeInfo = () => {
  const { age, addAge } = useInfoCtx();
  return (
    <div>
      <h2>age:{age}</h2>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
};
```

==小心有坑：==

==使用context时，当任意一个数据的改变，都会引起其他子组件的重绘，尽管次子组件并未使用到这个变化了的数据==

##### 验证子组件的重绘：给每个子组件中添加随机数，每次重绘都会产生新的随机数

```tsx
 export const AgeInfo = () => {
  const { age, addAge } = useInfoCtx();
  return (
    <div>
      <h2>age:{age}</h2>
      // 添加随机数，验证页面是否重绘
      <p>{Math.random()}</p>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
};
```

```tsx
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
```

#####  ==验证结果：==

##### ==点击AgeInfo组件的Happy birthday按钮时，Saving组件生成新的随机数；点击Saving组件的add saving组件时，AgeInfo组件生成新的随机数==



#### 方法4：使用第三方库*react-tracked*创建的container对象

==使用方法类似于context，但没有重绘问题==

安装库react-tracked

```bash
yarn add react-tracked
```

创建新的文件useInfoCtr，来保存container对象相关的代码。在文件中创建container对象，并传入用useState创建的初始对象。类似context，能使用provider包裹子组件。==注意，不需要创建action方法，不需要使用value携带状态数据==

```tsx
const useValue = () => {
  return useState({ age: 18, saving: 1000 });
};
const infoCtr = createContainer(useValue);
export const InfoCtrProvider = (props: TProviderProps) => {
  return <infoCtr.Provider>{props.children}</infoCtr.Provider>;
};
export const useInfoCtr = () => {
  return infoCtr.useTracked();
};
```

父组件引入InfoCtrProvider钩子，包裹子组件

```tsx
export const UseContextCop = () => {
  return (
      <InfoCtrProvider>
        <div className="box">
          <h1>react useContext example</h1>
        </div>
        <div className="box">
          <AgeInfo />
        </div>
        <div className="box">
          <Saving />
        </div>
      </InfoCtrProvider>
  );
};
```

子组件调用useInfoCtr钩子，并使用，==注意：其返回的是状态数组 [state, setState]==，因为是使用useState钩子创建的初始对象。==需要在子组件中手动创建action方法==，来更新数据

```tsx
export const AgeInfo = () => {
  //ToDo： container对象返回值时state和setState方法
  const [state, setState] = useInfoCtr();
  //todo: 需要手动创建action方法
  const addAge = () => {
    setState({ ...state, age: state.age + 1 });
  };
  return (
    <div>
      <h2>age:{state.age}</h2>
      <p>{Math.random()}</p>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
}; 
```

```tsx
export const Saving = () => {
  //ToDo： container对象返回值时state和setState方法
  const [state, setState] = useInfoCtr();
  //todo: 需要手动创建action方法
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
```

##### ==页面重绘的验证结果：==

##### 点击AgeInfo组件的Happy birthday按钮时，Saving组件==不会生成新的随机数==；点击Saving组件的add saving组件时，AgeInfo组件==也不会生成新的随机数==

-------------------

==每个子组件都要手动创建action方法，好麻烦！！！==

















