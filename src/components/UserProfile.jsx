import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateItemStatus } from "../store/updateItemStatus";
import { url } from "../store/ref";
import Modal from "./Modal";
import ModalAlert from "./ModalAlert";
import SatisfactionModal from "./SatisfactionModal";
import style from "../css/UserProfile.module.css";

const UserProfile = ({ show, onClose, user, item }) => {
  const dispatch = useDispatch();
  const [modalAlert, setModalAlert] = useState(null);
  const [btnWrapStatus, setBtnWrapStatus] = useState(item.status);
  const [satisfactionData, setSatisfactionData] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [author, setAuthor] = useState(null);

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
  }, [dispatch, item._id]);

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

  const calculateSatisfactionStats = (data) => {
    const stats = {
      kind: 0,
      onTime: 0,
      highQuality: 0,
      unkind: 0,
      notOnTime: 0,
      lowQuality: 0,
    };

    data.forEach((item) => {
      stats.kind += item.kind;
      stats.onTime += item.onTime;
      stats.highQuality += item.highQuality;
      stats.unkind += item.unkind;
      stats.notOnTime += item.notOnTime;
      stats.lowQuality += item.lowQuality;
    });

    return stats;
  };

  //만족도 조사 불러오기 - user.emailID
  const fetchSatisfaction = useCallback(async () => {
    try {
      const response = await fetch(`${url}/satisfaction/${user.emailID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Satisfaction data received:", data); // 해당 이메일 관련 만족도 조사 찾기

        setSatisfactionData(calculateSatisfactionStats(data));
        setModalAlert("satisfaction");
      } else {
        console.error("Failed to fetch satisfaction data:", response.status);
        setModalAlert("satisfactionFail");
      }
    } catch (error) {
      console.error("Error fetching satisfaction data:", error);
      setModalAlert("satisfactionFail");
    }
  }, [user.emailID]);

  const openModal = () => {
    setPopupVisible(true);
  };
  const showAlert = useCallback((content) => {
    setModalAlert(content);
  }, []);
  const closeAlert = useCallback(() => {
    setModalAlert(null);
    setPopupVisible(false); // 모달 닫기
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

  return (
    <div className={style.userProfile}>
      <div className={style.userCard}>
        <div className={style.thumb}>
          {!user?.image ? <img src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`} alt="이미지 없음" /> : <img src={`${url}/${user?.image}`} alt="프로필 이미지" />}
        </div>
        <div className={style.userInfo}>
          <div>
            <strong>
              {user?.nickName}
              <span>님</span>
            </strong>
            <label htmlFor="trust">신뢰도</label>
            <progress id="trust" max="100" value="20"></progress>
          </div>
          <div className={style.satisfieds}>
            <strong>만족도</strong>
            <div>
              <span>
                친절함 <b>3</b>
              </span>
              <span>
                시간 준수 <b>3</b>
              </span>
              <span>
                우수한 서비스 <b>3</b>
              </span>
            </div>
            <strong>불만족도</strong>
            <div>
              <span>
                불친절함 <b>3</b>
              </span>
              <span>
                시간 미준수 <b>3</b>
              </span>
              <span>
                미흡한 서비스 <b>3</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.profileInfo}>
        <strong>경력</strong>
        <span>{user?.career ? user.career : "-"}</span>
        <strong>면허/자격증</strong>
        <span>{user?.certi ? user.certi : "-"}</span>
        <strong>재능/스킬</strong>
        <span>{user?.skill ? user.skill : "-"}</span>
        <strong>선호 요일/시간</strong>
        <span>{user?.time ? user.time : "-"}</span>
        <strong>자기소개</strong>
        <span>{user?.introduce ? user.introduce : "-"}</span>
      </div>
      <div className={style.otherReviews}>
        <strong>최근 리뷰 3건</strong>
        <div>
          <strong>000님이 남긴 리뷰입니다.</strong>
          <pre>리뷰내용</pre>
        </div>
      </div>
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
            <button className="btn yellow" onClick={() => setPopupVisible(true)}>
              결제 및 완료
            </button>
          </>
        ) : btnWrapStatus === 3 ? (
          <>
            {user?.emailID === item?.emailID ? (
              <button className="btn yellow" onClick={() => setPopupVisible(true)}>
                결제 및 완료
              </button>
            ) : (
              <>
                <p>상대방이 완료처리 전입니다.</p>
                <button className="btn primary" onClick={onClose}>
                  확인
                </button>
              </>
            )}
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
      {popupVisible && <SatisfactionModal onClose={closeAlert} type="alert" item={item} author={author} />}
    </div>
  );
};

export default UserProfile;
