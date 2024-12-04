import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MainNavigation = () => {
  return (
    <Navbar expand="sm" bg="dark" variant="dark" sticky={"top"}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/cards" className={"fs-4"}>
          MTG Price Info
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={"me-auto fs-4"}>
            <Nav.Link as={Link} to="/cards">
              Cards
            </Nav.Link>
            <Nav.Link as={Link} to="/sets">
              Sets
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
