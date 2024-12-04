# MTG PI

## Libraries used:

Vite: very easy way to set up a React project. The main obstacle was setting up Jest/MSW which did not cooperate very well with Vite. 

apollo/client: solely used for the purpose of making graphQL queries. I relied purely on the documentation to set this up. 

Jest: used for performing unit and integration tests in the application. I relied on a mixture of documentation and a youtube series by the user “Codevolution”. 

Nivo: purely react charting library. No need for two separate dependencies. 

React-bootstrap: allows the easy integration of bootstrap with react. Its documentation covered everything we needed to use

React-router-dom: Is used for client side routing. I used a mixture of documentation and another youtube series by “Codevolution”

React-testing-library and Mock Service Worker: used in conjunction with Jest for testing. These topics were covered in the youtube series. 

## Links to Resources Used

- [Youtube series](https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd) about using Jest
- [Youtube series](https://www.youtube.com/watch?v=UWYOC8g5N_0&list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG) about using react router dom
- [Apollo client](https://www.apollographql.com/docs/react) documentation
- [Mock Service Worker](https://mswjs.io/docs/getting-started) documentation
- [Jest](https://jestjs.io/docs/tutorial-react) documentation
- [React bootstrap](https://react-bootstrap.netlify.app/) documentation
- [MTGJSON](https://mtgjson.com/getting-started/) documentation
- [Scryfall API](https://scryfall.com/docs/api)
- [React Quickly](https://www.manning.com/books/react-quickly-second-edition?a_aid=mortenb&a_bid=1cebd874) (book used to learn about React)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# React + Nivo

We used the Nivo charting library for all of the graphs in this project. Specifically, for the line, pie, and bar graphs detailed below.

- [@nivo/line](https://nivo.rocks/line/) for the line graphs
- [@nivo/pie](https://nivo.rocks/pie/) for the pie graphs
- [@nivo/bar](https://nivo.rocks/bar/) for the bar graphs

# Apollo GraphQL

To access the MTGJSON API we needed to use Apollo GraphQL. Most noteably, the 'useQuery' hook.

- [@apollo/client](https://www.apollographql.com/docs/react/data/queries) This is the relevant documentation for the react implementation of Apollo useQuery