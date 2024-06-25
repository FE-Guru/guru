import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCateType } from "../store/findjob";
import { url } from "../store/ref";
import JobItem from "../components/JobItem";
import Filter from "../components/Filter";
import Map from "./Map";
import "../css/Findjob.css";

const Findjob = () => {
  const dispatch = useDispatch();
  const cateType = useSelector((state) => state.findjob.cateType);
  const [jobList, setJobList] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [location, setLocation] = useState({ lat: 37.529325, lon: 126.965706 });
  const [loadPage, setLoadPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cateTalent, setCateTalent] = useState("all");
  const [cateField, setCateField] = useState("all");
  const [cateTime, setCateTime] = useState("all");
  const [lnbHas, setLnbHas] = useState(false);
  const [modalAlert, setModalAlert] = useState(null);

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
    dispatch(setCateType({ cateType: "onLine" }));
  }, [dispatch]);

  const callOnLine = () => {
    dispatch(setCateType({ cateType: "onLine" }));
    setLoadPage(1);
    setJobList([]);
  };
  const callOffLine = () => {
    dispatch(setCateType({ cateType: "offLine" }));
    setLoadPage(1);
    setJobList([]);
  };

  useEffect(() => {
    fetchData();
  }, [loadPage, cateType]);

  useEffect(() => {
    filterJobs();
  }, [cateTalent, cateField, jobList, cateType]);

  const pageH3 = cateType === "onLine" ? "온라인" : "오프라인";

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { lat, lon } = location;
      const queryType = cateType === "offLine" ? `&lat=${lat}&lon=${lon}` : "";
      const endpoint = cateType === "offLine" ? "findoffLine" : "findonLine";
      const response = await fetch(`${url}/job/${endpoint}?page=${loadPage}${queryType}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setJobList((prevJobList) => {
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
    if (cateType === "onLine") {
      if (cateTalent !== "all") {
        filteredList = filteredList.filter((job) => job.category.talent === cateTalent && job.category.jobType === "onLine");
      }
      if (cateField !== "all") {
        filteredList = filteredList.filter((job) => job.category.field === cateField && job.category.jobType === "onLine");
      }
    } else if (cateType === "offLine") {
      if (cateTalent !== "all") {
        filteredList = filteredList.filter((job) => job.category.talent === cateTalent && job.category.jobType === "offLine");
      }
      if (cateField !== "all") {
        filteredList = filteredList.filter((job) => job.category.field === cateField && job.category.jobType === "offLine");
      }
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
  const talentChange = useCallback((filter) => {
    setCateTalent(filter);
  }, []);
  const fieldChange = useCallback((filter) => {
    setCateField(filter);
  }, []);
  const lnbHandler = () => {
    setLnbHas(!lnbHas);
  };

  /* 모달 */
  const showAlert = useCallback((content) => {
    setModalAlert(content);
  }, []);
  const closeAlert = useCallback(() => {
    setModalAlert(null);
  }, []);

  return (
    <main className={`${cateType} findjob  ${lnbHas ? "has" : ""}`}>
      <section className="topSection">
        <div className="mw">
          <h2>
            일자리 찾기
            <span>Find Job</span>
          </h2>
          <div className="tab">
            <button onClick={callOnLine} className={`${cateType === "onLine" ? "on" : ""}`}>
              온라인
            </button>
            <button onClick={callOffLine} className={`${cateType === "offLine" ? "on" : ""}`}>
              오프라인
            </button>
          </div>
          <form>
            <label>
              <input type="text" placeholder="키워드를 입력해주세요." />
              <button type="submit"></button>
            </label>
          </form>
        </div>
      </section>
      <section className="mw midSection">
        <Filter cateTalent={cateTalent} cateField={cateField} cateTime={cateTime} talentChange={talentChange} fieldChange={fieldChange} lnbHas={lnbHas} lnbHandler={lnbHandler} />
        <div className="contents">
          <div className="conTitle">
            <h3>{pageH3}</h3>
            <button>필터</button>
          </div>
          <ul className="JobList">
            {cateType === "offLine" && (
              <li className="mapApiArea">
                <Map jobList={jobList} location={location} setLocation={setLocation} />
              </li>
            )}
            {filteredJobList.length === 0 ? (
              <li>등록된 일자리가 없습니다.</li>
            ) : (
              filteredJobList.map((item) => (
                <li key={item._id}>
                  <JobItem item={item} findjob={true} />
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Findjob;
