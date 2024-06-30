import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setDates } from "../store/findjob";
import { updateItemStatus } from "../store/updateItemStatus";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import SatisfactionModal from "./SatisfactionModal";
import style from "../css/Detail.module.css";

const Detail = ({ _id, closeDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [modalAlert, setModalAlert] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(item?.applicants || []);
  const [btnWrapStatus, setBtnWrapStatus] = useState(0);
  const data = useSelector((state) => state.findjob);
  const memoizedData = useMemo(() => data[item?._id] || {}, [data, item?._id]);

  /*매칭된 유저 찾기*/
  const matchingUser = item?.applicants.find((applicant) => applicant.matched);
  const matchingID = matchingUser ? matchingUser.emailID : null;
  const matchingStatus = matchingUser ? matchingUser.status : null;

  const openModal = (item) => {
    setItem(item);
    setPopupVisible(true);
  };

  const closeAlert = useCallback(() => {
    setPopupVisible(false); // 모달 닫기
  }, []);

  useEffect(() => {
    if (!_id) {
      showAlert("none_id");
    } else {
      const fetchJob = async () => {
        const res = await fetch(`${url}/job/JobDetail/${_id}`);
        const result = await res.json();
        dispatch(
          updateItemStatus({
            id: _id,
            status: result.status,
            applicants: result.applicants,
          })
        );
        setStatus(result.applicants);
        setBtnWrapStatus(result.status);
        setItem(result);
      };
      fetchJob();
    }
  }, [_id, dispatch]);

  // useEffect(() => {
  //   if (item?.applicants) {
  //     setStatus(item.applicants);
  //   }
  // }, [item]);

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
      setStatus(item.applicants);
    }
  }, [item, dispatch]);

  useEffect(() => {
    if (item) {
      setStatus(item.applicants || []);
      setBtnWrapStatus(item.status || 0);
    }
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
  const showAlert = useCallback((content) => {
    setModalAlert(content);
  }, []);

  const closeAlertModal = useCallback(() => {
    if (modalAlert === "appCencellOk") {
      if (closeDetail) {
        window.location.reload();
        closeDetail();
      }
    }
    setModalAlert(null);
  }, [modalAlert, navigate, closeDetail]);

  const deleteJob = useCallback(async () => {
    try {
      const response = await fetch(`${url}/job/deleteJob/${_id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      if (res.message === "ok") {
        showAlert("deleteOk");
      }
    } catch (error) {
      console.error(error);
    }
  }, [_id, showAlert]);

  const application = async () => {
    const response = await fetch(`${url}/job/application/${_id}`, {
      method: "PUT",
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      setStatus(data.applicants);
      setBtnWrapStatus(data.status);
      dispatch(
        updateItemStatus({
          id: _id,
          status: data.status,
          applicants: data.applicants,
        })
      );
      showAlert("appOk");
    } else {
      setErrorMessage(data.message);
      showAlert("appError");
    }
  };

  const appCancell = async () => {
    const response = await fetch(`${url}/job/appCancell/${_id}`, {
      method: "PUT",
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(
        updateItemStatus({
          id: _id,
          status: data.jobPost.status,
          applicants: data.jobPost.applicants,
        })
      );
      setStatus(data.jobPost.applicants);
      setBtnWrapStatus(data.jobPost.status);
      showAlert("appCencellOk");
    } else {
      setErrorMessage(data.message);
      showAlert("appError");
    }
  };
  // 마감일
  let appliStatus = { text: "", val: "stat1" };
  if (item) {
    if (item.status === 2) {
      appliStatus = { text: "예약중", val: "stat2" };
    } else if (item.status === 3 || item.status === 4) {
      appliStatus = { text: "완료대기", val: "stat3" };
    } else if (item.status === 5) {
      appliStatus = { text: "완료", val: "stat5" };
    } else if (item.status === -1) {
      appliStatus = { text: "취소", val: "stat-1" };
    } else {
      appliStatus = { text: memoizedData.dFormat || "-", val: "stat1" };
    }
  }
  let statusText;
  if (item) {
    if (item.status === 1) {
      statusText = "모집중";
    } else if (item.status === 2) {
      statusText = "예약중";
    } else if (item.status === 3 || item.status === 4) {
      statusText = "완료대기";
    } else if (item.status === 5) {
      statusText = "완료";
    } else if (item.status === -1) {
      statusText = "취소완료";
    } else {
      appliStatus = "-";
    }
  }

  // 온오프 상태
  const onOff = useMemo(() => {
    if (item?.category?.jobType === "onLine") {
      return "온라인";
    } else if (item?.category?.jobType === "offLine") {
      return "오프라인";
    }
    return null;
  }, [item?.category?.jobType]);

  return (
    <>
      <section className={`${style.topSection} ${style[item?.category.jobType]}`}>
        <div className="mw">
          <div className={style.thumb}>
            {!author?.image ? <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" /> : <img src={`${url}/${author?.image}`} alt="프로필 이미지" />}
          </div>
          <div className={style.titleWrap}>
            <div className={style.cateWrap}>
              <span className={`${style.status} ${style[appliStatus.val]}`}>{statusText}</span>
              <span># {item?.category?.talent}</span>
              <span># {item?.category?.field}</span>
            </div>
            <h2>{item?.title}</h2>
            <label htmlFor="satisfied">
              <strong>{item?.nickName}</strong>
              <span>님</span>
              <progress name="satisfied" max="100" value="70"></progress>
            </label>
          </div>
        </div>
      </section>
      <section className={`${style.midSection} ${style[item?.category.jobType]} mw`}>
        <ul className={style.midUl}>
          <li>
            <i className="fa-solid fa-won-sign"></i>
            <p>
              <span>금액</span>
              {item?.pay.toLocaleString("ko-KR")}원
            </p>
          </li>
          <li>
            <i className="fa-solid fa-d"></i>
            <p>
              <span>모집마감</span>
              {appliStatus.text}
            </p>
          </li>
          <li>
            <i className="fa-regular fa-calendar-check"></i>
            <p>
              <span>약속날짜</span>
              {memoizedData.workStartDate?.date || "-"}
            </p>
          </li>
          <li>
            <i className="fa-regular fa-clock"></i>
            <p>
              <span>약속시간</span>
              {memoizedData.workStartDate?.time || "-"}~{memoizedData.workEndDate?.time || "-"}
            </p>
          </li>
          <li>
            <i className="fa-solid fa-location-dot"></i>
            <p>
              <span>근무형태</span>
              {onOff}
            </p>
          </li>
        </ul>
        <div className={`btnWrap ${style.detailBtnWRap}`}>
          {user?.emailID === "admin" && (
            <button
              className="btn tertiary"
              onClick={(e) => {
                setModalAlert("deleteJob");
              }}>
              삭제하기
            </button>
          )}
          {btnWrapStatus === 1 && (
            <>
              {user?.emailID === item?.emailID ? (
                <button className="btn tertiary" onClick={() => navigate("/job-edit", { state: { _id: item._id } })}>
                  수정하기
                </button>
              ) : (
                <>
                  {status?.some((applicant) => applicant.emailID === user?.emailID && applicant.status === 1) ? (
                    <button className="btn tertiary" onClick={appCancell}>
                      지원취소(모집전)
                    </button>
                  ) : (
                    <button className="btn yellow" onClick={application}>
                      지원하기
                    </button>
                  )}
                </>
              )}
            </>
          )}
          {btnWrapStatus === 2 && (
            <>
              <button className="btn tertiary" onClick={() => setModalAlert("appCancell")}>
                취소하기
              </button>
              <button
                className="btn yellow"
                onClick={() => {
                  setPopupVisible(true);
                }}>
                결제 및 완료
              </button>
            </>
          )}
          {btnWrapStatus === 3 && (
            <>
              {user?.emailID === item?.emailID ? (
                <button
                  className="btn yellow"
                  onClick={() => {
                    setPopupVisible(true);
                  }}>
                  결제 및 완료
                </button>
              ) : (
                <p>상대방이 완료처리 전입니다.</p>
              )}
            </>
          )}
          {btnWrapStatus === 4 && (
            <>
              {user?.emailID === matchingID ? (
                <button
                  className="btn yellow"
                  onClick={() => {
                    setPopupVisible(true);
                  }}>
                  결제 및 완료
                </button>
              ) : (
                <p>상대방이 완료처리 전입니다.</p>
              )}
            </>
          )}
          {btnWrapStatus === -1 && <p>취소 된 공고입니다.</p>}
          {btnWrapStatus === 5 && <p>완료 된 공고입니다.</p>}
        </div>
        <h2>상세설명</h2>
        <pre>{item?.desc}</pre>
        <div className={`btnWrap ${style.detailBtnWRap}`}>
          <button className="btn primary" onClick={() => navigate("/findJob", { state: { _id: item._id } })}>
            {" "}
            목록으로
          </button>
        </div>
      </section>

      {popupVisible && <SatisfactionModal onClose={closeAlert} type="alert" item={item} author={author} />}
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlertModal} type="alert">
          {modalAlert === "deleteJob" && <ModalAlert close={closeAlertModal} title={"상세페이지 메시지"} desc={"정말 삭제하시겠습니까?"} error={true} confirm={true} throwFn={deleteJob} />}
          {modalAlert === "appCancell" && (
            <ModalAlert
              close={closeAlertModal}
              title={"삭제 메시지"}
              desc={
                <>
                  지금 취소하시면 패널티를 받을수 있습니다.
                  <br />
                  정말 취소하시겠습니까?
                </>
              }
              error={true}
              confirm={true}
              throwFn={appCancell}
            />
          )}
          {modalAlert === "deleteOk" && <ModalAlert close={closeAlertModal} title={"상세페이지 메시지"} desc={"구인글이 삭제되었습니다."} error={true} confirm={false} />}
          {modalAlert === "none_id" && <ModalAlert close={closeAlertModal} title={"상세페이지 메시지"} desc={"잘못된 접근입니다."} error={true} confirm={false} goPage={"/"} />}
          {modalAlert === "appError" && <ModalAlert close={closeAlertModal} title={"상세페이지 메시지"} desc={errorMessage} error={true} confirm={false} />}
          {modalAlert === "appOk" && <ModalAlert close={closeAlertModal} title={"상세페이지 메시지"} desc={"지원이 정상적으로 처리되었습니다."} error={false} confirm={false} />}
          {modalAlert === "appCencellOk" && <ModalAlert close={closeAlertModal} title={"상세페이지 메시지"} desc={"지원취소가 정상적으로 처리되었습니다."} error={true} confirm={false} />}
        </Modal>
      )}
    </>
  );
};

export default Detail;
