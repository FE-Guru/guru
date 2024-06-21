import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import style from "../css/Lnb.module.css";

const Filter = () => {
  const cateType = useSelector((state) => state.findjob.cateType);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  console.log(cateType);
  return (
    <div className="filter">
      <div className={`${style.filter} `}>
        <strong>시간별</strong>
        <div>
          <input type="range"></input>
        </div>
      </div>
      <div className={`${style.filter} ${show1 ? style.on : ""}`}>
        <strong onClick={() => setShow1(!show1)}>재능별</strong>
        <motion.div initial={false} animate={{ height: show1 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
          <button>재능무관</button>
          <button>디자인</button>
          <button>IT·기술</button>
          <button>교육·강사</button>
          <button>운전</button>
          <button>서비스</button>
        </motion.div>
      </div>
      <div className={`${style.filter} ${show1 ? style.on : ""}`}>
        <strong onClick={() => setShow1(!show1)}>재능별</strong>
        <motion.div initial={false} animate={{ height: show1 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
          <button>분야무관</button>
          <button>배포/체험단</button>
          <button>SNS</button>
          <button>대행업무</button>
          <button>참여형</button>
          <button>서비스</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Filter;
