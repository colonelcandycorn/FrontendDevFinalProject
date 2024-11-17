import { MainNavigation } from "./MainNavigation.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const ErrorPage = () => {
  const location = useLocation();
  const errorMessages = location.state?.errorMessages;

  return (
    <>
      <MainNavigation />
      <Container fluid>
        <Row>
          <Col>
            <h1 className={"mt-2"}>Error</h1>
          </Col>
        </Row>
        <hr />
        <div>
          {errorMessages ? (
            <div>
              <p>{errorMessages}</p>
            </div>
          ) : (
            <div>No errors</div>
          )}
        </div>
      </Container>
    </>
  );
};
