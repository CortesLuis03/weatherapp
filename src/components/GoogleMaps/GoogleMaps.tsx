import { GOOGLE_KEY } from "@/config/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMapsProps } from "./types";
import styles from "./GoogleMaps.scss";
import { Card, Skeleton } from "antd";
import { Map } from "@/services/mapService";

export function GoogleMaps({ props }: GoogleMapsProps) {

  const render = (status: Status) => {
    return <Skeleton active></Skeleton>;
  };

  return (
    <>
      <Card className="map-card">
        <Wrapper apiKey={GOOGLE_KEY} render={render}>
          <Map props={props}></Map>
        </Wrapper>
      </Card>
    </>
  );
}
