import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../css/Lnb.module.css";

const Lnb = () => {
  const menuKR = useSelector((state) => state.pageInfo.menuKR);
  const menuEn = useSelector((state) => state.pageInfo.menuEn);
  const subMenu = useSelector((state) => state.pageInfo.subMenu);
  const currentPage = useSelector((state) => state.pageInfo.currentPage);
  return (
    <div className={style.lnb}>
      <h2>
        {menuKR}
        <span>{menuEn}</span>
      </h2>
      {subMenu.length > 0 && (
        <nav>
          {subMenu.map((menu) => (
            <Link to={menu.path} className={`${currentPage === menu.pageName ? "on" : ""}`} key={menu.pageName}>
              {menu.pageName}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Lnb;
