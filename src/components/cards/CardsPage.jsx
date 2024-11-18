import { MainNavigation } from "../utils/MainNavigation.jsx";
import { Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getCardsInSet } from "../utils/queries.js";
import { CardPagination } from "./CardPagination.jsx";

export const CardsPage = ({ setInfo, loadingSets: isLoading, errorSets }) => {
  const [selectedSet, setSelectedSet] = useState("");
  const [apolloSetData, setApolloSetData] = useState([]);
  const [iconUri, setIconUri] = useState("");
  const navigate = useNavigate();
  if (errorSets) {
    navigate("/error", { state: { errorMessages: errorSets.message } });
  }

  const { loading, error, data } = useQuery(getCardsInSet(selectedSet), {
    skip: !selectedSet,
    onCompleted: (data) => {
      // transform the data to a more usable format
      const { sets } = data;
      if (sets && sets.length > 0) {
        const { cards } = sets[0];
        const transformedData = cards
          .map(({ name, setCode, identifiers: { scryfallId } }) => ({
            name,
            setCode,
            scryfallId,
          }))
          .reduce((collect, curr) => {
            if (
              !collect.some((element) => element.scryfallId === curr.scryfallId)
            ) {
              collect.push(curr);
            }

            return collect;
          }, []);
        setApolloSetData(transformedData);
      }
    },
  });

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

  return (
    <>
      <MainNavigation />
      <Container fluid>
        <Row>
          <Col>
            <h1 className={"mt-2"}>Cards</h1>
          </Col>
        </Row>
        <hr />
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading Country Data...</span>
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
        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading Card Data...</span>
            </Spinner>
          </div>
        )}
        {!loading && apolloSetData.length > 0 && (
          <CardPagination cardArray={apolloSetData} />
        )}
      </Container>
    </>
  );
};
