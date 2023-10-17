import { useContext } from "react";
// import { InfoContext } from "./UseContextCop";
import { InfoCtxProvider, useInfoCtx } from "../context/useInfoCtx";
import { useInfoCtr } from "../context/useInfoCtr";

/* 
type Tprops = {
  age: number;
  addAge: () => void;
}; 
*/
// rbt 1. 使用porps
/*
 export const AgeInfo = ({ age, addAge }: Tprops) => {
  return (
    <div>
      <h2>age:{age}</h2>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
}; 
*/

// rbt 2. 使用useContext
/*
 export const AgeInfo = () => {
  const { age, addAge } = useContext(InfoContext);
  return (
    <div>
      <h2>age:{age}</h2>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
}; 
*/

// rbt 3. 使用useContext的封装
/*
 export const AgeInfo = () => {
  const { age, addAge } = useInfoCtx();
  return (
    <div>
      <h2>age:{age}</h2>
      <p>{Math.random()}</p>
      <button onClick={addAge}>Happy birthday</button>
    </div>
  );
};
 */

// rbt 4. 使用第三方库react-tracked创建的container对象
/* 
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
*/

// rbt 5. 使用useReducer初始化的container对象（躺平版）
export const AgeInfo = () => {
  //ToDo： container对象返回值时state和setState方法
  const [state, dispatch] = useInfoCtr();
  //todo: 不需要手动创建action方法

  return (
    <div>
      <h2>age:{state.age}</h2>
      <p>{Math.random()}</p>
      <button onClick={() => dispatch({ type: "addAge" })}>
        Happy birthday
      </button>
    </div>
  );
};
