import { MainNavigation } from "../utils/MainNavigation.jsx";
import { Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SETS_BY_CODE } from "../../assets/queries.jsx";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import {
  getColorData,
  getCardPriceData,
  getRarityData,
  getCardTypesData,
} from "./SetsGraphFunctions.jsx";

export const SetsPage = ({ setInfo, loadingSets: isLoading, errorSets: loadError }) => {
  const [selectedSet, setSelectedSet] = useState("");
  const [iconUri, setIconUri] = useState("");
  const [colorData, setColorData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [rarityData, setRarityData] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const navigate = useNavigate();
  if (loadError) {
    navigate("/error", { state: { errorMessages: loadError.message } });
  }

  useEffect(() => {
    if (setInfo.length > 0) {
      const firstSet = setInfo[0];
      setSelectedSet(firstSet.code); // Set the default selected set code
      setIconUri(firstSet.icon_svg_uri); // Set the default icon URI
    }
  }, [setInfo]);

  const handleSelectChange = (e) => {
    const selectedCode = e.target.value;
    setSelectedSet(selectedCode); // Update the selected set state

    // Find the corresponding set from setInfo and update the iconUri
    const selectedSetInfo = setInfo.find((set) => set.code === selectedCode);
    if (selectedSetInfo) {
      setIconUri(selectedSetInfo.icon_svg_uri);
    }
  };

  //Load data from the API
  const { loading, data } = useQuery(GET_SETS_BY_CODE(selectedSet), {
    onCompleted: (data) => {
      setColorData(getColorData(data));
      setPriceData(getCardPriceData(data));
      setRarityData(getRarityData(data));
      setTypesData(getCardTypesData(data));
    },
  });

  //Page Setup
  return (
    <>
      <MainNavigation />
      <Container fluid>
        <Row>
          <Col>
            <h1 className={"mt-2"}>Set Data</h1>
          </Col>
        </Row>
        <hr />
        {!isLoading && (
          <Row className={"mb-2 justify-content-between"}>
            <Col md={2}>
              <Form.Select value={selectedSet} onChange={handleSelectChange}>
                {setInfo.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            {selectedSet && (
              <Col>
                {iconUri && (
                  <img
                    src={iconUri}
                    alt="Selected Set Icon"
                    style={{ width: "36px", height: "36px" }}
                  />
                )}
              </Col>
            )}
          </Row>
        )}
        {(isLoading || loading) && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading Set Data...</span>
            </Spinner>
          </div>
        )}
        {selectedSet && !loading && (
          <Row>
            <Col lg={6} className={"m-0"}>
              <h2> Price Distribution For Set </h2>
              <div style={{ height: 500, minWidth: 0 }}>
                <ResponsiveLine
                  data={priceData}
                  colors="#0000FF"
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                  }}
                />
              </div>
            </Col>
            <Col lg={6} className={"m-0"}>
              <div style={{ height: 500, minWidth: 0 }}>
                <h2> Rarity Distribution for Set </h2>
                <ResponsiveBar
                  data={rarityData}
                  keys={["count"]}
                  indexBy="rarity"
                  colors={["#FF4433", "#D4AF37", "#C0C0C0", "#000000"]}
                  labelTextColor="white"
                  colorBy="index"
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                />
              </div>
            </Col>
            <Col lg={6} className={"m-0"}>
              <div style={{ height: 500, minWidth: 0 }}>
                <h2> Color Pie Chart For Set </h2>
                <ResponsivePie
                  data={colorData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  colors={[
                    "#C0C0C0",
                    "#efbf04",
                    "#F8F8FF",
                    "#008cff",
                    "#000000",
                    "#ff0000",
                    "#30cc00",
                  ]}
                  arcLinkLabelsSkipAngle={1}
                  arcLabelsSkipAngle={1}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div style={{ height: 500, minWidth: 0 }}>
                <h2> Type Pie Chart For Set </h2>
                <ResponsivePie
                  data={typesData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  colors={{ scheme: "tableau10" }}
                  arcLinkLabelsSkipAngle={1}
                  arcLabelsSkipAngle={1}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};
