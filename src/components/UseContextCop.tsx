import { InfoCtxProvider } from "../context/useInfoCtx";
import { AgeInfo } from "./AgeInfo";
import { createContext, useState } from "react";
import { Saving } from "./Saving";

//rbt: 1. 通过props 的方式，将状态数据传递给子组件
/* 
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
    <>
      <div className="box">
        <h1>react useContext example</h1>
      </div>
      <div className="box">
        <AgeInfo age={age} addAge={addAge} />
      </div>
      <div className="box">
        <Saving saving={saving} addSaving={addSaving} />
      </div>
    </>
  );
}; 
*/

// rbt 2. 使用useContext传递state数据到任意子组件( 未封装 )
/* 
// 定义初始值
const initalValue = {
  age: 0,
  addAge: () => {},
  saving: 0,
  addSaving: () => {},
};
// 创建Context对象
const InfoContext = createContext(initalValue);
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
    <>
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
    </>
  );
};
 */

// rbt 3. 使用useContext传递state数据到任意子组件（ 封装 ）
export const UseContextCop = () => {
  return (
    <>
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
    </>
  );
};
