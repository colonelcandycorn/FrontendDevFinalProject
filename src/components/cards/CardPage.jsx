import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MainNavigation } from "../utils/MainNavigation.jsx";

export const CardPage = () => {
  const { cardName } = useParams();

  return (
    <>
      <MainNavigation />
      <Container fluid>
        <Row>
          <Col>
            <h1 className={"mt-2"}>{cardName}</h1>
          </Col>
        </Row>
        <hr />
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"/cards"} style={{ textDecoration: "none" }}>
              cards
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{cardName}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </>
  );
};
