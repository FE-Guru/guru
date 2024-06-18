import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { url } from "../store/ref";
import Lnb from "../components/Lnb";
import JobItem from "../components/JobItem";

const JobOffer = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([]);
  const currentPage = useSelector((state) => state.pageInfo.currentPage);

  useEffect(() => {
    dispatch(
      setPageInfo({
        menuKR: "구인관리",
        menuEn: "Job Offer",
        currentPage: { pageName: "구인관리", path: "/job-offer" },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/job/jobOffer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("네트워크 오류");
        }
        const data = await response.json();
        setJobList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const checkDel = useCallback((delID) => {
    setJobList((prevJobList) => prevJobList.filter((item) => item._id !== delID));
  }, []);
  return (
    <main className="subPage jobOffer">
      <section className="mw">
        <Lnb />
        <div className="contents">
          <div className="conTitle">
            <h3> {currentPage.pageName}</h3>
            <button className="LobHandler"></button>
          </div>
          <ul className="boxContainer">
            {jobList.length === 0 ? (
              <li>등록된 구인글이 없습니다.</li>
            ) : (
              jobList.map((item) => (
                <li key={item._id}>
                  <JobItem item={item} jobOffer={true} onDel={checkDel} />
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default JobOffer;
