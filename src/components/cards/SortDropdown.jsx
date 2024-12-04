import { Col, Row, Form } from "react-bootstrap";

export const SortDropdown = ({ setSortOrder }) => {
  const sortToFunctionMap = {
    normalDesc: () => (a, b) => b.price - a.price,
    foilDesc: () => (a, b) => b.foilPrice - a.foilPrice,
    normalAsc: () => (a, b) => a.price - b.price,
    foilAsc: () => (a, b) => a.foilPrice - b.foilPrice,
  };
  const handleSortOrder = (event) => {
    const sortString = event.target.value;
    setSortOrder(sortToFunctionMap[sortString]);
  };

  return (
    <Col className="d-flex align-items-center justify-content-end">
      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={3} htmlFor="sortBy" className="me-2 mb-0">
          Sort By:
        </Form.Label>
        <Col sm={8}>
          <Form.Select onChange={handleSortOrder} id="sortBy">
            <option value="normalDesc">Normal price descending</option>
            <option value="foilDesc">Foil price descending</option>
            <option value="normalAsc">Normal price ascending</option>
            <option value="foilAsc">Foil price ascending</option>
          </Form.Select>
        </Col>
      </Form.Group>
    </Col>
  );
};
