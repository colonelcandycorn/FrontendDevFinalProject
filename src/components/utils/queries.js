import { gql } from "@apollo/client";

export const getCardsInSet = (setCode) => {
  return gql`
      query {
          sets(
              input: { code: "${setCode}" }
              page: { take: 15, skip: 0 }
              order: { order: ASC }
          ) {
              name
              cards {
                  name
                  setCode
                  identifiers {
                      scryfallId
                  }
                  normalPrice: latestPrice (
                      listType: RETAIL,
                      provider: "tcgplayer",
                      cardType: "normal"

                  ) {
                      price
                  }
                  foilPrice: latestPrice (
                      listType: RETAIL,
                      provider: "tcgplayer",
                      cardType: "foil"

                  ) {
                      price
                  }
              }
          }
      }
  `;
};

export const getCardPrices = (name, setCode) => {
  return gql`
        query {
            cards(
                filter: { name_like: "${name}", setCode_eq: "${setCode}" }
                page: { take: 1, skip: 0 }
                order: { order: ASC }
            ) {
                name
                setCode
                text
                prices {
                    provider
                    date
                    cardType
                    listType
                    price
                }
            }
        }
    `;
};
