import { MainNavigation } from "../utils/MainNavigation.jsx";
import { Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SETS, GET_SETS_BY_CODE } from "../../assets/queries.jsx";
import { ResponsiveLine } from "@nivo/line";

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

  // const { loading, error, data } = useQuery(GET_SETS_BY_CODE(selectedSet), {
  //   skip: !selectedSet,
  //   onCompleted: (data) => {
  //     if (loading) return "Loading...";
  //     if (error) return `Error! ${error.message}`;
  //     // transform the data to a more usable format
  //     const { sets } = data;
  //     if (sets && sets.length > 0) {
  //       const { cards } = sets[0];
  //       const latestPrices = cards.map(function (card) {
  //         return card.latestPrice?.price ?? 0;
  //       });
  //     }
  //   },
  // });

  const { loading, error, data } = useQuery(GET_SETS);
  // let totalSetPrice = latestPrices.reduce((accumulator, current) => accumulator + current, 0);

  console.log(data);

  const data1 = [
    {
      id: "series1",
      data: [
        { x: "A", y: 10 },
        { x: "B", y: 20 },
        { x: "C", y: 15 },
      ],
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
              <h2> Some Test Text </h2>
              <div style={{ display: "grid" }}>
                <div style={{ height: 400 }}>
                  <ResponsiveLine data={data1} />
                </div>
              </div>
            </div>
          </Row>
        )}
      </Container>
    </>
  );
};
