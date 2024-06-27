import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../store/userStore";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import Profile from "../components/Profile";
import style from "../css/Header.module.css";

const Header = () => {
  const [isMypage, setIsMypage] = useState(false);
  const [isIconChanged, setIsIconChanged] = useState(false);
  const [modal, setModal] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user.user);
  const emailID = user ? user?.emailID : null;
  const nickName = user ? user?.nickName : null;
  const certified = user ? user?.certified : null;

  const showPopup = (content) => {
    setModal(content);
  };
  const closePopup = () => {
    setModal(null);
  };

  //fetchProfile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("로그인하지 않은 상태입니다.");
          return;
        }
        const response = await fetch(`${url}/profile`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userInfo = await response.json();
          dispatch(userState(userInfo));
          if (certified === false) {
            showPopup("profile");
          }
        } else if (response.status === 401) {
          throw new Error("로그인이 필요합니다.");
        } else {
          console.error("fetchProfile 에러");
        }
      } catch (error) {
        return;
      }
    };
    fetchProfile();
  }, [dispatch, location, certified]);

  const logout = (e) => {
    e.preventDefault();
    fetch(`${url}/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(userState(null));
  };

  const mypageClick = () => {
    setIsIconChanged(!isIconChanged);
    setIsMypage(!isMypage);
  };

  useEffect(() => {
    setIsMypage(false);
  }, [location]);

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
          <Link to="/applied-list">지원목록</Link>
          <Link to="/job-offer">공고관리</Link>
          <Link to="/job-write">구인글 작성</Link>
        </nav>

        {emailID ? (
          <div className={style.loginDiv}>
            <div className={style.thumb} onClick={mypageClick}>
              <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="logo" />
            </div>
            <div className={style.mypage} style={{ display: isMypage ? "flex" : "none" }}>
              <span>현재 로그인 계정</span>
              <div className={style.myprofile}>
                <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="logo" />
                <div>
                  <h2>{nickName ? nickName : "닉네임을 설정해주세요"}</h2>
                  <p>{emailID}</p>
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
                <Link to="/findjob">일자리 찾기</Link>
                <Link to="/applied-list">내가 지원한 일자리</Link>
                <Link to="/job-write">구인글 작성</Link>
                <Link to="/job-offer">구인글 관리</Link>
              </div>
              <div className={style.cate2}>
                <Link to="/mypage/profileedit">프로필 수정</Link>
                <Link to="/mypage/personaledit">회원정보 수정</Link>
                <Link to="/logout" onClick={logout}>
                  로그아웃
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.logoutDiv}>
            <Link to="/login" className={style.goLogin}>
              <i className="fa-regular fa-user"></i>
            </Link>
            <Link to="/signup" className={`${style.goJoin} btn primary yellow`}>
              회원가입
            </Link>
          </div>
        )}
      </div>
      <button className={style.ham} onClick={mypageClick}>
        <i className={isIconChanged ? "fa-solid fa-x" : "fa-solid fa-bars"}></i>
      </button>
      {modal && (
        <Modal show={modal !== null} onclose={closePopup} type={"profile"}>
          {modal === "profile" && <Profile show={modal !== null} onclose={closePopup} mode={"등록"} modal={true} />}
        </Modal>
      )}
    </header>
  );
};

export default Header;
