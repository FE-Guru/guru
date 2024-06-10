import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import Lnb from "../components/Lnb";

const JobOffer = () => {
  const dispatch = useDispatch();
  const pageInfo = useMemo(
    () => ({
      menuKR: "구인관리",
      menuEn: "Job Offer",
      currentPage: { pageName: "구인관리", path: "/job-offer" },
    }),
    []
  );
  useEffect(() => {
    dispatch(setPageInfo(pageInfo));
  }, [dispatch, pageInfo]);
  return (
    <main className="subPage">
      <section className="mw">
        <Lnb />
        <div className="contents">
          <div className="conTitle">
            <h3>currentPager가져오기</h3>
            <button>필터</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobOffer;
