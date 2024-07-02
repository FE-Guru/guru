import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../store/userStore";
import { url } from "../store/ref";
import { useAuth } from "../assets/AuthContext";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import Profile from "../components/Profile";
import style from "../css/Header.module.css";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isMypage, setIsMypage] = useState(false);
  const [isIconChanged, setIsIconChanged] = useState(false);
  const [modal, setModal] = useState(null);
  const [modalAlert, setModalAlert] = useState(null);
  const [visible, setVisible] = useState(true);
  const emailID = user ? user?.emailID : null;
  const nickName = user ? user?.nickName : null;
  const certified = user ? user?.certified : null;
  const { isAuthenticated, isLogout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("로그인하지 않은 상태입니다.");
          setLoading(false);
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
        } else {
          const errorData = await response.json();
          console.error("fetchProfile 에러:", errorData.message);
          setModalAlert("invalidaccess");
        }
      } catch (error) {
        console.error("fetchProfile 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch, location]);

  useEffect(() => {
    if (certified === false) {
      showPopup("profile");
    }
  }, [certified]);

  useEffect(() => {
    setIsMypage(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    const windowWidth = () => {
      if (window.innerWidth >= 990) {
        setIsMypage(false);
        setIsIconChanged(false);
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
    windowWidth();
    window.addEventListener("resize", windowWidth);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", windowWidth);
    };
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        dispatch(userState(null));
        isLogout();
        window.location.href = "/";
      } else {
        console.error("로그아웃 실패:", response.statusText);
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  const closeAlert = () => {
    setModalAlert(null);
  };
  const showPopup = (content) => {
    setModal(content);
  };
  const closePopup = () => {
    setModal(null);
  };
  const mypageClick = () => {
    setIsIconChanged(!isIconChanged);
    setIsMypage(!isMypage);
  };

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
          <Link to="/job-offer">구인관리</Link>
          <Link to="/job-write">구인글 작성</Link>
        </nav>
        {isAuthenticated ? (
          <div className={style.loginDiv}>
            <div className={style.thumb} onClick={mypageClick}>
              {!user?.image ? <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" /> : <img src={`${url}/${user?.image}`} alt="프로필 이미지" />}
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

      <div className={style.mypage} style={{ display: isMypage && visible ? "flex" : "none" }}>
        {isAuthenticated ? (
          <>
            <span>현재 로그인 계정</span>
            <div className={style.myprofile}>
              <div className={style.profileThumb}>
                {!user?.image ? <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" /> : <img src={`${url}/${user?.image}`} alt="프로필 이미지" />}
              </div>
              <div>
                <h2>{nickName ? nickName : "닉네임을 설정해주세요"}</h2>
                <p>{emailID}</p>
              </div>
            </div>
          </>
        ) : (
          <div className={style.logoutBtn}>
            <Link to="/signup" className={`${style.goJoin} btn primary yellow`}>
              회원가입
            </Link>
            <Link to="/login" className={`${style.goLogin} btn primary yellow`}>
              로그인
            </Link>
          </div>
        )}
        <ul>
          {isAuthenticated ? <li>빠른메뉴</li> : <li>메뉴</li>}
          <li>
            <Link to="/findjob">일자리 찾기</Link>
          </li>
          <li>
            <Link to="/applied-list">내가 지원한 일자리</Link>
          </li>
          <li>
            <Link to="/job-write">구인글 작성</Link>
          </li>
          <li>
            <Link to="/job-offer">구인 관리</Link>
          </li>
        </ul>
        {isAuthenticated && (
          <ul>
            <li>
              <Link to="/mypage/profileedit">프로필 수정</Link>
            </li>
            <li>
              <Link to="/mypage/personaledit">회원정보 수정</Link>
            </li>
            <li>
              <Link to="/logout" onClick={logout}>
                로그아웃
              </Link>
            </li>
          </ul>
        )}
      </div>
      {modal && (
        <Modal show={modal !== null} onclose={closePopup} type={"profile"}>
          {modal === "profile" && <Profile show={modal !== null} onclose={closePopup} mode={"등록"} modal={true} />}
        </Modal>
      )}
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "invalidaccess" && <ModalAlert close={closeAlert} desc={"로그인 중 에러가 발생하였습니다."} error={true} confirm={false} />}
        </Modal>
      )}
    </header>
  );
};

export default Header;
