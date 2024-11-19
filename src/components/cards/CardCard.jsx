import { Card, Col } from "react-bootstrap";

export const CardCard = ({ name, scryfallId, uri, setCode, price }) => {
  return (
    <Col key={scryfallId} lg={3} md={4} sm={6} xs={12}>
      <Card className={"mb-5 shadow"} style={{ maxWidth: "327px" }}>
        <a href={`/cards/${scryfallId}`}>
          <img
            src={uri}
            alt={name}
            className={"card-img-top rounded m-0"}
            style={{
              marginBottom: "1rem",
            }}
          />
        </a>
        <Card.Body className={"m-0"}>
          <Card.Subtitle>{name}</Card.Subtitle>
          <Card.Text>Price: ${price.toFixed(2)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
