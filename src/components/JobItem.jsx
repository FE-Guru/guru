import { useDispatch, useSelector } from "react-redux";
import { setDates } from "../store/findjob";
import { useEffect } from "react";
import style from "../css/JobItem.module.css";

const JobOfferItem = ({ item, jobOffer, findjob }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.findjob);
  useEffect(() => {
    const workStartDate = item.workStartDate;
    const workEndDate = item.workEndDate;
    const endDate = item.endDate;
    dispatch(
      setDates({
        workStartDate,
        workEndDate,
        endDate,
      })
    );
  }, [item, dispatch]);
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
      <div className={`${style.jobItem} ${style[item.category.jobType]}`}>
        <div className={style.jobInfo}>
          {!jobOffer ? (
            <div className={style.thumb}>
              <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" />
            </div>
          ) : null}
          <div className={style.jobDes}>
            {findjob ? (
              <>
                <span>#재능무관</span>
                <span>#분야무관</span>
              </>
            ) : null}
            <h4>
              {!findjob ? <span className={style.jobCate}>{onOff}</span> : null}
              {item.title}
            </h4>
            <div className={style.Price}>
              건당 <strong>{item.pay.toLocaleString("ko-KR")}</strong>
              <span>원</span>
            </div>
            {!findjob ? (
              <div className={style.btnWrap}>
                <button className="btn tertiary">수정하기</button>
                <button className="btn yellow">지원자 확인</button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.AppInfo}>
          <strong>{data.dFormat}</strong>
          <div>
            {item.location.address ? (
              <div className={style.row}>
                <span>약속장소</span>
                <p>{newAddress}</p>
              </div>
            ) : null}
            <div className={style.row}>
              <span>약속시간</span>
              <p>
                {data.workStartDate.time}
                <span>~</span>
                {data.workEndDate.time}
              </p>
            </div>
            <div className={style.row}>
              <span>약속 예정일</span>
              <p>{data.workStartDate.date}</p>
            </div>
          </div>
        </div>
      </div>
      {jobOffer ? (
        <div className={style.userSlide}>
          <div>유저유저</div>
        </div>
      ) : null}
    </div>
  );
};

export default JobOfferItem;
