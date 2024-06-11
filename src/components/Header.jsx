import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../css/Header.module.css";

const Header = () => {
  const [isMypage, setIsMypage] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 변수
  const [isIconChanged, setIsIconChanged] = useState(false); // 아이콘 상태 변수

  const mypageClick = () => {
    setIsIconChanged(!isIconChanged); // 아이콘 상태 변경
    setIsMypage(!isMypage); // 마이페이지 상태 반전
  };

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

      <div className={style.gnb}>
        <nav>
          <Link to="/findjob">일자리찾기</Link>
          <Link to="/">지원목록</Link>
          <Link to="/">공고관리</Link>
          <Link to="/">구인글 작성</Link>
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
          <div className={style.thumb} onClick={mypageClick}>
            <img
              src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`}
              alt="logo"
            />
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
        <button>
          <i className="fa-regular fa-bell"></i>
        </button>
        <button onClick={mypageClick}>
          <i
            className={isIconChanged ? "fa-solid fa-x" : "fa-solid fa-bars"}
          ></i>
        </button>
      </div>
      <div
        className={style.mypage}
        style={{ display: isMypage ? "flex" : "none" }}
      >
        <span>현재 로그인 계정</span>
        <div className={style.myprofile}>
          <img
            src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`}
            alt="logo"
          />
          <div>
            <h2>이름</h2>
            <p>abc@asdd.com</p>
          </div>
        </div>
        <div className={style.logoutBtn}>
          <Link to="/signup" className={`${style.goJoin} btn primary yellow`}>
            회원가입
          </Link>
          <Link to="/login" className={`${style.goLogin} btn primary yellow`}>
            로그인
          </Link>
        </div>
        <div className={style.cate1}>
          <span>빠른메뉴</span>
          <span>메뉴</span>
          <Link to="/">일자리 찾기</Link>
          <Link to="/">내가 지원한 일자리</Link>
          <Link to="/">구인글 작성</Link>
          <Link to="/">구인글 관리</Link>
        </div>
        <div className={style.cate2}>
          <Link to="/">프로필 수정</Link>
          <Link to="/">회원정보 수정</Link>
          <Link to="/">로그아웃</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
