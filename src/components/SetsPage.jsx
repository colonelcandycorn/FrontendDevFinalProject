import { MainNavigation } from "./MainNavigation.jsx";
import { Col, Container, Row } from "react-bootstrap";

export const SetsPage = () => {
  return (
    <>
      <MainNavigation />
      <Container fluid>
        <Row>
          <Col>
            <h1 className={"mt-2"}>Sets</h1>
          </Col>
        </Row>
        <hr />
      </Container>
    </>
  );
};
