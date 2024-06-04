import { Routes, Route } from "react-router-dom";
import "./css/Reset.css";
import "./css/Common.css";

import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
