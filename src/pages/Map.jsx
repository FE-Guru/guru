/* global kakao */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../store/ref";
import styles from "../css/Map.module.css";

// Kakao Maps API 스크립트를 동적으로 추가하는 함수
const loadKakaoMapScript = (callback) => {
  const script = document.createElement("script");
  script.src = `${process.env.REACT_APP_MAP_URL}appkey=${process.env.REACT_APP_MAP_JAVASCRIPT_APPKEY}&libraries=services,clusterer`;
  script.async = true;
  script.onload = () => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(callback);
    } else {
      console.error("Failed to load Kakao Maps API.");
    }
  };
  script.onerror = () => {
    console.error("Error loading Kakao Maps API script.");
  };
  document.head.appendChild(script);
};

// 날짜 포맷 함수
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};

const Map = ({ jobList, location }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [map, setMap] = useState(null); // 지도 객체 상태
  const [markers, setMarkers] = useState([]); // 마커 상태

  // 지도 스크립트 로드 및 지도 초기화
  useEffect(() => {
    loadKakaoMapScript(() => {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }
      const mapOption = {
        center: new kakao.maps.LatLng(location.lat, location.lon), // 지도 중심좌표를 현재 내 위치로 지정
        level: 3,
      };

      const mapInstance = new kakao.maps.Map(mapContainer, mapOption);
      setMap(mapInstance);
    });
  }, [location.lat, location.lon]);

  // 지도의 중심을 현재 위치로 업데이트
  useEffect(() => {
    if (map) {
      const moveLatLon = new kakao.maps.LatLng(location.lat, location.lon);
      map.setCenter(moveLatLon);
    }
  }, [location, map]);

  // 지도와 마커 클러스터러 설정
  useEffect(() => {
    if (map && jobList.length > 0 && markers.length === 0) {
      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4,
      });

      const fetchUser = async (emailID) => {
        try {
          const response = await fetch(`${url}/job/findUserData/${emailID}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return await response.json();
        } catch (error) {
          console.error("Failed to fetch data", error);
          return null;
        }
      };

      const createMarker = async (job) => {
        const userData = await fetchUser(job.emailID);
        if (!userData) return null;

        const imgSrc = userData.image ? `${url}/${userData.image}` : `${process.env.PUBLIC_URL}/img/common/no_img.jpg`;
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(job.location.mapY, job.location.mapX), // 각 일거리의 좌표
        });

        // 날짜 형식 수정 ex) 2024-06-24 ~ 2024-06-24
        const workStartDate = formatDate(job.workStartDate);
        const workEndDate = formatDate(job.workEndDate);

        const content = document.createElement("div");
        content.innerHTML = `
          <div class="${styles.wrap}">
            <div class="${styles.info}">
              <div class="${styles.title}">
                ${job.title}
                <i class="fa-solid fa-xmark ${styles.close}" title="닫기"></i>
              </div>
              <div class="${styles.body}">
                <div class="${styles.img}">
                  <img src="${imgSrc}" >
                </div>
                <div class="${styles.desc}">
                  <div class="${styles.ellipsis}">${job.location.address}</div>
                  <div class="${styles.jibun}">${workStartDate} ~ ${workEndDate}</div>
                  <div><a href="#" class="${styles.link}" data-id="${job._id}">리스트로 이동 ></a></div>
                </div>
              </div>
            </div>
          </div>
        `;

        const overlay = new kakao.maps.CustomOverlay({
          content: content,
          position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, "click", function () {
          overlay.setMap(map);
        });

        const closeBtn = content.querySelector(`.${styles.close}`);
        closeBtn.addEventListener("click", () => overlay.setMap(null));

        const listLink = content.querySelector(`.${styles.link}`);
        listLink.addEventListener("click", (e) => {
          e.preventDefault();
          const jobId = e.target.getAttribute("data-id");
          navigate(`/job-detail`, { state: { _id: jobId } });
        });

        return marker;
      };

      const createMarkers = async () => {
        const newMarkers = await Promise.all(jobList.map(createMarker));
        const filteredMarkers = newMarkers.filter((marker) => marker !== null);
        setMarkers(filteredMarkers);
        clusterer.addMarkers(filteredMarkers);
      };

      createMarkers();
    }
  }, [map, jobList, location, navigate, markers]);

  return (
    <div>
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Map;
