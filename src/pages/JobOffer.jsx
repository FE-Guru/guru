import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { url } from "../store/ref";
import Lnb from "../components/Lnb";
import JobItem from "../components/JobItem";

const JobOffer = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([]);
  const currentPage = useSelector((state) => state.pageInfo.currentPage);
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

  useEffect(() => {
    fetch(`${url}/job/jobOffer`)
      .then((res) => res.json())
      .then((data) => setJobList(data));
  }, []);
  return (
    <main className="subPage jobOffer">
      <section className="mw">
        <Lnb />
        <div className="contents">
          <div className="conTitle">
            <h3> {currentPage.pageName}</h3>
            <button>필터</button>
          </div>
          <ul className="boxContainer">
            {jobList.map((item) => (
              <li key={item._id}>
                <JobItem item={item} jobOffer={true} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default JobOffer;
