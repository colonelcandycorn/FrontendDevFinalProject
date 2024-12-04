import { each } from "chart.js/helpers";

export const getCardPriceData = (tcgData, cardKingdomData) => {
  // filter the data into the cardPriceData object, separating the foil and normal prices

  let tcgNormalCardData = [];
  let tcgFoilCardData = [];

  tcgData.forEach((price) => {
    if (price.cardType === "normal") {
      tcgNormalCardData.push({
        x: price.date,
        y: price.price || 0,
      });
    }
    if (price.cardType === "foil") {
      tcgFoilCardData.push({
        x: price.date,
        y: price.price || 0,
      });
    }
  });

  let cardKingdomNormalCardData = [];
  let cardKingdomFoilCardData = [];

  cardKingdomData.forEach((price) => {
    if (price.cardType === "normal") {
      cardKingdomNormalCardData.push({
        x: price.date,
        y: price.price || 0,
      });
    }
    if (price.cardType === "foil") {
      cardKingdomFoilCardData.push({
        x: price.date,
        y: price.price || 0,
      });
    }
  });

  const cardPriceData = [];
  if (tcgNormalCardData.length > 0) {
    cardPriceData.push({
      id: "TCGplayer Normal",
      color: "#FF0000",
      data: tcgNormalCardData,
    });
  }
  if (tcgFoilCardData.length > 0) {
    cardPriceData.push({
      id: "TCGplayer Foil",
      color: "#FF8C00",
      data: tcgFoilCardData,
    });
  }
  if (cardKingdomNormalCardData.length > 0) {
    cardPriceData.push({
      id: "Card Kingdom Normal",
      color: "#0000FF",
      data: cardKingdomNormalCardData,
    });
  }
  if (cardKingdomFoilCardData.length > 0) {
    cardPriceData.push({
      id: "Card Kingdom Foil",
      color: "#00FFFF",
      data: cardKingdomFoilCardData,
    });
  }

  return cardPriceData;
};
