import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import Lnb from "../components/Lnb";
import DaumPostcode from "react-daum-postcode";
import style from "../css/Form.module.css";

const JobWrit = () => {
  const [detailedAddress, setDetailedAddress] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 불리언 타입으로 초기화
  const dispatch = useDispatch();
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

  const completeHandler = (data) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
  };

  const closeHandler = (state) => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };
  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
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
            <div className="full">
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
                  <button className={style.addressBtn} onClick={toggleHandler}>
                    주소 찾기
                  </button>
                  <div>{address}</div>
                  <input value={detailedAddress} onChange={inputChangeHandler} />
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
                <label>
                  <select name="workStartTime">
                    <option>00:00</option>
                  </select>
                  <span>~</span>
                  <select name="workEndTime">
                    <option>00:00</option>
                  </select>
                </label>
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
      {isOpen && (
        <div className={style.modal}>
          <DaumPostcode onComplete={completeHandler} onClose={closeHandler} />
        </div>
      )}
    </main>
  );
};

export default JobWrit;
