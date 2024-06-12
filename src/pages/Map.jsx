import React, { useEffect, useState } from 'react';
import styles from '../css/Map.module.css';

const initialLocationData = [
  {
    locationNum:  [37.530344, 126.964869],
    title: '일거리1',
    locationName: '용산역',
    address: '서울특별시 용산구 한강대로23길 55',
    link: '일거리1링크주소',
    price: 12000,
  },
  {
    locationNum:  [37.529066239273085, 126.96789994653186],
    title: '일거리2',
    locationName: '신용산역',
    address: '서울 용산구 한강대로 지하 112',
    link: '일거리2링크주소',
    price: 12000,
  },
  {
    locationNum: [37.52814944885297, 126.96591108854732],
    title: '일거리3',
    locationName: '용산역 앞 잔디 광장',
    address: '서울 용산구 한강로2가 421',
    link: '일거리3링크주소',
    price: 12000,
  },
];

// initialLocationData.address 를 위도 경도로 initialLocationData.locationNum 으로 넣는 함수
function changeLocationNum(params) {

  
}





// 현재 사용자 위치 계산
function getDistance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

const Map = () => {
  const [locationData, setLocationData] = useState(initialLocationData);
  const [center, setCenter] = useState(null); // 지도 중심 좌표 상태 추가
  let openOverlay = null;

  // 지도 연결
  useEffect(() => {
    if (center) {
      // center가 설정된 후에만 지도 초기화
      const script = document.createElement('script');
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?appkey=aabd871dd02ef84bd5ee8aa2dfc5fbf5=clusterer';
      script.async = true;
      script.onload = () => {
        if (!window.kakao || !window.kakao.maps) {
          console.error('Kakao maps SDK not loaded');
          return;
        }

        const container = document.getElementById('map');
        const options = {
          // 지도 첫 화면의 위도 경도
          center: new window.kakao.maps.LatLng(
            center.latitude,
            center.longitude
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 6,
        });

        const markers = [];

        locationData.forEach((location) => {
          const markerPosition = new window.kakao.maps.LatLng(
            location.locationNum[0],
            location.locationNum[1]
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          const content = document.createElement('div');
          content.className = styles.wrap;
          content.innerHTML = `
            <div class="${styles.info}">
              <div class="${styles.title}">
                ${location.title}
                <i class="fa-solid fa-xmark ${styles.close}" title="닫기"></i>
              </div>
              <div class="${styles.body}">
                <div class="${styles.img}">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="63" height="60">
                </div>
                <div class="${styles.desc}">
                  <div class="${styles.ellipsis}">${location.locationName}</div>
                  <div class="${styles.jibun}">용산역</div>
                  <div><a href="${location.link}" target="_blank" class="${styles.link}">리스트로 이동 ></a></div>
                </div>
              </div>
            </div>
          `;

          const closeBtn = content.querySelector(`.${styles.close}`);
          closeBtn.onclick = () => overlay.setMap(null);

          const overlay = new window.kakao.maps.CustomOverlay({
            content: content,
            position: marker.getPosition(),
          });

          overlay.setMap(null);

          window.kakao.maps.event.addListener(marker, 'click', () => {
            if (openOverlay) {
              openOverlay.setMap(null);
            }
            overlay.setMap(map);
            openOverlay = overlay;
          });

          markers.push(marker);
        });

        clusterer.addMarkers(markers);
      };

      document.head.appendChild(script);
    }
  }, [center, locationData]);

  // 내 현재 위치 받아오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCenter({ latitude, longitude }); // 현재 위치를 지도 중심으로 설정

        const updatedLocationData = locationData.map((location) => {
          const distance = getDistance(
            latitude,
            longitude,
            location.locationNum[0],
            location.locationNum[1]
          );
          return {
            ...location,
            distance,
          };
        });

        const sortedLocationData = updatedLocationData.sort(
          (a, b) => a.distance - b.distance
        );

        setLocationData(sortedLocationData);

        console.log('새로운 배열 -> ', sortedLocationData);
      },
      (err) => {
        console.error('Geolocation error:', err);
      }
    );
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Map;
