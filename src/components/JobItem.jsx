import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setDates } from "../store/findjob";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import Detail from "./Detail";
import UserSlide from "./UserSlide";
import style from "../css/JobItem.module.css";

const JobItem = ({ item, jobOffer, findjob, applied, onDel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.findjob);
  const memoizedData = useMemo(() => data[item?._id] || {}, [data, item?._id]);
  const address = item?.location?.address?.split(" ");
  const newAddress = address?.slice(0, 2).join(" ");
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [modalAlert, setModalAlert] = useState(null);

  const onOff = useMemo(() => {
    if (item?.category?.jobType === "onLine") {
      return "온라인";
    } else if (item?.category?.jobType === "offLine") {
      return "오프라인";
    }
    return null;
  }, [item?.category?.jobType]);

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

  const showPopup = (content) => {
    setModal(content);
  };
  const closePopup = () => {
    setModal(null);
  };
  const showAlert = useCallback((content) => {
    setModalAlert(content);
  }, []);
  const closeAlert = useCallback(() => {
    if (modalAlert === "deleteOk") {
      onDel(item._id);
    }
    setModalAlert(null);
  }, [modalAlert, onDel, item._id]);

  const deleteJob = useCallback(async () => {
    try {
      const response = await fetch(`${url}/job/deleteJob/${item._id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      if (res.message === "ok") {
        showAlert("deleteOk");
      }
    } catch (error) {
      console.error(error);
    }
  }, [url, item._id, showAlert]);
  const goDetail = () => {
    if (findjob) {
      navigate("/job-detail", { state: { _id: item._id } });
    } else {
      showPopup("getDetail");
    }
  };
  return (
    <div className={`${style.itemWrap} ${findjob ? style.findJob : ""}`}>
      <div className={`${style.jobItem} ${style[item?.category?.jobType]}`} onClick={goDetail}>
        <div className={style.jobInfo}>
          {!jobOffer ? (
            <div className={style.thumb}>
              <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" />
            </div>
          ) : null}
          <div className={style.jobDes}>
            {findjob ? (
              <div className={style.cateWrap}>
                <span>#{item?.category?.talent}</span>
                <span>#{item?.category?.field}</span>
              </div>
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
                <button
                  className="btn tertiary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalAlert("deleteJob");
                  }}>
                  삭제하기
                </button>
                <button
                  className="btn tertiary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/job-edit", { state: { _id: item._id } });
                  }}>
                  수정하기
                </button>
                <button
                  className="btn yellow"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUserSlide();
                  }}>
                  지원자 확인
                </button>
              </div>
            ) : null}
            {/* {applied ? (
              <div className={`${style.btnWrap} ${style.applied}`}>
                <button className="btn tertiary">취소하기</button>
              </div>
            ) : null} */}
          </div>
        </div>
        <div className={style.AppInfo}>
          <strong>{memoizedData.dFormat}</strong>
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
                {memoizedData.workStartDate?.time || "-"}
                <span>~</span>
                {memoizedData.workEndDate?.time || "-"}
              </p>
            </div>
            <div className={style.row}>
              <span>약속 예정일</span>
              <p>{memoizedData.workStartDate?.date || "-"}</p>
            </div>
          </div>
        </div>
      </div>
      {jobOffer ? (
        <motion.div initial={false} animate={{ height: show ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
          <UserSlide />
        </motion.div>
      ) : null}

      {modal && (
        <Modal show={modal !== null} onClose={closePopup} type="detail">
          {modal === "getDetail" && (
            <main>
              <h3 style={{ marginBottom: "1.4rem" }}>상세보기</h3>
              <Detail _id={item?._id} />
            </main>
          )}
        </Modal>
      )}
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "deleteJob" && <ModalAlert close={closeAlert} title={"구인글 수정 메시지"} desc={"정말 삭제하시겠습니까?"} error={true} confirm={true} throwFn={deleteJob} />}
          {modalAlert === "deleteOk" && <ModalAlert close={closeAlert} title={"구인글 수정 메시지"} desc={"구인글이 삭제되었습니다."} error={true} confirm={false} />}
        </Modal>
      )}
    </div>
  );
};

export default JobItem;
