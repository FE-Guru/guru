import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDates } from "../store/findjob";
import { url } from "../store/ref";
import style from "../css/Main.module.css";

const MainJobItem = ({ item, tpye }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.findjob);
  const memoizedData = useMemo(() => data[item?._id] || {}, [data, item?._id]);
  const [author, setAuthor] = useState(null);
  const newAddress = item.location.address.split(" ").slice(0, 2).join(" ");

  /*모집상태 바인딩*/
  let appliStatus;
  if (item.status === 2) {
    appliStatus = { text: "예약중", val: "stat2" };
  } else if (item.status === 3) {
    appliStatus = { text: "완료", val: "stat3" };
  } else if (item.status === -1) {
    appliStatus = { text: "취소", val: "stat-1" };
  } else {
    appliStatus = { text: memoizedData.dFormat, val: "stat1" };
  }
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

  /* 작성자 확인 */
  useEffect(() => {
    if (item?.emailID) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`${url}/job/findUserData/${item.emailID}`);
          const result = await res.json();
          setAuthor(result);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }
  }, [item]);
  /*디테일페이지 모달 or 페이지이동*/
  const goDetail = () => {
    navigate("/job-detail", { state: { _id: item._id } });
  };
  return (
    <div className={style.itemWrap} onClick={goDetail}>
      <div>
        <div className={style.itemTop}>
          <h3>{item?.title}</h3>
          {tpye === "offLine" && <span>{newAddress}</span>}
          <span>#{item?.category?.talent}</span>
          <span>#{item?.category?.field}</span>
        </div>
        <strong>{appliStatus.text}</strong>
      </div>
      <div>
        <div>
          건당 <strong>{item?.pay.toLocaleString("ko-KR")}</strong>
          <span>원</span>
        </div>
        <div className={style.thumb}>
          {!author?.image ? <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" /> : <img src={`${url}/${author?.image}`} alt="프로필 이미지" />}
        </div>
      </div>
    </div>
  );
};

export default MainJobItem;
