import { GoogleMapsProps } from "@/components/GoogleMaps/types";
import { useEffect, useRef, useState } from "react";

export const Map = ({ props }: GoogleMapsProps) => {
  const {
    position: { center },
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
      setInfoWindow(new google.maps.InfoWindow());
    }
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center }));
    }

    map?.setCenter(center);
    map?.setZoom(10);
    marker?.setOptions({ position: center, map: map });
    infoWindow?.setOptions({ position: center, content: "asd", minWidth: 100 });
  });

  return <div id="map" ref={ref} />;
};
