import { useEffect, useState } from 'react';
import styles from '../css/Map.module.css';

const { kakao } = window;

// 초기 위치 데이터 설정
const initialLocationData = [
  {
    locationNum: [37.530344, 126.964869],
    title: '일거리1',
    locationName: '용산역',
    link: '일거리1링크주소',
    price: 12000,
  },
  {
    locationNum: [37.529066239273085, 126.96789994653186],
    title: '일거리2',
    locationName: '신용산역',
    link: '일거리2링크주소',
    price: 12000,
  },
  {
    locationNum: [37.52814944885297, 126.96591108854732],
    title: '일거리3',
    locationName: '용산역 앞 잔디 광장',
    link: '일거리3링크주소',
    price: 12000,
  },
];

const Map = () => {
  const [locationData, setLocationData] = useState(initialLocationData);
  let openOverlay = null;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.530344, 126.964869),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 6,
    });

    const markers = [];

    for (let i = 0; i < locationData.length; i++) {
      const markerPosition = new kakao.maps.LatLng(
        locationData[i].locationNum[0],
        locationData[i].locationNum[1]
      );

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 커스텀 오버레이에 표시할 컨텐츠
      const content = document.createElement('div');
      content.className = styles.wrap;
      content.innerHTML = `
        <div class="${styles.info}">
          <div class="${styles.title}">
            ${locationData[i].title}
            <i class="fa-solid fa-xmark ${styles.close}" title="닫기"></i>          
          </div>
          <div class="${styles.body}">
            <div class="${styles.img}">
              <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
            </div>
            <div class="${styles.desc}">
              <div class="${styles.ellipsis}">${locationData[i].locationName}</div>
              <div class="${styles.jibun}">용산역</div>
              <div><a href="${locationData[i].link}" target="_blank" class="${styles.link}">리스트로 이동 ></a></div>
            </div>
          </div>
        </div>
      `;

      // 닫기 버튼에 이벤트 리스너 추가
      const closeBtn = content.querySelector(`.${styles.close}`);
      closeBtn.onclick = () => overlay.setMap(null);

      // 커스텀 오버레이 생성
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: marker.getPosition(),
      });

      overlay.setMap(null); // 초기에는 오버레이를 표시하지 않음

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        if (openOverlay) {
          openOverlay.setMap(null);
        }
        overlay.setMap(map);
        openOverlay = overlay;
      });

      markers.push(marker);
    }

    clusterer.addMarkers(markers);
  }, [locationData]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Map;
