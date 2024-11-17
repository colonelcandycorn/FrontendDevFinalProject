import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MainNavigation } from "./MainNavigation.jsx";

export const SetPage = () => {
  const { setName } = useParams();

  return (
    <>
      <MainNavigation />
      <Container fluid>
        <Row>
          <Col>
            <h1 className={"mt-2"}>{setName}</h1>
          </Col>
        </Row>
        <hr />
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"/sets"} style={{ textDecoration: "none" }}>
              sets
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{setName}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </>
  );
};
