import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCateType } from "../store/findjob";
import { setCateField, setCateTalent } from "../store/filter";
import { url } from "../store/ref";
import JobItem from "../components/JobItem";
import Filter from "../components/Filter";
import Map from "./Map";
import "../css/Findjob.css";

const Findjob = () => {
  const dispatch = useDispatch();
  const cateType = useSelector((state) => state.findjob.cateType);
  const cateTalent = useSelector((state) => state.filter.cateTalent);
  const cateField = useSelector((state) => state.filter.cateField);
  const [jobList, setJobList] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [location, setLocation] = useState({ lat: 37.529325, lon: 126.965706 });
  const [loadPage, setLoadPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cateTime, setCateTime] = useState([0, 1440]);
  const [titleText, setTitleText] = useState("");
  const [lnbHas, setLnbHas] = useState(false);
  const [modalAlert, setModalAlert] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

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
    dispatch(setCateField("all"));
    dispatch(setCateTalent("all"));
    setLoadPage(1);
    setJobList([]);
  };
  const callOffLine = () => {
    dispatch(setCateType({ cateType: "offLine" }));
    dispatch(setCateField("all"));
    dispatch(setCateTalent("all"));
    setLoadPage(1);
    setJobList([]);
  };

  useEffect(() => {
    fetchData();
  }, [loadPage, cateType]);

  useEffect(() => {
    filterJobs();
  }, [cateTalent, cateField, jobList, cateType, cateTime]);

  const pageH3 = cateType === "onLine" ? "온라인" : "오프라인";

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });

            const queryType = cateType === "offLine" ? `&lat=${latitude}&lon=${longitude}` : "";
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
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
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
      if (cateTime[0] !== 0 || cateTime[1] !== 1440) {
        const [startTime, endTime] = cateTime;
        filteredList = filteredList.filter((job) => job.category.time >= startTime && job.category.time <= endTime && job.category.jobType === "onLine");
      }
    } else if (cateType === "offLine") {
      if (cateTalent !== "all") {
        filteredList = filteredList.filter((job) => job.category.talent === cateTalent && job.category.jobType === "offLine");
      }
      if (cateField !== "all") {
        filteredList = filteredList.filter((job) => job.category.field === cateField && job.category.jobType === "offLine");
      }
      if (cateTime[0] !== 0 || cateTime[1] !== 1440) {
        const [startTime, endTime] = cateTime;
        filteredList = filteredList.filter((job) => job.category.time >= startTime && job.category.time <= endTime && job.category.jobType === "offLine");
      }
    }
    enableScroll();
    setFilteredJobList(filteredList);
  };

  const searchTitle = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });

          const queryType = cateType === "offLine" ? `&lat=${latitude}&lon=${longitude}` : "";
          const endpoint = cateType === "offLine" ? "alloffLine" : "allonLine";
          const response = await fetch(`${url}/job/${endpoint}??&titleText=${titleText}${queryType}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (response.ok) {
            setFilteredJobList(Array.isArray(data) ? data : []);
            setTitleText("");
            disableScroll();
          } else {
            setModalAlert("notAuthorized");
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const disableScroll = () => {
    window.removeEventListener("scroll", scrollEv);
    setScrollEnabled(false);
  };

  const enableScroll = () => {
    if (!scrollEnabled) {
      window.addEventListener("scroll", scrollEv);
      setScrollEnabled(true);
    }
  };
  /*스크롤 증가 이벤트*/
  const scrollEv = throttle(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (windowHeight + scrollTop >= documentHeight - 210) {
      if (jobList.length < totalJobs) {
        setLoadPage((prevPage) => prevPage + 1);
      }
    }
  }, 200);

  /* 스크롤 이벤트 상태관리*/
  useEffect(() => {
    if (scrollEnabled && !titleText) {
      window.addEventListener("scroll", scrollEv);
    }
    return () => {
      window.removeEventListener("scroll", scrollEv);
    };
  }, [jobList, totalJobs, scrollEnabled, titleText]);

  /* 필터링 */
  const talentChange = useCallback(
    (filter) => {
      dispatch(setCateTalent(filter));
    },
    [dispatch]
  );
  const fieldChange = useCallback(
    (filter) => {
      dispatch(setCateField(filter));
    },
    [dispatch]
  );
  const timeChange = useCallback((filter) => {
    setCateTime(filter);
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
          <label>
            <input
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="키워드를 입력해주세요."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchTitle();
                }
              }}
            />
            <button type="button" onClick={searchTitle}></button>
          </label>
        </div>
      </section>
      <section className="mw midSection">
        <Filter
          cateTalent={cateTalent}
          cateField={cateField}
          cateTime={cateTime}
          talentChange={talentChange}
          fieldChange={fieldChange}
          timeChange={timeChange}
          lnbHas={lnbHas}
          lnbHandler={lnbHandler}
        />
        <div className="contents">
          <div className="conTitle">
            <h3>{pageH3}</h3>
            <button className="LobHandler" onClick={lnbHandler}></button>
          </div>
          <ul className="JobList">
            {cateType === "offLine" && (
              <li className="mapApiArea">
                <Map jobList={jobList} location={location} setLocation={setLocation} setJobList={setJobList}/>
              </li>
            )}
            {filteredJobList.length === 0 ? (
              <li className="noneList">필터를 선택해 주세요. 조건에 맞는 일자리가 없습니다.</li>
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
