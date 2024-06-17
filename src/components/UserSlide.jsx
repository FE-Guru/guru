import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

const UserSlide = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const prevPage = () => {
    swiper?.slidePrev();
  };
  const nextPage = () => {
    swiper?.slideNext();
  };
  const slides = [
    { id: 1, name: "자유로운 도비", trust: 25 },
    { id: 2, name: "나길동", trust: 25 },
    { id: 3, name: "김구루", trust: 25 },
    { id: 4, name: "존도", trust: 25 },
  ];
  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => {
        setSwiperIndex(swiper.realIndex);
      });
    }
  }, [swiper]);

  useEffect(() => {
    console.log("Current swiperIndex:", swiperIndex);
  }, [swiperIndex]);

  return (
    <div className="userSlide">
      <Swiper
        centeredSlides={true}
        onSlideChange={(e) => setSwiperIndex(e.realIndex)}
        onSwiper={(e) => {
          setSwiper(e);
        }}
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          660: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="userCard">
              <div className="thumb">
                <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" />
              </div>
              <div className="userInfo">
                <strong>
                  {slide.name}
                  <span>님</span>
                </strong>
                <label htmlFor="trust">신뢰도</label>
                <progress id="trust" max="100" value={slide.trust}></progress>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`userPrevBtn ${swiperIndex === 0 ? "disabled" : ""}`} disabled={swiperIndex === 0} onClick={prevPage}>
        <img src={`${process.env.PUBLIC_URL}/img/common/userSlide_arrow.svg`} alt="prev 없음" />
      </button>
      <button className={`userNextBtn ${swiperIndex === slides.length - 1 ? "disabled" : ""}`} disabled={swiperIndex === slides.length - 1} onClick={nextPage}>
        <img src={`${process.env.PUBLIC_URL}/img/common/userSlide_arrow.svg`} alt="next" />
      </button>
    </div>
  );
};

export default UserSlide;
