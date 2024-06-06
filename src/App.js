import { Routes, Route } from "react-router-dom";
import "./css/Reset.css";
import "./css/Common.css";

import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Findjob from "./pages/Findjob";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/findjob' element={<Findjob />} />
      </Routes>
    </div>
  );
}

export default App;
