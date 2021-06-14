import React, { useState } from "react";
import KakaoMap from "./KakaoMap";

export default function MapApp() {
  const [markerPositions, setMarkerPositions] = useState([]);
  const [mapSize, setMapSize] = useState([400, 400]);

  return (
    <div className="MapApp"> 
      <div id="wrap">
          <>
            <h2>Kakao Map</h2>
            <KakaoMap markerPositions={markerPositions} size={mapSize} />
          </>
        
      </div>
    </div>
  );
}