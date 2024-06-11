import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { setPageInfo } from "../store/pageInfo";
import Lnb from "../components/Lnb";
import Select from "react-select";
import Modal from "../components/Modal";
import DaumPostcode from "react-daum-postcode";
import style from "../css/Form.module.css";

const JobWrit = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(null);
  /*Value 정의*/
  const [selectedTime1, setSelectedTime1] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  const currentPage = useSelector((state) => state.pageInfo.currentPage);
  const pageInfo = useMemo(
    () => ({
      menuKR: "구인글 작성",
      menuEn: "Job Offer",
      currentPage: { pageName: "구인글 작성", path: "/job-wirt" },
    }),
    []
  );
  useEffect(() => {
    dispatch(setPageInfo(pageInfo));
  }, [dispatch, pageInfo]);

  /* Slect*/
  const selectTimeOp = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour < 10 ? `0${hour}` : hour;
        const minuteStr = minute < 10 ? `0${minute}` : minute;
        times.push({ value: `${hourStr}:${minuteStr}`, label: `${hourStr}:${minuteStr}` });
      }
    }
    return times;
  };
  const timeOptions1 = selectTimeOp();
  const timeOptions2 = selectTimeOp();

  const timeChange1 = (Op) => {
    setSelectedTime1(Op);
    console.log(`시작시간: ${Op.value}`);
  };
  const timeChange2 = (Op) => {
    setSelectedTime2(Op);
    console.log(`마감시간: ${Op.value}`);
  };

  /* Modal */
  const showPopup = (content) => {
    setModal(content);
  };
  const closePopup = () => {
    setModal(null);
  };

  /* 주소 API */
  const completeHandler = (data) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    setModal(false);
  };
  const closeHandler = (state) => {
    if (state === "FORCE_CLOSE" || state === "COMPLETE_CLOSE") {
      setModal(false);
    }
  };
  const inputChangeHandler = (e) => {
    setDetailedAddress(e.target.value);
  };

  return (
    <main className="subPage">
      <section className="mw">
        <Lnb />
        <div className="contents">
          <h3>{currentPage.pageName}</h3>
          <form className={style.formStyle}>
            <div className={`${style.formContainer} full`}>
              <div className={style.formGrup}>
                <span>제목</span>
                <input type="text" name="title" id="title" className={style.row} placeholder="제목을 입력해주세요." />
              </div>
              <div className={`${style.formGrup} ${style.formLabels}`}>
                <span>유형선택</span>
                <label>
                  <input type="radio" name="cateType" defaultChecked />
                  <span>온라인</span>
                </label>
                <label>
                  <input type="radio" name="cateType" />
                  <span>오프라인</span>
                </label>
              </div>
              <div className={`${style.formGrup} ${style.address}`}>
                <span>주소</span>
                <div className={style.flexWrap}>
                  <div className={style.zonecode}>{zonecode}</div>
                  <button type="button" className={style.addressBtn} onClick={() => showPopup("findAddress")}>
                    주소 찾기
                  </button>
                  <div>{address}</div>
                  <input value={detailedAddress} onChange={inputChangeHandler} placeholder="상세주소 입력" />
                </div>
              </div>
              <div className={style.formGrup}>
                <span>구인 마감날짜</span>
                <input type="date" name="endDate" />
              </div>
              <div className={style.formGrup}>
                <span>약속날짜</span>
                <input type="date" name="workDate" />
              </div>
              <div className={style.formGrup}>
                <span>근로시간</span>
                <div className={style.selectWrap}>
                  <Select options={timeOptions1} onChange={timeChange1} className={style.select} placeholder="시작시간 선택" />
                  <span>~</span>
                  <Select options={timeOptions2} onChange={timeChange2} className={style.select} placeholder="마감시간 선택" />
                </div>
              </div>
            </div>
            <div className="btnWrap">
              <button type="submit" className="btn primary yellow">
                구인글 작성
              </button>
            </div>
          </form>
        </div>
      </section>
      {modal && (
        <Modal show={modal !== null} onClose={closePopup}>
          {modal === "findAddress" && (
            <div className={style.addressModal}>
              <h3>주소검색</h3>
              <DaumPostcode onComplete={completeHandler} />
            </div>
          )}
        </Modal>
      )}
    </main>
  );
};

export default JobWrit;
