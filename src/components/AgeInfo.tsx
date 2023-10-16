import { useContext } from "react";
// import { InfoContext } from "./UseContextCop";
import { InfoCtxProvider, useInfoCtx } from "../context/useInfoCtx";

// type Tprops = {
//   age: number;
//   addAge: () => void;
// };
// rbt 1. 使用porps
// export const AgeInfo = ({ age, addAge }: Tprops) => {
//   return (
//     <div>
//       <h2>age:{age}</h2>
//       <button onClick={addAge}>Happy birthday</button>
//     </div>
//   );
// };

// rbt 2. 使用useContext
// export const AgeInfo = () => {
//   const { age, addAge } = useContext(InfoContext);
//   return (
//     <div>
//       <h2>age:{age}</h2>
//       <button onClick={addAge}>Happy birthday</button>
//     </div>
//   );
// };

// rbt 3. 使用useContext的封装
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
