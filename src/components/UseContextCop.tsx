import { InfoCtxProvider } from "../context/useInfoCtx";
import { AgeInfo } from "./AgeInfo";
import { createContext, useState } from "react";
import { Saving } from "./Saving";
import { InfoCtrProvider } from "../context/useInfoCtr";

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
/* 
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
 */
// bug : 使用useContext时，当state中的任意一个属性值发生变化时，
// bug : 都会引发相关页面的重绘，影响效率
// todo : 解决方案：使用第三方库react-tracked

//rbt 4. 使用第三方库react-tracked创建的container对象

export const UseContextCop = () => {
  return (
    <>
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
    </>
  );
};
