import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { url } from "../store/ref";
import Lnb from "../components/Lnb";
import JobItem from "../components/JobItem";

const AppliedList = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([]);
  const currentPage = useSelector((state) => state.pageInfo.currentPage);
  useEffect(() => {
    dispatch(
      setPageInfo({
        menuKR: "지원목록",
        menuEn: "Applied List",
        currentPage: { pageName: "지원목록", path: "/applied-list" },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetch(`${url}/job/applied`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
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
                <JobItem item={item} applied={true} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AppliedList;
