# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

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
