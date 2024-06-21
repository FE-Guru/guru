import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { url } from "../store/ref";
import Lnb from "../components/Lnb";
import JobItem from "../components/JobItem";

const JobOffer = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [onOFffilter, setOnOffFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loadPage, setLoadPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentPage = useSelector((state) => state.pageInfo.currentPage);

  /*스크롤 이벤트 중복 방지*/
  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  };

  /* 페이지 설정 */
  useEffect(() => {
    dispatch(
      setPageInfo({
        menuKR: "구인관리",
        menuEn: "Job Offer",
        currentPage: { pageName: "구인관리", path: "/job-offer" },
      })
    );
  }, [dispatch]);

  /* fetch 함수 실행 */
  useEffect(() => {
    fetchData();
  }, [loadPage]);
  useEffect(() => {
    filterJobs();
  }, [onOFffilter, statusFilter, jobList]);

  const fetchData = async () => {
    if (loading) return; // 이미 로딩 중이면 새로운 요청을 방지
    setLoading(true); // 로딩 상태 시작
    try {
      const response = await fetch(`${url}/job/jobOffer?page=${loadPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setJobList((prevJobList) => {
          // 기존 데이터를 새로운 데이터와 병합하여 설정
          const newJobList = [...prevJobList, ...data];
          const uniqueJobList = newJobList.filter((job, index, self) => index === self.findIndex((j) => j._id === job._id));
          return uniqueJobList;
        });
        const totalCount = parseInt(response.headers.get("X-Total-Count"), 10);
        setTotalJobs(totalCount);
      } else {
        alert("네트워크 오류");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* 필터링 함수 */
  const filterJobs = () => {
    let filteredList = jobList;
    if (onOFffilter !== "all") {
      filteredList = filteredList.filter((job) => job.category.jobType === onOFffilter);
    }
    console.log(statusFilter);
    if (statusFilter !== "all") {
      filteredList = filteredList.filter((job) => job.status === statusFilter);
    }
    setFilteredJobList(filteredList);
  };

  /*스크롤 증가 이벤트*/
  const scrollEv = throttle(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (windowHeight + scrollTop >= documentHeight - 210 && !loading) {
      if (jobList.length < totalJobs) {
        setLoadPage((prevPage) => prevPage + 1);
      }
    }
  }, 200);

  /* 스크롤 이벤트 상태관리*/
  useEffect(() => {
    window.addEventListener("scroll", scrollEv);
    return () => {
      window.removeEventListener("scroll", scrollEv);
    };
  }, [jobList, totalJobs, loading]);

  /* 필터링 */
  const onOffChange = useCallback((filter) => {
    setOnOffFilter(filter);
  }, []);
  const statusChange = useCallback((filter) => {
    setStatusFilter(filter);
  }, []);

  return (
    <main className="subPage jobOffer">
      <section className="mw">
        <Lnb onOFfFilter={onOFffilter} statusFilter={statusFilter} onOffChange={onOffChange} statusChange={statusChange} />
        <div className="contents">
          <div className="conTitle">
            <h3> {currentPage.pageName}</h3>
            <button className="LobHandler"></button>
          </div>
          <ul className="boxContainer">
            {filteredJobList.length === 0 ? (
              <li>등록된 구인글이 없습니다.</li>
            ) : (
              filteredJobList.map((item) => (
                <li key={item._id}>
                  <JobItem item={item} jobOffer={true} />
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
