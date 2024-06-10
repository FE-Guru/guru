import { useEffect, useState } from 'react';
const { kakao } = window;

// 마커 데이터
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
  let openInfowindow = null;

  useEffect(() => {
    // 지도 컨테이너를 설정하고 지도를 생성합니다.
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.530344, 126.964869),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);

    // 클러스터러를 생성합니다.
    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 클러스터러가 적용될 지도 객체
      averageCenter: true, // 클러스터의 중심을 평균 좌표로 설정
      minLevel: 6, // 클러스터가 생성될 최소 지도 레벨
    });

    // 마커 배열을 초기화합니다.
    const markers = [];

    for (let i = 0; i < locationData.length; i++) {
      // 마커가 표시될 위치를 설정합니다.
      var markerPosition = new kakao.maps.LatLng(
        locationData[i].locationNum[0],
        locationData[i].locationNum[1]
      );
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 인포윈도우 내용을 생성합니다.
      var infowindow = new kakao.maps.InfoWindow({
        position: markerPosition,
        content: `
          <div>
            <a href="${locationData[i].link}" target="_blank">
              <span>${locationData[i].title}</span><br>
              <span>${locationData[i].locationName}</span>
            </a>
          </div>
        `,
      });

      // 마커에 클릭 이벤트를 등록합니다.
      kakao.maps.event.addListener(
        marker,
        'click',
        makeClickListener(map, marker, infowindow)
      );

      // 마커 배열에 마커를 추가합니다.
      markers.push(marker);
    }

    // 클러스터러에 마커들을 추가합니다.
    clusterer.addMarkers(markers);

    // 클릭 리스너를 생성하는 함수입니다.
    function makeClickListener(map, marker, infowindow) {
      return function () {
        // 열린 인포윈도우가 있으면 닫습니다.
        if (openInfowindow) {
          openInfowindow.close();
        }
        // 새로운 인포윈도우를 엽니다.
        infowindow.open(map, marker);
        // 현재 열린 인포윈도우를 갱신합니다.
        openInfowindow = infowindow;
      };
    }
  }, [locationData]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Map;
