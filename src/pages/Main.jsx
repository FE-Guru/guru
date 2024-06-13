import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import style from "../css/Main.css";
import "swiper/css";



const Main = () => {
  return (
    <section>
      <div className={style.Swiper}>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          // autoplay={{ delay: 5000, disableOnInteraction: false }}
          // loop={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div>
              <img src={`/img/common/VisLogo.png`} alt="VisLogo" />
              원데이 집사를 찾아야 할때
            </div>
            <img src={`/img/common/Main_Vis1.jpg`} alt="Vis1" />
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={`/img/common/VisLogo.png`} alt="VisLogo" />
              원데이 집사를 찾아야 할때
            </div>
            <img src={`/img/common/Main_Vis2.jpg`} alt="Vis2" />
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={`/img/common/VisLogo.png`} alt="VisLogo" />
              멍멍 산책해
            </div>
            <img src={`/img/common/Main_Vis3.jpg`} alt="Vis3" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="category">
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
      </div>
    </section>
  );
};

export default Main;


