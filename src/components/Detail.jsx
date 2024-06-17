import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";

const Detail = ({ _id }) => {
  const navigate = useNavigate();
  const [modalAlert, setModalAlert] = useState(null);
  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState(null);

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
    if (item?.emailID) {
      const fetchUSer = async () => {
        try {
          const res = await fetch(`${url}/profile/${item.emailID}`);
          const result = await res.json();
          setAuthor(result);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUSer();
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
  }, [modalAlert, _id]);
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
  }, [url, _id, showAlert]);
  console.log("job 정보-", item);
  console.log("글쓴이 정보-", author);

  return (
    <>
      <section className="topSection">
        {item?.title}
        {item?.nickName}
      </section>
      <section className="midSection">
        <div className="btnWrap">
          <button
            className="btn tertiary"
            onClick={(e) => {
              setModalAlert("deleteJob");
            }}>
            삭제하기
          </button>
          <button
            className="btn tertiary"
            onClick={() => {
              navigate("/job-edit", { state: { _id } });
            }}>
            수정하기
          </button>
          <button className="btn yellow">지원하기</button>
        </div>
      </section>
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "deleteJob" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"정말 삭제하시겠습니까?"} error={true} confirm={true} throwFn={deleteJob} />}
          {modalAlert === "deleteOk" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"구인글이 삭제되었습니다."} error={true} confirm={false} />}
          {modalAlert === "none_id" && <ModalAlert close={closeAlert} title={"상세페이지 메시지"} desc={"잘못된 접근입니다."} error={true} confirm={false} goPage={"/"} />}
        </Modal>
      )}
    </>
  );
};

export default Detail;
