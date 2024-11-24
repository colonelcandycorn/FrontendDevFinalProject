import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MainNavigation } from "../utils/MainNavigation.jsx";
import { useQuery } from "@apollo/client";
import { getCardPrices } from "../utils/queries.js";
import { useState } from "react";

export const CardPage = () => {
  const { state } = useLocation();
  const { name, scryfallId, uri, setCode } = state;
  const navigate = useNavigate();
  const [tcgPrices, setTcgPrices] = useState([]);
  const [tcgFoilPrices, setTcgFoilPrices] = useState([]);
  const [cardKingdomPrices, setCardKingdomPrices] = useState([]);
  const [cardKingdomFoilPrices, setCardKingdomFoilPrices] = useState([]);

  const { loading, error, data } = useQuery(getCardPrices(name, setCode), {
    skip: !name || !setCode,
    onError: () => {
      navigate("/error", {
        state: { errorMessages: "from useQuery" + error.message },
      });
    },
    onCompleted: (data) => {
      const { cards } = data;
      if (cards && cards.length > 0) {
        const { prices } = cards[0];
        const tcgList = prices.filter(({ listType, provider, price, date }) => {
          return (
            listType === "retail" && provider === "tcgplayer" && price && date
          );
        });
        console.log(tcgList);
        setTcgPrices(tcgList);
        const cardKingdomList = prices.filter(
          ({ listType, provider, price, date }) => {
            return (
              listType === "retail" &&
              provider === "cardkingdom" &&
              price &&
              date
            );
          },
        );
        console.log(cardKingdomList);
        setCardKingdomPrices(cardKingdomList);
        const tcgFoilList = prices.filter(
          ({ listType, provider, price, date, cardType }) => {
            return (
              listType === "retail" &&
              provider === "tcgplayer" &&
              price &&
              date &&
              cardType === "foil"
            );
          },
        );
        console.log(tcgFoilList);
        setTcgFoilPrices(tcgFoilList);
        const cardKingdomFoilList = prices.filter(
          ({ listType, provider, price, date, cardType }) => {
            return (
              listType === "retail" &&
              provider === "cardkingdom" &&
              price &&
              date &&
              cardType === "foil"
            );
          },
        );
        console.log(cardKingdomFoilList);
        setCardKingdomFoilPrices(cardKingdomFoilList);
      }
    },
  });

  return (
    <>
      <MainNavigation />
      <Container fluid>
        <Row>
          <Col>
            <h1 className={"mt-2"}>{name}</h1>
          </Col>
        </Row>
        <hr />
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/cards" }}
            active={false}
          >
            cards
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <Card className={"mb-5 shadow"} style={{ maxWidth: "327px" }}>
              <img
                src={uri}
                alt={name}
                className={"card-img-top rounded m-0"}
                style={{
                  marginBottom: "1rem",
                }}
              />
              <Card.Body className={"m-0"}>
                <Card.Subtitle>{name}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};
