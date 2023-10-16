import { useState, ReactNode, useReducer, Reducer } from "react";
import { createContainer } from "react-tracked";
import { ImmerReducer, useImmerReducer } from "use-immer";

type TProviderProps = {
  children: ReactNode;
};
// rbt:1.创建的container对象是使用useState钩子
/* 
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
*/

// rbt:2.创建的container对象是使用useReducer钩子(躺平版)

/*
 type Taction = {
  type: "addAge" | "addSaving";
};
// bug: 设置action方法:state不可变，每次操作很麻烦
const reducer: Reducer<typeof initalValue, Taction> = (state, action) => {
  switch (action.type) {
    case "addAge":
      return { ...state, age: state.age + 1 };
    case "addSaving":
      return {
        ...state,
        saving: state.saving + 1000,
      };
    default:
      return state;
  }
};
//  初始化状态值
const initalValue = { age: 18, saving: 1000 };

const useValue = () => {
  return useReducer(reducer, initalValue);
};

const infoCtr = createContainer(useValue);
export const InfoCtrProvider = (props: TProviderProps) => {
  return <infoCtr.Provider>{props.children}</infoCtr.Provider>;
};
export const useInfoCtr = () => {
  return infoCtr.useTracked();
}; 
*/

// rbt:3.创建的container对象是使用useImmerReducer钩子(内卷版)
// rbt: 安装immer和use-immer这2个库

type Taction = {
  type: "addAge" | "addSaving";
};
// bug: 设置action方法:使用use-immer库，让state可变
const reducer: ImmerReducer<typeof initalValue, Taction> = (state, action) => {
  switch (action.type) {
    case "addAge":
      state.age += 1;
      break;
    case "addSaving":
      state.saving += 1000;
      break;
    default:
      break;
  }
};
//  初始化状态值
const initalValue = { age: 18, saving: 1000 };

const useValue = () => {
  return useImmerReducer(reducer, initalValue);
};

const infoCtr = createContainer(useValue);
export const InfoCtrProvider = (props: TProviderProps) => {
  return <infoCtr.Provider>{props.children}</infoCtr.Provider>;
};
export const useInfoCtr = () => {
  return infoCtr.useTracked();
};

// container返回的其他值：
// const state = infoCtr.useTrackedState();
// const dispatch = infoCtr.useUpdate();
// const age = infoCtr.useSelector((state) => state.age);
