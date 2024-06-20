import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemStatus } from "../store/updateItemStatus";
import { url } from "../store/ref";
import Modal from "./Modal";
import ModalAlert from "./ModalAlert";

const UserProfile = ({ show, onClose, user, item }) => {
  const dispatch = useDispatch();

  const [modalAlert, setModalAlert] = useState(null);
  const [btnWrapStatus, setBtnWrapStatus] = useState(item.status);

  const fetchOfferCancell = useCallback(async () => {
    const response = await fetch(`${url}/job/appCancell/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(updateItemStatus({ id: data.jobPost._id, status: data.jobPost.status }));
      setModalAlert("offerCancellOk");
    } else {
      setModalAlert("offerCancellFile");
    }
  }, []);

  const showAlert = useCallback((content) => {
    setModalAlert(content);
  }, []);
  const closeAlert = useCallback(() => {
    setModalAlert(null);
  }, []);
  if (!show) {
    return null;
  }
  const reload = () => {
    window.location.reload();
  };

  const hiring = async () => {
    const response = await fetch(`${url}/job/hiring`, {
      method: "PUT",
      body: JSON.stringify({
        jobPostID: item._id,
        AppliUser: user.emailID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(updateItemStatus({ id: data._id, status: data.status }));
      setBtnWrapStatus(data.status);
      setModalAlert("hiringOk");
    } else {
      console.log(data.message);
    }
  };
  const appDelete = () => {
    setModalAlert("offerCancell");
  };
  console.log("아이템", item);
  console.log("유저", user);
  return (
    <div>
      <p>아이디 : {user.emailID}</p>
      <p>닉네임 : {user.nickName}</p>
      <p>연락처 : {user.phone}</p>
      <p>계좌 : {user.account}</p>
      <div className="btnWrap">
        {btnWrapStatus === 1 ? (
          <>
            <button className="btn primary" onClick={onClose}>
              확인
            </button>
            <button className="btn primary yellow" onClick={hiring}>
              채용하기
            </button>
          </>
        ) : btnWrapStatus === 2 ? (
          <>
            <button className="btn tertiary" onClick={appDelete}>
              구인취소
            </button>
            <button className="btn primary" onClick={onClose}>
              확인
            </button>
            <button className="btn primary yellow" onClick={hiring}>
              결제 및 완료
            </button>
          </>
        ) : btnWrapStatus === -1 ? (
          <>
            <button className="btn primary" onClick={onClose}>
              확인
            </button>
          </>
        ) : (
          <button className="btn primary" onClick={onClose}>
            확인
          </button>
        )}
      </div>
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "hiringOk" && <ModalAlert close={closeAlert} title={"프로필 메시지"} desc={"채용이 정상적으로 완료되었습니다"} error={false} confirm={false} throwFn={reload} />}
          {modalAlert === "offerCancellOk" && <ModalAlert close={closeAlert} title={"취소 메시지"} desc={"채용 취소가 정상적으로 처리되었습니다."} error={false} confirm={false} throwFn={reload} />}
          {modalAlert === "offerCancellFile" && <ModalAlert close={closeAlert} title={"취소 메시지"} desc={"채용 취소 중 오류가 발생되었습니다."} error={true} confirm={false} throwFn={reload} />}

          {modalAlert === "offerCancell" && (
            <ModalAlert
              close={closeAlert}
              title={"취소 메시지"}
              desc={
                <>
                  취소하시면 지금 공고로 다시 모집이 불가능하며
                  <br />
                  채용 후 고의적으로 취소하는 경우 형사 처벌을 받을 수 있습니다.
                  <br />
                  정말 취소하시겠습니까?
                </>
              }
              error={true}
              confirm={true}
              throwFn={fetchOfferCancell}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
