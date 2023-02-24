import { CitieJson, WeatherInfoProps } from "./types";
import getWeather from "@/services/apiServices";
import {
  Card,
  Col,
  Empty,
  Image,
  Row,
  Select,
  Skeleton,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Position } from "@/types";
import styles from "./WeatherInfo.scss";
import Meta from "antd/es/card/Meta";
import CountUp from "react-countup";

const { Text, Paragraph } = Typography;

export function WeatherInfo({ props, onChangeCity }: WeatherInfoProps) {
  const [cities, setCities] = useState([{ value: "", label: "" }]);
  const [empty, setEmpty] = useState<Boolean>(true);
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    fetch("/data/cities.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setCities(
          data.rows.map((value: CitieJson) => {
            return {
              value: `${value.lat}|${value.lng}`,
              label: `${value.name}, ${value.country}`,
            };
          })
        );
      });
  }, []);

  const onSelectCity = async (value: string) => {
    const valueData = value.split("|");
    const position: Position = {
      center: {
        lat: Number(valueData[0]),
        lng: Number(valueData[1]),
      },
      zoom: 1,
    };
    getWeather(position).then((res) => {
      onChangeCity({ position: position, weather: res });
    });
    setEmpty(false);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const {
    weather: {
      current: {
        weather: [{ description, main, icon }],
        temp,
        humidity,
        feels_like,
        visibility,
        wind_speed,
      },
    },
  } = props;

  return (
    <>
      <Card className="info-card">
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Select
              size={"large"}
              style={{ width: "100%" }}
              placeholder="Select a city"
              showSearch
              options={cities}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={onSelectCity}
              onSelect={(e) => {
                console.log();
              }}
            />
          </Col>
          <Col span={24}>
            {!empty && !loading ? (
              <Card className="grid-info-weather" title={"Weather Info"}>
                <Card.Grid
                  className="grid-principal-info-weather"
                  hoverable={false}
                >
                  <Meta
                    avatar={
                      <Image
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        preview={false}
                      />
                    }
                    title={main}
                    description={
                      <Paragraph type="secondary" style={{ fontSize: 14 }}>
                        {description} | Temperature:
                        <CountUp
                          end={temp}
                          duration={1}
                          suffix={"°"}
                          prefix={" "}
                          decimals={2}
                        />
                      </Paragraph>
                    }
                    style={{ textTransform: "capitalize" }}
                  />
                </Card.Grid>
                <Card.Grid hoverable={false}>
                  <Meta
                    avatar={
                      <Image
                        preview={false}
                        src={"./assets/humidity.png"}
                        width={40}
                        style={{ padding: 5 }}
                      />
                    }
                    title={<Text>Humidity</Text>}
                    description={
                      <Text>
                        <CountUp end={humidity} duration={1} suffix={" %"} />
                      </Text>
                    }
                  />
                </Card.Grid>
                <Card.Grid hoverable={false}>
                  <Meta
                    avatar={
                      <Image
                        preview={false}
                        src={"./assets/thermal.png"}
                        width={40}
                        style={{ padding: 5 }}
                      />
                    }
                    title={
                      <Text>
                        Thermal <br></br>Sensation
                      </Text>
                    }
                    description={
                      <Text>
                        <CountUp
                          end={feels_like}
                          duration={1}
                          suffix={"°"}
                          decimals={2}
                        />
                      </Text>
                    }
                  />
                </Card.Grid>
                <Card.Grid hoverable={false}>
                  <Meta
                    avatar={
                      <Image
                        preview={false}
                        src={"./assets/wind.png"}
                        width={40}
                        style={{ padding: 5 }}
                      />
                    }
                    title={<Text>Wind Speed</Text>}
                    description={
                      <Text>
                        <CountUp
                          end={wind_speed}
                          duration={1}
                          suffix={" km/h"}
                          decimals={2}
                        />
                      </Text>
                    }
                  />
                </Card.Grid>
                <Card.Grid hoverable={false}>
                  <Meta
                    avatar={
                      <Image
                        preview={false}
                        src={"./assets/visibility.png"}
                        width={40}
                        style={{ padding: 5 }}
                      />
                    }
                    title={<Text>Visibility</Text>}
                    description={
                      <Text>
                        <CountUp
                          end={visibility / 1000}
                          duration={1}
                          suffix={" km"}
                        />
                      </Text>
                    }
                  />
                </Card.Grid>
              </Card>
            ) : empty ? (
              <Empty></Empty>
            ) : (
              <Skeleton active avatar></Skeleton>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
}
