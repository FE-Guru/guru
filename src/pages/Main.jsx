import { Link } from "react-router-dom";
import MainSlide from "../components/MainSlide";
import style from "../css/Main.module.css";

const Main = () => {
  return (
    <main className="main">
      <MainSlide />

      <section className={`${style.category} mw`}>
        <Link to="">
          <img src={`/img/common/cate1.png`} alt="cate1" />
          체험단
        </Link>
        <Link to="/">
          <img src={`/img/common/cate2.png`} alt="cate2" />
          SNS
        </Link>
        <Link to="/">
          <img src={`/img/common/cate3.png`} alt="cate3" />
          대행업무
        </Link>
        <Link to="/">
          <img src={`/img/common/cate4.png`} alt="cate4" />
          서비스
        </Link>
        <Link to="/">
          <img src={`/img/common/cate5.png`} alt="cate5" />
          참여형
        </Link>
      </section>
    </main>
  );
};

export default Main;
