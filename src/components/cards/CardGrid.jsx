import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CardCard } from "./CardCard.jsx";
import { RateLimiter } from "limiter";

export const CardGrid = ({ currentCards }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardWithURIs, setCardWithURIs] = useState([]);

  const requestImages = async (cardId) => {
    try {
      const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
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
    }
  };

  useEffect(() => {
    let isMounted = true; // Prevent state updates if the component unmounts
    setLoading(true);

    const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 50 });

    const fetchCardData = async () => {
      try {
        const cardURIs = currentCards.map(async ({ scryfallId, ...rest }) => {
          await limiter.removeTokens(1); // Ensure rate-limiting delay
          const uri = await requestImages(scryfallId);
          return { ...rest, scryfallId, uri };
        });

        const resolvedCards = await Promise.all(cardURIs);

        if (isMounted) {
          setCardWithURIs(chunkCards(resolvedCards));
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setError(e);
          setLoading(false);
        }
      }
    };

    fetchCardData();

    return () => {
      isMounted = false; // Clean up on component unmount
    };
  }, [currentCards]);

  const chunkCards = (cards, chunkSize = 12) => {
    const chunkedArray = [];
    for (let i = 0; i < cards.length; i += chunkSize) {
      chunkedArray.push(cards.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  // Map chunks to rows

  // Render the grid inside a Bootstrap container
  return (
    <Container fluid className={"m-0"}>
      {!loading &&
        cardWithURIs.map((cardRow, rowIndex) => (
          <Row key={rowIndex}>
            {cardRow.map(
              (
                { name, setCode, scryfallId, price, foilPrice, uri },
                colIndex,
              ) => (
                <CardCard
                  key={`${scryfallId}-${setCode}-${colIndex}`}
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
        ))}
    </Container>
  );
};
