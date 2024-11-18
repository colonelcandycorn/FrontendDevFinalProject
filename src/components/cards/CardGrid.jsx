import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CardGrid = ({ currentCards }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardWithURIs, setCardWithURIs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const requestImages = async (cardId) => {
      try {
        const response = await fetch(
          `https://api.scryfall.com/cards/${cardId}`,
        );
        const cardData = await response.json();
        const {
          image_uris: { normal: uri },
        } = cardData;
        return uri;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    const cardURIs = currentCards.map(async ({ name, setCode, scryfallId }) => {
      const uri = await requestImages(scryfallId);
      return { name, setCode, scryfallId, uri };
    });

    Promise.all(cardURIs).then(setCardWithURIs).catch(setError);
  }, [currentCards]);

  if (error) {
    navigate("/error", { state: { errorMessages: error.message } });
  }

  const cardChunks = [];

  // Create chunks of cards, 3 cards per row
  if (!loading) {
    for (let i = 0; i < cardWithURIs.length; i += 4) {
      cardChunks.push(cardWithURIs.slice(i, i + 4));
    }
  }

  // Map chunks to rows
  const cardRows = cardChunks.map((cardRow, rowIndex) => (
    <>
      {/* Show loading spinner while fetching images */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading Country Data...</span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <Row key={rowIndex}>
          {cardRow.map(({ name, setCode, scryfallId, uri }) => (
            <Col key={scryfallId} md={3} sm={4} xs={12}>
              <a href={`/cards/${scryfallId}`}>
                <img
                  src={uri}
                  alt={name}
                  className={"img-fluid"}
                  style={{ marginBottom: "1rem" }}
                />
                <p>{name}</p>
                <p>{setCode}</p>
              </a>
            </Col>
          ))}
        </Row>
      )}
    </>
  ));

  // Render the grid inside a Bootstrap container
  return <Container>{cardRows}</Container>;
};
