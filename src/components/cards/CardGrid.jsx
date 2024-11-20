import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardCard } from "./CardCard.jsx";

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
        const { image_uris } = await cardData;
        const uri =
          (await image_uris?.normal) ??
          image_uris?.large ??
          image_uris?.small ??
          image_uris?.border_crop ??
          image_uris?.art_crop ??
          "https://placehold.co/326x453";
        return uri;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    const cardURIs = currentCards.map(
      async ({ name, setCode, scryfallId, price, foilPrice }) => {
        const uri = await requestImages(scryfallId);
        return { name, setCode, scryfallId, price, foilPrice, uri };
      },
    );

    Promise.all(cardURIs).then(setCardWithURIs).catch(setError);
  }, [currentCards]);

  if (error) {
    navigate("/error", {
      state: { errorMessages: "from card grid " + error.message },
    });
  }

  const cardChunks = [];

  // Create chunks of cards, 3 cards per row
  if (!loading) {
    for (let i = 0; i < cardWithURIs.length; i += 12) {
      cardChunks.push(cardWithURIs.slice(i, i + 12));
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
          {cardRow.map(
            (
              { name, setCode, scryfallId, price, foilPrice, uri },
              colIndex,
            ) => (
              <CardCard
                key={colIndex}
                price={price}
                name={name}
                setCode={setCode}
                foilPrice={foilPrice}
                scryfallId={scryfallId}
                uri={uri}
              />
            ),
          )}
        </Row>
      )}
    </>
  ));

  // Render the grid inside a Bootstrap container
  return (
    <Container fluid className={"m-0"}>
      {cardRows}
    </Container>
  );
};
