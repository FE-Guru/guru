import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import style from "../css/Lnb.module.css";

const Filter = ({ cateTalent, cateField, cateTime, talentChange, fieldChange }) => {
  const cateType = useSelector((state) => state.findjob.cateType);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  return (
    <div className="filter lnbCompo">
      <div className={`${style.filter} `}>
        <strong>시간별</strong>
        <div>
          <input type="range"></input>
        </div>
      </div>
      <div className={`${style.filter} ${show1 ? style.on : ""}`}>
        <strong onClick={() => setShow1(!show1)}>재능별</strong>
        <motion.div initial={false} animate={{ height: show1 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
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
      <div className={`${style.filter} ${show2 ? style.on : ""}`}>
        <strong onClick={() => setShow2(!show2)}>분야별</strong>
        <motion.div initial={false} animate={{ height: show2 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
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
    </div>
  );
};

export default Filter;
