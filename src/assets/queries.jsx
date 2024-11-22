import { gql } from "@apollo/client";

export const GET_SETS = gql`
  query {
    sets(input: { code: "FDN" }, page: { take: 15, skip: 0 }, order: { order: ASC }) {
      name
      cards {
        name
        setCode
        type
        text
        latestPrice(listType: RETAIL, provider: "tcgplayer", cardType: "normal") {
          price
        }
      }
    }
  }
`;

export const GET_SETS_BY_CODE = (setCode) => {
  return gql`
      query {
        sets(input: { code: "${setCode}" }, page: { take: 15, skip: 0 }, order: { order: ASC }) {
          name
          cards {
            name
            colors
            setCode
            type
            text
            latestPrice(listType: RETAIL, provider: "tcgplayer", cardType: "normal") {
              price
            }
          }
        }
      }
    `;
};
