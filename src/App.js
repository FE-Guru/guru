import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Findjob from "./pages/Findjob";
import JobWrit from "./pages/JobWrit";
import Mypage from "./pages/Mypage";
import ProfileEdit from "./pages/ProfileEdit";
import AppliedList from "./pages/AppliedList";
import JobOffer from "./pages/JobOffer";
import "./css/Reset.css";
import "./css/Common.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findjob" element={<Findjob />} />
        <Route path="/applied-list" element={<AppliedList />} />
        <Route path="/job-offer" element={<JobOffer />} />
        <Route path="/job-wirt" element={<JobWrit />} />
        <Route path="/mypage" element={<Mypage />}>
          <Route path="profileEdit" element={<ProfileEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
