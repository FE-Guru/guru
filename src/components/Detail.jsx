import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import SatisfactionModal from "./SatisfactionModal";

const Detail = ({ _id }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [modalAlert, setModalAlert] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(item?.applicants || []);
  const [btnWrapStatus, setBtnWrapStatus] = useState(0);

  useEffect(() => {
    if (!_id) {
      showAlert("none_id");
    } else {
      const fetchJob = async () => {
        const res = await fetch(`${url}/job/JobDetail/${_id}`);
        const result = await res.json();
        setItem(result);
      };
      fetchJob();
    }
  }, [_id]);

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

  const closeAlert = useCallback(() => {
    if (modalAlert === "deleteOk") {
      navigate("/job-offer");
    }
    setModalAlert(null);
  }, [modalAlert, navigate]);

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
    const oData = await response.json();
    if (response.ok) {
      setStatus(oData.jobPost.applicants);
      setStatus(oData.applicants);
      setBtnWrapStatus(oData.status);
      showAlert("appOk");
    } else {
      setErrorMessage(oData.message);
      showAlert("appError");
    }
  };
  const appDelete = async () => {
    const response = await fetch(`${url}/job/appCancell/${_id}`, {
      method: "PUT",
      credentials: "include",
    });
    const cData = await response.json();
    if (response.ok) {
      console.log(cData);
      setStatus(cData.jobPost.applicants);
      setBtnWrapStatus(cData.jobPost.status);
      showAlert("appOk");
    } else {
      setErrorMessage(cData.message);
      showAlert("appError");
    }
  };

  const completion = () => {};

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
                    <button className="btn tertiary" onClick={appDelete}>
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
          <button
            className="btn yellow"
            onClick={() => {
              setPopupVisible(true);
            }}>
            결제 및 완료
          </button>
        </div>
      </section>

      {popupVisible && <SatisfactionModal onClose={closeAlert} type="alert" />}
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "deleteJob" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"정말 삭제하시겠습니까?"} error={true} confirm={true} throwFn={deleteJob} />}
          {modalAlert === "appCancell" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"정말 취소하겠습니까?"} error={true} confirm={true} throwFn={appDelete} />}
          {modalAlert === "deleteOk" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"구인글이 삭제되었습니다."} error={true} confirm={false} />}
          {modalAlert === "none_id" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"잘못된 접근입니다."} error={true} confirm={false} goPage={"/"} />}
          {modalAlert === "appError" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={errorMessage} error={true} confirm={false} />}
          {modalAlert === "appOk" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"지원이 정상적으로 처리되었습니다."} error={false} confirm={false} />}
        </Modal>
      )}
    </>
  );
};

export default Detail;
