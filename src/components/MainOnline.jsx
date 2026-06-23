import { useEffect, useState } from "react";
import { url } from "../store/ref";
import MainJobItem from "./MainJobItem";
import style from "../css/Main.module.css";

const MainOnline = () => {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/mainOnline`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setJobList(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style.onWrap}>
      <ul className={style.jobList}>
        {jobList.length === 0 ? (
          <li className={style.emptyJob}>
            <strong>등록된 온라인 일자리가 없습니다.</strong>
            <span>새로운 일자리가 등록되면 이곳에서 확인할 수 있어요.</span>
          </li>
        ) : (
          jobList.map((item) => (
            <li key={item._id}>
              <MainJobItem item={item} tpye={"onLine"} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MainOnline;
