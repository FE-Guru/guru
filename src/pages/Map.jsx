/* global kakao */
import React, { useEffect, useState } from "react";
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
  const [map, setMap] = useState(null); // 지도 객체 상태

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
    if (map && jobList.length > 0) {
      // 마커 클러스터러를 생성합니다
      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4,
      });

      const markers = jobList.map((job) => {
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
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="63" height="60">
                </div>
                <div class="${styles.desc}">
                  <div class="${styles.ellipsis}">${job.location.address}</div>
                  <div class="${styles.jibun}">${workStartDate} ~ ${workEndDate}</div>
                  <div><a href="${job.link}" target="_blank" class="${styles.link}">리스트로 이동 ></a></div>
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

        // 오버레이 닫기 함수
        function closeOverlay() {
          overlay.setMap(null);
        }

        // 닫기 버튼에 이벤트 리스너 추가
        const closeBtn = content.querySelector(`.${styles.close}`);
        closeBtn.addEventListener("click", closeOverlay);

        return marker;
      });

      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(markers);
    }
  }, [map, jobList, location]);

  return (
    <div>
      <div id="map"></div>
    </div>
  );
};

export default Map;
