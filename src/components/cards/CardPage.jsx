import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainNavigation } from "../utils/MainNavigation.jsx";
import { useQuery } from "@apollo/client";
import { getCardPrices } from "../utils/queries.js";
import { useState } from "react";
import { getCardPriceData } from "./CardGraphFunctions.jsx";
import { ResponsiveLine } from "@nivo/line";

export const CardPage = () => {
  const { state } = useLocation();
  const { name, scryfallId, uri, setCode } = state;
  const navigate = useNavigate();
  const [tcgPrices, setTcgPrices] = useState([]);
  const [tcgFoilPrices, setTcgFoilPrices] = useState([]);
  const [cardKingdomPrices, setCardKingdomPrices] = useState([]);
  const [cardKingdomFoilPrices, setCardKingdomFoilPrices] = useState([]);
  const [cardPriceData, setCardPriceData] = useState([]);

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
          return listType === "retail" && provider === "tcgplayer" && price && date;
        });
        setTcgPrices(tcgList);
        const cardKingdomList = prices.filter(({ listType, provider, price, date }) => {
          return listType === "retail" && provider === "cardkingdom" && price && date;
        });
        setCardKingdomPrices(cardKingdomList);
        const tcgFoilList = prices.filter(({ listType, provider, price, date, cardType }) => {
          return (
            listType === "retail" &&
            provider === "tcgplayer" &&
            price &&
            date &&
            cardType === "foil"
          );
        });
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
          }
        );
        setCardKingdomFoilPrices(cardKingdomFoilList);

        setCardPriceData(getCardPriceData(tcgList, cardKingdomList));
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
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/cards" }} active={false}>
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
          <Col xs={8} className={"m-0"}>
            <h2 className="text-center"> Card Prices Over Time </h2>
            <div style={{ height: 500, minWidth: 0 }}>
              <ResponsiveLine
                data={cardPriceData}
                colors={(cardPriceData) => cardPriceData.color}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                xScale={{
                  type: "time",
                  format: "%Y-%m-%d",
                  useUTC: false,
                  precision: "day",
                }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                axisBottom={{
                  format: "%b %d",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 45,
                  legend: "Date",
                  legendOffset: 50,
                  legendPosition: "middle",
                  truncateTickAt: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Price (USD$)",
                  legendOffset: -40,
                  legendPosition: "middle",
                  truncateTickAt: 0,
                }}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    translateX: 0,
                    translateY: 80,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 150,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                  },
                ]}
              />
            </div>
          </Col>{" "}
        </Row>
      </Container>
    </>
  );
};
