import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/footer";
import EventPage from "./Main/EventPage/EventPage";

function App() {
  const Home = lazy(() => import("./Home"));
  return (
    <div>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/event/:id"} element={<EventPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
