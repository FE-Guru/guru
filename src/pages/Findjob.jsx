import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCateType } from "../store/findjob";
import JobItem from "../components/JobItem";
import Filter from "../components/Filter";
import Map from "./Map";
import "../css/Findjob.css";

const Findjob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCateType({ cateType: "onLine" }));
  }, [dispatch]);
  const cateType = useSelector((state) => state.findjob.cateType);

  const callOnLine = () => {
    dispatch(setCateType({ cateType: "onLine" }));
  };
  const callOffLine = () => {
    dispatch(setCateType({ cateType: "offLine" }));
  };

  const pageH3 = cateType === "onLine" ? "온라인" : "오프라인";

  return (
    <main className={`${cateType} findjob`}>
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
        <Filter />
        <div className="contents">
          <div className="conTitle">
            <h3>{pageH3}</h3>
            <button>필터</button>
          </div>
          <ul className="JobList">
            {cateType === "offLine" ? (
              <li className="mapApiArea">
                <Map/>
              </li>
            ) : null}
            <li>
              <JobItem />
            </li>
            <li>
              <JobItem />
            </li>
            <li>
              <JobItem />
            </li>
            <li>
              <JobItem />
            </li>
            <li>
              <JobItem />
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Findjob;
