import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CardCard = ({ name, scryfallId, uri, price, foilPrice }) => {
  return (
    <Col key={scryfallId} lg={3} md={4} sm={6} xs={12}>
      <Card className={"mb-5 shadow"} style={{ maxWidth: "327px" }}>
        <Link
          to={`/cards/${scryfallId}`}
          state={{ name, scryfallId, uri, setCode }}
          style={{ textDecoration: "none" }}
        >
          <img
            src={uri}
            alt={name}
            className={"card-img-top rounded m-0"}
            style={{
              marginBottom: "1rem",
            }}
          />
        </Link>
        <Card.Body className={"m-0"}>
          <Card.Subtitle>{name}</Card.Subtitle>
          <div className={"d-flex justify-content-between"}>
            <Card.Text>
              Normal: {price !== 0 ? "$" + price.toFixed(2) : "Not Available"}
            </Card.Text>
            <Card.Text>
              Foil:{" "}
              {foilPrice !== 0 ? "$" + foilPrice.toFixed(2) : "Not Available"}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
