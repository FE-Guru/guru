import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setDates } from '../store/findjob';
import { updateItemStatus } from '../store/updateItemStatus';
import { url } from '../store/ref';
import Modal from '../components/Modal';
import ModalAlert from '../components/ModalAlert';
import SatisfactionModal from './SatisfactionModal';
import "../css/JobDetail.css";

const Detail = ({ _id, closeDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const data = useSelector((state) => state.findjob);
  const [modalAlert, setModalAlert] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(item?.applicants || []);
  const [btnWrapStatus, setBtnWrapStatus] = useState(0);
  const memoizedData = useMemo(() => data[item?._id] || {}, [data, item?._id]);

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

  useEffect(() => {
    if (item?.applicants) {
      setStatus(item.applicants);
    }
  }, [item]);

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
    } else if (item.status === 3) {
      appliStatus = { text: "완료", val: "stat3" };
    } else if (item.status === -1) {
      appliStatus = { text: "취소", val: "stat-1" };
    } else {
      appliStatus = { text: memoizedData.dFormat || "-", val: "stat1" };
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

  console.log("구인글 정보", item);
  console.log("작성자 정보", author);
  console.log(item?.category.jobType);

  // 약속 날짜
  const formattedDate = useMemo(() => {
    if (memoizedData.workStartDate?.date) {
      const date = new Date(memoizedData.workStartDate.date);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}/${day}`;
    }
    return "-";
  }, [memoizedData.workStartDate?.date]);
  // 모집 현황
  const getStatusText = (status) => {
    switch (status) {
      case 2:
        return "[예약중]";
      case 3:
        return "[완료]";
      case -1:
        return "[취소]";
      default:
        return "[모집중]";
    }
  };

  return (
    <>
      <section className={`topSection ${item?.category.jobType}`}>
        <div className="topTitle">
          <div className="thumb">
            {!author?.image ? (
              <img
                src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`}
                alt="이미지 없음"
              />
            ) : (
              <img src={`${url}/${author?.image}`} alt="프로필 이미지" />
            )}
          </div>
          <div className="titleWrap">
            <div className="cateWrap">
              <span>{item?.category?.talent}</span>
              <span>{item?.category?.field}</span>
            </div>
            <h1>
              {getStatusText(item?.status)} {item?.title}
            </h1>
            <div className="nickName">
              {item?.nickName} <span>님</span>
            </div>
            <progress></progress>
          </div>
        </div>
      </section>
      <section className={`midSection ${item?.category.jobType}`}>
        <ul className="MidUl">
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
            <i className="fa-solid fa-calendar-days"></i>
            <p>
              <span>약속날짜</span>
              {formattedDate}
            </p>
          </li>
          <li>
            <i className="fa-solid fa-location-dot"></i>
            <p>
              <span>약속시간</span>
              {memoizedData.workStartDate?.time || "-"}~
              {memoizedData.workEndDate?.time || "-"}
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
        <div className="btnWrap">
          {user?.emailID === "admin" && (
            <button
              className="btn tertiary"
              onClick={(e) => {
                setModalAlert("deleteJob");
              }}
            >
              삭제하기
            </button>
          )}
          {btnWrapStatus === 1 && (
            <>
              {user?.emailID === item?.emailID ? (
                <button
                  className="btn tertiary"
                  onClick={() =>
                    navigate("/job-edit", { state: { _id: item._id } })
                  }
                >
                  수정하기
                </button>
              ) : (
                <>
                  {status?.some(
                    (applicant) =>
                      applicant.emailID === user?.emailID &&
                      applicant.status === 1
                  ) ? (
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
              <button
                className="btn tertiary"
                onClick={() => setModalAlert("appCancell")}
              >
                취소하기
              </button>
              <button
                className="btn yellow"
                onClick={() => {
                  setPopupVisible(true);
                }}
              >
                결제 및 완료
              </button>
            </>
          )}
          {btnWrapStatus === -1 && <p>취소 된 공고입니다.</p>}
          {btnWrapStatus === 3 && <p>완료 된 공고입니다.</p>}
        </div>
        <h2>상세설명</h2>
        <p>{item?.desc}</p>
        <div className="btnWrap">
          <button
            className="btn white border"
            onClick={() => navigate("/findJob", { state: { _id: item._id } })}
          >
            {" "}
            목록으로
          </button>
        </div>
      </section>

      {popupVisible && (
        <SatisfactionModal onClose={closeAlert} type="alert" item={item} />
      )}
      {modalAlert && (
        <Modal
          show={modalAlert !== null}
          onClose={closeAlertModal}
          type="alert"
        >
          {modalAlert === "deleteJob" && (
            <ModalAlert
              close={closeAlertModal}
              title={"상세페이지 메시지"}
              desc={"정말 삭제하시겠습니까?"}
              error={true}
              confirm={true}
              throwFn={deleteJob}
            />
          )}
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
          {modalAlert === "deleteOk" && (
            <ModalAlert
              close={closeAlertModal}
              title={"상세페이지 메시지"}
              desc={"구인글이 삭제되었습니다."}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert === "none_id" && (
            <ModalAlert
              close={closeAlertModal}
              title={"상세페이지 메시지"}
              desc={"잘못된 접근입니다."}
              error={true}
              confirm={false}
              goPage={"/"}
            />
          )}
          {modalAlert === "appError" && (
            <ModalAlert
              close={closeAlertModal}
              title={"상세페이지 메시지"}
              desc={errorMessage}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert === "appOk" && (
            <ModalAlert
              close={closeAlertModal}
              title={"상세페이지 메시지"}
              desc={"지원이 정상적으로 처리되었습니다."}
              error={false}
              confirm={false}
            />
          )}
          {modalAlert === "appCencellOk" && (
            <ModalAlert
              close={closeAlertModal}
              title={"상세페이지 메시지"}
              desc={"지원취소가 정상적으로 처리되었습니다."}
              error={true}
              confirm={false}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default Detail;
