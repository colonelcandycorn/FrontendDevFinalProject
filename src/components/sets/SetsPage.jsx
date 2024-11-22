import { MainNavigation } from "../utils/MainNavigation.jsx";
import { Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SETS, GET_SETS_BY_CODE } from "../../assets/queries.jsx";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

export const SetsPage = ({ setInfo, loadingSets: isLoading, errorSets: loadError }) => {
  const [selectedSet, setSelectedSet] = useState("");
  const [iconUri, setIconUri] = useState("");
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

  const { loading, data } = useQuery(GET_SETS_BY_CODE(selectedSet));
  if (loading) {
    return "Loading...";
  }
  const { sets } = data || null;
  let { cards } = {};
  let latestPrices = {};
  if (sets && sets.length > 0) {
    cards = sets[0].cards || {};

    latestPrices = cards.map(function (card) {
      return card.latestPrice?.price ?? 0;
    });
  }

  let colorCount = cards.reduce((colorAccumulator, card) => {
    if (card.colors.length === 0) {
      if (colorAccumulator["Colorless"]) {
        colorAccumulator["Colorless"] += 1;
      } else {
        colorAccumulator["Colorless"] = 1;
      }
    } else {
      card.colors.forEach((color) => {
        if (colorAccumulator[color]) {
          colorAccumulator[color] += 1;
        } else {
          colorAccumulator[color] = 1;
        }
      });
    }
    return colorAccumulator;
  }, {});

  console.log(colorCount);

  const colorData = [
    {
      id: "Colorless",
      label: "Colorless",
      value: colorCount["Colorless"],
    },
    {
      id: "White",
      label: "White",
      value: colorCount["W"],
    },
    {
      id: "Blue",
      label: "Blue",
      value: colorCount["U"],
    },
    {
      id: "Black",
      label: "Black",
      value: colorCount["B"],
    },
    {
      id: "Red",
      label: "Red",
      value: colorCount["R"],
    },
    {
      id: "Green",
      label: "Green",
      value: colorCount["G"],
    },
  ];

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
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading Set Data...</span>
            </Spinner>
          </div>
        )}
        {!isLoading && (
          <Row>
            <Col md={2}>
              <Form.Select value={selectedSet} onChange={handleSelectChange}>
                {setInfo.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        )}
        {selectedSet && (
          <Row>
            <Col>
              {iconUri && (
                <img
                  src={iconUri}
                  alt="Selected Set Icon"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
              <p>Selected Set Code: {selectedSet}</p>
            </Col>
          </Row>
        )}
        {selectedSet && (
          <Row>
            <div>
              <div style={{ display: "grid" }}>
                {/* <div style={{ height: 400 }}><ResponsiveLine data={data1} /></div> */}
                <div style={{ height: 500 }}>
                  <h2> Color Pie For Set </h2>
                  <ResponsivePie
                    data={colorData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    colors={["#C0C0C0", "#F8F8FF", "#008cff", "#000000", "#ff0000", "#30cc00"]}
                  />
                </div>
              </div>
            </div>
          </Row>
        )}
      </Container>
    </>
  );
};
