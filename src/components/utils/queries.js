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
                  identifiers {
                      scryfallId
                  }
              }
          }
      }
  `;
};
