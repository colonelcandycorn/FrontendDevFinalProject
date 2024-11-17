import { Navigate, Route, Routes } from "react-router-dom";
import { CardsPage } from "./components/CardsPage.jsx";
import { SetsPage } from "./components/SetsPage.jsx";
import { NoMatch } from "./components/NoMatch.jsx";
import { CardPage } from "./components/CardPage.jsx";
import { SetPage } from "./components/SetPage.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={"/cards"} />} />
        <Route path={"cards"} element={<CardsPage />} />
        <Route path={"cards/:cardName"} element={<CardPage />} />
        <Route path={"sets"} element={<SetsPage />} />
        <Route path={"sets/:setName"} element={<SetPage />} />
        <Route path={"*"} element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
