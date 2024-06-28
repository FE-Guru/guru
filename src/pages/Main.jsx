import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCateField, setCateTalent } from "../store/filter";
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
    dispatch(setCateTalent("all"));
    navigate("/findjob");
  };
  const talentLinkClick = (talent, cateType) => {
    dispatch(setCateField("all"));
    dispatch(setCateType({ cateType }));
    dispatch(setCateTalent(talent));
    navigate("/findjob");
  };
  const goFindJob = (cateType) => {
    dispatch(setCateField("all"));
    dispatch(setCateTalent("all"));
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
          <button onClick={() => goFindJob("onLine")} className="btn primary">
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
      <section className={style.talent}>
        <h2>
          재능별 카테고리
          <span>
            당신의 전문성을 기반으로
            <br className={style.smView} /> 다양한 일거리를 찾아보세요
          </span>
        </h2>
        <div className="mw">
          <div onClick={() => talentLinkClick("디자인", "onLine")}>
            <strong>디자인</strong>
            <p>
              # 웹·모바일 디자인
              <br /># 그래픽·영상·편집
            </p>
            <img src={`${process.env.PUBLIC_URL}/img/common/mcate1.png`} alt="디자인" />
          </div>
          <div onClick={() => talentLinkClick("IT·기술", "onLine")}>
            <strong>IT·기술</strong>
            <p>
              # 프로그래밍
              <br /># 시스템·네트워크
            </p>
            <img src={`${process.env.PUBLIC_URL}/img/common/mcate2.png`} alt="교육·강사" />
          </div>
          <div onClick={() => talentLinkClick("대행업무", "offLine")}>
            <strong>교육·강사</strong>
            <p>
              # 입시 #외국어
              <br /># 파견강사
            </p>
            <img src={`${process.env.PUBLIC_URL}/img/common/mcate3.png`} alt="서비스" />
          </div>
          <div onClick={() => talentLinkClick("서비스", "offLine")}>
            <strong>서비스</strong>
            <p>
              # 배달 # 대행업무
              <br />
              #CS
            </p>
            <img src={`/img/common/mcate4.png`} alt="cate1" />
          </div>
        </div>
      </section>
      <section className={style.guruBanner}>
        <div className="mw">
          <img src={`${process.env.PUBLIC_URL}/img/common/guru_banner.png`} alt="베너이미지" />
        </div>
      </section>
    </main>
  );
};

export default Main;
