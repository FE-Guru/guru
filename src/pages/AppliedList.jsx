import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import Lnb from "../components/Lnb";
import JobItem from "../components/JobItem";

const AppliedList = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [onOFffilter, setOnOffFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loadPage, setLoadPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lnbHas, setLnbHas] = useState(false);

  const [modalAlert, setModalAlert] = useState(null);
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

  useEffect(() => {
    dispatch(
      setPageInfo({
        menuKR: "지원목록",
        menuEn: "Applied List",
        currentPage: { pageName: "지원목록", path: "/applied-list" },
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
      const response = await fetch(`${url}/job/applied?page=${loadPage}`, {
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
        setModalAlert("notAuthorized");
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
  /* 모달 */
  const showAlert = useCallback((content) => {
    setModalAlert(content);
  }, []);
  const closeAlert = useCallback(() => {
    setModalAlert(null);
  }, []);
  const lnbHandler = () => {
    setLnbHas(!lnbHas);
  };
  return (
    <main className={`subPage appliedList ${lnbHas ? "has" : ""}`}>
      <section className="mw">
        <Lnb onOFfFilter={onOFffilter} statusFilter={statusFilter} onOffChange={onOffChange} statusChange={statusChange} lnbHas={lnbHas} lnbHandler={lnbHandler} />
        <div className="contents">
          <div className="conTitle">
            <h3> {currentPage.pageName}</h3>
            <button className="LobHandler" onClick={lnbHandler}></button>
          </div>
          <ul className="boxContainer">
            {filteredJobList.length === 0 ? (
              <li>지원한 이력이 없습니다.</li>
            ) : (
              filteredJobList.map((item) => (
                <li key={item._id}>
                  <JobItem item={item} applied={true} />
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "notAuthorized" && <ModalAlert close={closeAlert} desc={"로그인이 필요한 페이지입니다."} error={true} confirm={false} goPage={"/login"} />}
        </Modal>
      )}
    </main>
  );
};

export default AppliedList;
