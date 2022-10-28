import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <header>
        <h1>Cueca RDS</h1>
        <h3>
          A{" "}
          <a href="https://www.cardstheuniverseandeverything.com/">CUE Cards</a>{" "}
          Rich Deck Selector
        </h3>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
