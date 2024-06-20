import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setDates } from "../store/findjob";
import { updateItemStatus } from "../store/updateItemStatus";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import SatisfactionModal from "./SatisfactionModal";

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

  /* 디테일페이지 바인딩을 위한 fetch (jobPost) */
  useEffect(() => {
    if (!_id) {
      showAlert("none_id");
    } else {
      const fetchJob = async () => {
        const res = await fetch(`${url}/job/JobDetail/${_id}`);
        const result = await res.json();
        dispatch(updateItemStatus({ id: _id, status: result.status, applicants: result.applicants }));
        setStatus(result.applicants);
        setBtnWrapStatus(result.status);
        setItem(result);
      };
      fetchJob();
    }
  }, [_id, dispatch]);

  /* 지원자 상태관리 */
  useEffect(() => {
    if (item?.applicants) {
      setStatus(item.applicants);
    }
  }, [item]);

  /* 작성자 차는 함수 */
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

  /* 모달기능 */
  const showAlert = useCallback((content) => {
    setModalAlert(content);
  }, []);
  const closeAlert = useCallback(() => {
    if (modalAlert === "appCencellOk") {
      if (closeDetail) {
        window.location.reload();
        closeDetail();
      }
    }
    setModalAlert(null);
  }, [modalAlert, navigate, closeDetail]);

  /* 삭제기능(admin) */
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

  /* 지원기능 */
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

  /* 취소기능 */
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

  return (
    <>
      <section className="topSection">
        {item?.title}
        {item?.nickName}
      </section>
      <section className="midSection">
        <div className="btnWrap">
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
          {btnWrapStatus === -1 && <p>취소 된 공고입니다.</p>}
          {btnWrapStatus === 3 && <p>완료 된 공고입니다.</p>}
        </div>
      </section>

      {popupVisible && <SatisfactionModal onClose={closeAlert} type="alert" />}
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "deleteJob" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"정말 삭제하시겠습니까?"} error={true} confirm={true} throwFn={deleteJob} />}
          {modalAlert === "appCancell" && (
            <ModalAlert
              close={closeAlert}
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
          {modalAlert === "deleteOk" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"구인글이 삭제되었습니다."} error={true} confirm={false} />}
          {modalAlert === "none_id" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"잘못된 접근입니다."} error={true} confirm={false} goPage={"/"} />}
          {modalAlert === "appError" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={errorMessage} error={true} confirm={false} />}
          {modalAlert === "appOk" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"지원이 정상적으로 처리되었습니다."} error={false} confirm={false} />}
          {modalAlert === "appCencellOk" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"지원취소가 정상적으로 처리되었습니다."} error={true} confirm={false} />}
        </Modal>
      )}
    </>
  );
};

export default Detail;
