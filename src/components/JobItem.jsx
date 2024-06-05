import style from "../css/JobItem.module.css";

const JobItem = () => {
  return (
    <div className={style.jobItem}>
      <div className={style.jobInfo}>
        <div className={style.thumb}>
          <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" />
        </div>
        <div className={style.jobDes}>
          <span>#재능무관</span>
          <span>#분야무관</span>
          <h3>리뷰작성 시 2000원 적립 리뷰작성 시 2000원 적립리뷰작성 시 2000원 적립리뷰작성 시 2000원 적립</h3>
          <div className={style.Price}>
            건당 <strong>40,000</strong>
            <span>원</span>
          </div>
        </div>
      </div>
      <div className={style.AppInfo}>
        <strong>D-3</strong>
        <div>
          <div className={style.row}>
            <span>약속장소</span>
            <p>서울시 도봉구</p>
          </div>
          <div className={style.row}>
            <span>약속시간</span>
            <p>12:00~18:00</p>
          </div>
          <div className={style.row}>
            <span>약속 예정일</span>
            <p>2024. 05. 31</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
