import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCateField } from "../store/filter";
import { setCateType } from "../store/findjob";
import MainSlide from "../components/MainSlide";
import MainOnline from "../components/MainOnline";
import MainOffline from "../components/MainOffline";
import style from "../css/Main.module.css";

const Main = () => {
  const cateType = useSelector((state) => state.findjob.cateType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldLinkClick = (field, cateType) => {
    dispatch(setCateField(field));
    dispatch(setCateType({ cateType }));
    navigate("/findjob");
  };
  const goFindJob = (cateType) => {
    dispatch(setCateField("all"));
    dispatch(setCateType({ cateType }));
    navigate("/findjob");
  };

  return (
    <main className={`${style.main} main`}>
      <MainSlide />
      <section className={`${style.category} mw`}>
        <div onClick={() => fieldLinkClick("배포/체험단", "onLine")}>
          <img src={`/img/common/cate1.png`} alt="cate1" />
          체험단
        </div>
        <div onClick={() => fieldLinkClick("SNS", "onLine")}>
          <img src={`/img/common/cate2.png`} alt="cate1" />
          SNS
        </div>
        <div onClick={() => fieldLinkClick("대행업무", "onLine")}>
          <img src={`/img/common/cate3.png`} alt="cate1" />
          대행업무
        </div>
        <div onClick={() => fieldLinkClick("서비스", "onLine")}>
          <img src={`/img/common/cate4.png`} alt="cate1" />
          서비스
        </div>
        <div onClick={() => fieldLinkClick("참여형", "onLine")}>
          <img src={`/img/common/cate4.png`} alt="cate1" />
          참여형
        </div>
      </section>
      <section className={`${style.MainOnline}`}>
        <h2>
          <img src={`${process.env.PUBLIC_URL}/img/common/main_h2_online.svg`} alt="logo" />
          일자리 찾기
        </h2>
        <div className="mw">
          <MainOnline />
          <button onClick={() => goFindJob("onLine")} className="btn primary yellow">
            더보기 +
          </button>
        </div>
      </section>
      <section className={`${style.MainOffline}`}>
        <h2>
          <img src={`${process.env.PUBLIC_URL}/img/common/main_h2_offline.svg`} alt="logo" />
          일자리 찾기
        </h2>
        <div className="mw">
          <MainOffline />
          <button onClick={() => goFindJob("offLine")} className="btn primary green">
            더보기 +
          </button>
        </div>
      </section>
    </main>
  );
};

export default Main;
