import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCateField } from "../store/filter";
import MainSlide from "../components/MainSlide";
import style from "../css/Main.module.css";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fieldLinkClick = (field) => {
    dispatch(setCateField(field));
    navigate("/findjob");
  };
  return (
    <main className="main">
      <MainSlide />
      <section className={`${style.category} mw`}>
        <div onClick={() => fieldLinkClick("배포/체험단")}>
          <img src={`/img/common/cate1.png`} alt="cate1" />
          체험단
        </div>
        <div onClick={() => fieldLinkClick("SNS")}>
          <img src={`/img/common/cate2.png`} alt="cate1" />
          SNS
        </div>
        <div onClick={() => fieldLinkClick("대행업무")}>
          <img src={`/img/common/cate3.png`} alt="cate1" />
          대행업무
        </div>
        <div onClick={() => fieldLinkClick("서비스")}>
          <img src={`/img/common/cate4.png`} alt="cate1" />
          서비스
        </div>
        <div onClick={() => fieldLinkClick("참여형")}>
          <img src={`/img/common/cate4.png`} alt="cate1" />
          참여형
        </div>
      </section>
    </main>
  );
};

export default Main;
