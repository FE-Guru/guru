import { useEffect, useState } from "react";
import { url } from "../store/ref";
import MainJobItem from "./MainJobItem";
import style from "../css/Main.module.css";

const MainOnline = () => {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/job/mainOnline`, {
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
          <li>등록된 온라인 일자리가 없습니다.</li>
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
