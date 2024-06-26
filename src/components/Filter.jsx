import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Range, getTrackBackground } from "react-range";
import { setCateField, setCateTalent } from "../store/filter";
import { motion } from "framer-motion";
import style from "../css/Lnb.module.css";

const Filter = ({ cateTime, timeChange, lnbHandler }) => {
  const dispatch = useDispatch();
  const cateType = useSelector((state) => state.findjob.cateType);
  const cateTalent = useSelector((state) => state.filter.cateTalent);
  const cateField = useSelector((state) => state.filter.cateField);

  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [values, setValues] = useState([cateTime]);

  useEffect(() => {
    setValues(cateTime);
  }, [cateTime]);
  useEffect(() => {}, [cateTalent, cateField]);

  const talentChange = (talent) => {
    dispatch(setCateTalent(talent));
  };

  const fieldChange = (field) => {
    dispatch(setCateField(field));
  };

  const getColors = () => {
    switch (cateType) {
      case "onLine":
        return ["#ddd", "var(--cr-m-y)", "#ddd"];
      case "offLine":
        return ["#ddd", "var(--cr-m-g)", "#ddd"];
      default:
        return ["#ddd", "var(--cr-m-y)", "#ddd"];
    }
  };
  const getThumbColor = () => {
    switch (cateType) {
      case "onLine":
        return "var(--cr-m-y)";
      case "offLine":
        return "var(--cr-m-g)";
      default:
        return "var(--cr-m-y)";
    }
  };
  const formatTime = (value) => {
    if (isNaN(value)) {
      return null;
    }
    const hours = Math.floor(value / 60);
    return (
      <span>
        <b>{hours}</b>시간
      </span>
    );
  };

  return (
    <div className={`filter lnbCompo ${cateType === "offLine" ? style.offLine : ""}`}>
      <div className="filterWrap">
        <div>
          <div className={style.filter}>
            <strong onClick={() => setShow1(!show1)}>근로시간</strong>
            <motion.div initial={false} animate={{ height: show1 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
              <div className={style.rangeInput}>
                <div>
                  <Range
                    step={120}
                    min={0}
                    max={1440}
                    values={values}
                    onChange={(values) => {
                      setValues(values);
                      timeChange(values);
                    }}
                    renderTrack={({ props, children }) => {
                      const { key, ...restProps } = props;
                      return (
                        <div
                          key={key}
                          {...restProps}
                          style={{
                            ...restProps.style,
                            height: "0.5rem",
                            width: "100%",
                            background: getTrackBackground({
                              values,
                              colors: getColors(),
                              min: 0,
                              max: 1440,
                            }),
                            alignSelf: "center",
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onTouchStart={(e) => e.preventDefault()}>
                          {children}
                        </div>
                      );
                    }}
                    renderThumb={({ props, index }) => {
                      const { key, ...restProps } = props;
                      return (
                        <div
                          key={key}
                          {...restProps}
                          style={{
                            ...restProps.style,
                            height: "1.4rem",
                            width: "1.4rem",
                            borderRadius: "50%",
                            backgroundColor: getThumbColor(),
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0 0 0 2px var(--cr-bl1)",
                          }}></div>
                      );
                    }}
                  />
                </div>
                <output id="output" className={style.rangeOutPut}>
                  {formatTime(values[0])}
                  {formatTime(values[1])}
                </output>
              </div>
            </motion.div>
          </div>
          <div className={`${style.filter} ${show2 ? style.on : ""}`}>
            <strong onClick={() => setShow2(!show2)}>재능</strong>
            <motion.div initial={false} animate={{ height: show2 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
              <button className={cateTalent === "all" ? style.active : ""} onClick={() => talentChange("all")}>
                전체
              </button>
              <button className={cateTalent === "재능무관" ? style.active : ""} onClick={() => talentChange("재능무관")}>
                재능무관
              </button>
              <button className={cateTalent === "디자인" ? style.active : ""} onClick={() => talentChange("디자인")}>
                디자인
              </button>
              <button className={cateTalent === "IT·기술" ? style.active : ""} onClick={() => talentChange("IT·기술")}>
                IT·기술
              </button>
              <button className={cateTalent === "교육·강사" ? style.active : ""} onClick={() => talentChange("교육·강사")}>
                교육·강사
              </button>
              <button className={cateTalent === "운전" ? style.active : ""} onClick={() => talentChange("운전")}>
                운전
              </button>
              <button className={cateTalent === "서비스" ? style.active : ""} onClick={() => talentChange("서비스")}>
                서비스
              </button>
            </motion.div>
          </div>
          <div className={`${style.filter} ${show3 ? style.on : ""}`}>
            <strong onClick={() => setShow3(!show3)}>분야</strong>
            <motion.div initial={false} animate={{ height: show3 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
              <button className={cateField === "all" ? style.active : ""} onClick={() => fieldChange("all")}>
                전체
              </button>
              <button className={cateField === "분야무관" ? style.active : ""} onClick={() => fieldChange("분야무관")}>
                분야무관
              </button>
              <button className={cateField === "배포/체험단" ? style.active : ""} onClick={() => fieldChange("배포/체험단")}>
                배포/체험단
              </button>
              <button className={cateField === "SNS" ? style.active : ""} onClick={() => fieldChange("SNS")}>
                SNS
              </button>
              <button className={cateField === "대행업무" ? style.active : ""} onClick={() => fieldChange("대행업무")}>
                대행업무
              </button>
              <button className={cateField === "참여형" ? style.active : ""} onClick={() => fieldChange("참여형")}>
                참여형
              </button>
              <button className={cateField === "서비스" ? style.active : ""} onClick={() => fieldChange("서비스")}>
                서비스
              </button>
            </motion.div>
          </div>
          <button className="filterBtn btn primary yellow" onClick={lnbHandler}>
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
