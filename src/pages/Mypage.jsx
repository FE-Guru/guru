import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageInfo, setSubPage } from "../store/pageInfo";
import Lnb from "../components/Lnb";

const Mypage = () => {
  const dispatch = useDispatch();
  const pageInfo = useMemo(
    () => ({
      menuKR: "마이 페이지",
      menuEn: "My Page",
      currentPage: { pageName: "마이페이지", path: "/mypage" },
    }),
    []
  );
  const subPage = useMemo(
    () => ({
      subMenu: [
        { pageName: "프로필 수정", path: "/mypage/profileEdit" },
        { pageName: "결제 관리", path: "/mypage" },
        { pageName: "알람", path: "/mypage" },
        { pageName: "회원정보 수정", path: "/mypage" },
      ],
    }),
    []
  );
  useEffect(() => {
    dispatch(setPageInfo(pageInfo));
    dispatch(setSubPage(subPage));
  }, [dispatch, pageInfo]);
  return (
    <main className="subPage">
      <section className="mw">
        <Lnb />
        <Outlet></Outlet>
      </section>
    </main>
  );
};

export default Mypage;