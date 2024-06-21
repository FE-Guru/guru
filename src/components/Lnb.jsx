import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import style from "../css/Lnb.module.css";

const Lnb = ({ onOFfFilter, statusFilter, onOffChange, statusChange, lnbHas, lnbHandler }) => {
  const menuKR = useSelector((state) => state.pageInfo.menuKR);
  const menuEn = useSelector((state) => state.pageInfo.menuEn);
  const subMenu = useSelector((state) => state.pageInfo.subMenu);
  const currentPage = useSelector((state) => state.pageInfo.currentPage);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  return (
    <div className={`${style.lnb} lnbCompo`}>
      <h2>
        {menuKR}
        <span>{menuEn}</span>
      </h2>
      {currentPage.path === "/job-offer" || currentPage.path === "/applied-list" ? (
        <div className="filterWrap">
          <div>
            <div className={`${style.filter} ${show1 ? style.on : ""}`}>
              <strong onClick={() => setShow1(!show1)}>유형선택</strong>
              <motion.div initial={false} animate={{ height: show1 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
                <button className={onOFfFilter === "all" ? style.active : ""} onClick={() => onOffChange("all")}>
                  전체
                </button>
                <button className={onOFfFilter === "onLine" ? style.active : ""} onClick={() => onOffChange("onLine")}>
                  온라인
                </button>
                <button className={onOFfFilter === "offLine" ? style.active : ""} onClick={() => onOffChange("offLine")}>
                  오프라인
                </button>
              </motion.div>
            </div>
            <div className={`${style.filter} ${show2 ? style.on : ""}`}>
              <strong onClick={() => setShow2(!show2)}>모집상태</strong>
              <motion.div initial={false} animate={{ height: show2 ? "auto" : 0 }} style={{ overflow: "hidden" }} transition={{ duration: 0.3 }}>
                <button className={statusFilter === "all" ? style.active : ""} onClick={() => statusChange("all")}>
                  전체
                </button>
                <button className={statusFilter === 1 ? style.active : ""} onClick={() => statusChange(1)}>
                  모집중
                </button>
                <button className={statusFilter === 2 ? style.active : ""} onClick={() => statusChange(2)}>
                  예약중
                </button>
                <button className={statusFilter === 3 ? style.active : ""} onClick={() => statusChange(3)}>
                  완료
                </button>
                <button className={statusFilter === -1 ? style.active : ""} onClick={() => statusChange(-1)}>
                  취소
                </button>
              </motion.div>
            </div>
            <button className="filterBtn btn primary yellow" onClick={lnbHandler}>
              검색
            </button>
          </div>
        </div>
      ) : null}
      {subMenu.length > 0 && (
        <nav>
          {subMenu.map((menu) => (
            <Link to={menu.path} className={`${style.menuLink} ${currentPage.pageName === menu.pageName ? style.on : ""}`} key={menu.pageName}>
              {menu.pageName}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Lnb;
