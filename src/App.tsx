import { NavLink, Route, Routes } from "react-router-dom";
import { UseContextCop } from "./components/UseContextCop";
import { UseReducerCop } from "./components/UseReducerCop";

function App() {
  return (
    <>
      <div className="container">
        <div className="box">
          <h1>
            <NavLink to="/useContext">useContext</NavLink>
          </h1>
          <h1>
            <NavLink to="/useReducer">useReducer</NavLink>
          </h1>
        </div>

        <Routes>
          <Route path="/useContext" element={<UseContextCop />} />
          <Route path="/useReducer" element={<UseReducerCop />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
