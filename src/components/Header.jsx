import { Link } from "react-router-dom";
import style from "../css/Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <h1>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/img/common/logo.svg`} alt="logo" />
        </Link>
      </h1>

      <div className={style.gnb}>
        <nav>
          <Link to="/findjob">일자리찾기</Link>
          <Link to="/">지원목록</Link>
          <Link to="/">공고관리</Link>
          <Link to="/job-wirt">구인글 작성</Link>
        </nav>

        <div className={style.loginDiv}>
          <button>
            <i className="fa-regular fa-bell"></i>
            <span></span>
          </button>
          <button>
            <i className="fa-regular fa-comment-dots"></i>
            <span></span>
          </button>
          <div className={style.thumb}>
            <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="logo" />
          </div>
        </div>

        <div className={style.logoutDiv}>
          <Link to="/login" className={style.goLogin}>
            <i className="fa-regular fa-user"></i>
          </Link>
          <Link to="/signup" className={`${style.goJoin} btn primary yellow`}>
            회원가입
          </Link>
        </div>
      </div>

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
    </header>
  );
};

export default Header;
