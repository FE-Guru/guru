import { useEffect, useState } from "react";
import { url } from "../store/ref";
import MainJobItem from "./MainJobItem";
import Map from "../pages/Map";
import style from "../css/Main.module.css";

const MainOffline = () => {
  const [jobList, setJobList] = useState([]);
  const [location, setLocation] = useState({ lat: 37.529325, lon: 126.965706 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ lat: latitude, lon: longitude });
              const response = await fetch(`${url}/job/mainOffline?&lat=${latitude}&lon=${longitude}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();
              if (response.ok) {
                setJobList(data);
              } else {
                console.log("notAuthorized");
              }
            },
            (error) => {
              console.error("Error getting geolocation:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={style.offWrap}>
      <div className={style.mainMap}>
        <Map jobList={jobList} location={location} setLocation={setLocation} setJobList={setJobList} endpoint={"mainOffline"} />
      </div>
      <ul className={style.jobList}>
        {jobList.length === 0 ? (
          <li>등록된 온라인 일자리가 없습니다.</li>
        ) : (
          jobList.map((item) => (
            <li key={item._id}>
              <MainJobItem item={item} tpye={"offLine"} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MainOffline;
