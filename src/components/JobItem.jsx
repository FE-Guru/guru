import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setDates } from "../store/findjob";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import style from "../css/JobItem.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "../css/UserSlide.css";

const JobOfferItem = ({ item, jobOffer, findjob, applied }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.findjob[item._id] || {});
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (item) {
      const { workStartDate, workEndDate, endDate } = item;
      dispatch(
        setDates({
          id: item._id,
          workStartDate,
          workEndDate,
          endDate,
        })
      );
    }
  }, [item, dispatch]);

  const toggleUserSlide = () => {
    setShow(!show);
  };

  const address = item.location.address.split(" ");
  const newAddress = address.slice(0, 2).join(" ");
  let onOff;
  if (item.category.jobType === "onLine") {
    onOff = "온라인";
  } else if (item.category.jobType === "offLine") {
    onOff = "오프라인";
  }

  return (
    <div className={style.itemWrap}>
      <div className={`${style.jobItem} ${style[item?.category?.jobType]}`}>
        <div className={style.jobInfo}>
          {!jobOffer ? (
            <div className={style.thumb}>
              <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" />
            </div>
          ) : null}
          <div className={style.jobDes}>
            {findjob ? (
              <>
                <span>#{item?.category?.talent}</span>
                <span>#{item?.category?.field}</span>
              </>
            ) : null}
            <h4>
              {!findjob ? <span className={style.jobCate}>{onOff}</span> : null}
              {item?.title}
            </h4>
            <div className={style.Price}>
              건당 <strong>{item?.pay.toLocaleString("ko-KR")}</strong>
              <span>원</span>
            </div>
            {jobOffer ? (
              <div className={style.btnWrap}>
                <button className="btn tertiary">수정하기</button>
                <button className="btn yellow" onClick={toggleUserSlide}>
                  지원자 확인
                </button>
              </div>
            ) : null}
            {applied ? (
              <div className={style.btnWrap}>
                <button className="btn tertiary">취소하기</button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.AppInfo}>
          <strong>{data.dFormat}</strong>
          <div>
            {item?.location?.address ? (
              <div className={style.row}>
                <span>약속장소</span>
                <p>{newAddress}</p>
              </div>
            ) : null}
            <div className={style.row}>
              <span>약속시간</span>
              <p>
                {data.workStartDate?.time || "-"}
                <span>~</span>
                {data.workEndDate?.time || "-"}
              </p>
            </div>
            <div className={style.row}>
              <span>약속 예정일</span>
              <p>{data.workStartDate?.date || "-"}</p>
            </div>
          </div>
        </div>
      </div>
      {jobOffer ? (
        <motion.div initial={false} animate={{ height: show ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
          <div className="">
            <Swiper navigation={true} modules={[Navigation]} className="userSlide">
              <SwiperSlide>
                <div className="userCard">
                  <div className="thumb">
                    <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" />
                  </div>
                  <div className="userInfo">
                    <strong>
                      자유로운 도비<span>님</span>
                    </strong>
                    <label htmlFor="trust">신뢰도</label>
                    <progress id="trust" max="100" value="25"></progress>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default JobOfferItem;
