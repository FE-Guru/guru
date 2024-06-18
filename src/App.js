import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Findjob from "./pages/Findjob";
import JobWrite from "./pages/JobWrite";
import JobEdit from "./pages/JobEdit";
import Mypage from "./pages/Mypage";
import ProfileEdit from "./pages/ProfileEdit";
import PersonalEdit from "./pages/PersonalEdit";
import AppliedList from "./pages/AppliedList";
import JobOffer from "./pages/JobOffer";
import JobDetail from "./pages/JobDetail";
import AcctDelete from "./pages/AcctDelete";
import "./css/Reset.css";
import "./css/Common.css";
import "swiper/css";
import "swiper/css/pagination";
import "./css/Swiper.css";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/findjob' element={<Findjob />} />
        <Route path='/applied-list' element={<AppliedList />} />
        <Route path='/job-offer' element={<JobOffer />} />
        <Route path='/job-write' element={<JobWrite />} />
        <Route path='/job-edit' element={<JobEdit />} />
        <Route path='/job-detail' element={<JobDetail />} />
        <Route path='/mypage' element={<Mypage />}>
          <Route path='profileEdit' element={<ProfileEdit />} />
          <Route path='personalEdit' element={<PersonalEdit />} />
          <Route path='acctDelete' element={<AcctDelete />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
