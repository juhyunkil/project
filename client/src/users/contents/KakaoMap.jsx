/* global kakao */
import { makeStyles } from '@material-ui/core/styles';
import { CompareArrowsOutlined } from '@material-ui/icons';
import React, { useEffect, useState, useRef ,useReducer} from "react";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
    fullWidth: true,
  },
}));


export default function KakaoMap(props) {
  const { markerPositions, size } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const container = useRef();
  const [lat,setlat]=useState(0.0);
  const [lng,setlng]=useState(0.0);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=2a561240322bc26f18041491f777e18c&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3
        };
        const map = new kakao.maps.Map(container.current, options);
        //setMapCenter(center);
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(33.450701, 126.570667)
        });
        marker.setMap(map)
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
          
            var latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                message += '경도는 ' + latlng.getLng() + ' 입니다';
            setlat(latlng.getLat());
            setlng(latlng.getLng());
            alert(message);
            console.log("경도는" + latlng.getLng());
        });
        setKakaoMap(map);
      });
    
    };
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    // save center position
    const center = kakaoMap.getCenter();

    // change viewport size
    const [width, height] = size;
    container.current.style.width = `${width}px`;
    container.current.style.height = `${height}px`;

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
  }, [kakaoMap, size]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    const positions = markerPositions.map(pos => new kakao.maps.LatLng(...pos));

    setMarkers(markers => {
      // clear prev markers
      markers.forEach(marker => marker.setMap(null));

      // assign new markers
      return positions.map(
        position => new kakao.maps.Marker({ map: kakaoMap, position })
      );
    });

    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      kakaoMap.setBounds(bounds);
    }
  }, [kakaoMap, markerPositions]);

  return <div id="container" ref={container} />;

}