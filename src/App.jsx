import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RatZonePage from "./pages/RatZonePage/RatZonePage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store/:storeId" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ratzone" element={<RatZonePage />} />
          <Route path="/ratzone/:result" element={<RatZonePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
