import { Navigate, Route, Routes } from "react-router-dom";
import { CardsPage } from "./components/cards/CardsPage.jsx";
import { SetsPage } from "./components/sets/SetsPage.jsx";
import { NoMatch } from "./components/utils/NoMatch.jsx";
import { CardPage } from "./components/cards/CardPage.jsx";
import { SetPage } from "./components/sets/SetPage.jsx";
import { useEffect, useState } from "react";
import { ErrorPage } from "./components/utils/ErrorPage.jsx";
// code, set_type, name, released_at, card_count
export const App = () => {
  const [setNames, setSetNames] = useState([]);
  const [loadingSets, setLoadingSets] = useState(true);
  const [errorSets, setErrorSets] = useState(null);

  useEffect(() => {
    const getSets = async () => {
      try {
        const response = await fetch("https://api.scryfall.com/sets");
        const data = await response.json();
        const dataList = await data.data;
        const filteredSetCodesAndNames = await dataList
          .filter(({ set_type, released_at }) => {
            const today = Date.now();
            const released = Date.parse(released_at);

            return (
              (set_type === "core" || set_type === "expansion") &&
              released < today
            );
          })
          .map(({ code, name, icon_svg_uri, set_type }) => ({
            code: code.toUpperCase(),
            name,
            icon_svg_uri,
            set_type,
          }));
        setSetNames(filteredSetCodesAndNames);
      } catch (error) {
        setErrorSets(error);
      } finally {
        setLoadingSets(false);
      }
    };

    getSets().catch((error) => setErrorSets(error));
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={"/cards"} />} />
        <Route
          path={"cards"}
          element={
            <CardsPage
              setInfo={setNames}
              loadingSets={loadingSets}
              errorSets={errorSets}
            />
          }
        />
        <Route path={"cards/:cardName"} element={<CardPage />} />
        <Route
          path={"sets"}
          element={
            <SetsPage
              setInfo={setNames}
              loadingSets={loadingSets}
              errorSets={errorSets}
            />
          }
        />
        <Route path={"sets/:setName"} element={<SetPage />} />
        <Route path={"error"} element={<ErrorPage />} />
        <Route path={"*"} element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
