import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <header className="text-center bg-blue-400 p-3">
        <h1 className="text-xl">Cueca RDS</h1>
        <h3>
          A{" "}
          <a
            href="https://www.cardstheuniverseandeverything.com/"
            className="font-bold hover:text-gray-600"
          >
            CUE Cards
          </a>{" "}
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
