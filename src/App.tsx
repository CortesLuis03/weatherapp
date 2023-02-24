import { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import { Col, Row } from "antd/es/grid";
import { GoogleMaps, WeatherInfo } from "@/components";
import { WeatherProps } from "./types";
import { EMPTY_CURRENT_INFO } from "./constants";

function App() {
  const [currentInfo, setCurrentInfo] = useState<WeatherProps>(EMPTY_CURRENT_INFO);
  return (
    <>
      <Layout style={{ marginTop: 24, backgroundColor: 'White' }}>
        <Row gutter={[24, 24]}>
          <Col xs={{ order: 2, span: 24 }} md={{ order: 1, span: 12 }}>
            <GoogleMaps props={currentInfo}></GoogleMaps>
          </Col>
          <Col xs={{ order: 1, span: 24 }} md={{ order: 2, span: 12 }}>
            <WeatherInfo props={currentInfo} onChangeCity={(info)=>setCurrentInfo(info)}></WeatherInfo>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default App;
