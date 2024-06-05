import { Link } from "react-router-dom";
import style from '../css/Header.module.css'
const Header = () => {
  return (
    <header className={style.header}>
      <h1>
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/common/logo.svg`}
            alt="logo"
          />
        </Link>
      </h1>
      <div className={style.logout}>
        <nav>
          <Link to="/job-list">잡리스트</Link>
          <Link to="/recruitment-management">구인관리</Link>
          <Link to="/job-seeker-management">구직관리</Link>
        </nav>
        <div className={style.logoutDiv}>
          <Link to="/">
            <i class="fa-regular fa-user"></i>
          </Link>
          <Link to="/">
            <button>회원가입</button>
          </Link>
        </div>
      </div>
      <div className={style.login}>
        <nav>
          <Link to="/job-list">일자리찾기</Link>
          <Link to="/recruitment-management">지원목록</Link>
          <Link to="/job-seeker-management">공고관리</Link>
          <Link to="/job-seeker-management">구인글 작성</Link>
        </nav>
        <div className={style.loginDiv}>
          <Link to="/">
            <i class="fa-regular fa-bell">
              <span></span>
            </i>
          </Link>
          <Link to="/">
            <i class="fa-regular fa-comment-dots">
              <span></span>
            </i>
          </Link>
          <Link to="/">
            <button>S</button>
          </Link>
          <div className={style.mypage}>
            <div className={style.myprofile}>
              <h2>이름</h2>
              <p>abc@asdd.com</p>
            </div>
            <span>빠른메뉴</span>
            <Link to="/">내가 지원한 일자리</Link>
            <Link to="/">구인글 작성</Link>
            <Link to="/">구인글 관리</Link>
            <Link to="/">프로필 수정</Link>
            <Link to="/">회원정보 수정</Link>
            <Link to="/">로그아웃</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
