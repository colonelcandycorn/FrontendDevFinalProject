import { Col, Form } from "react-bootstrap";

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
    <Col md={2} className="d-flex align-items-center justify-content-end">
      <Form.Label htmlFor="sortBy" className=" me-2 mb-0">
        Sort By:
      </Form.Label>
      <Form.Select onChange={handleSortOrder} id="sortBy">
        <option value="normalDesc">Normal price descending</option>
        <option value="foilDesc">Foil price descending</option>
        <option value="normalAsc">Normal price ascending</option>
        <option value="foilAsc">Foil price ascending</option>
      </Form.Select>
    </Col>
  );
};
