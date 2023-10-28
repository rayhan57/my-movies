import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./assets/pages/Homepage";
import NowPlaying from "./assets/pages/NowPlaying";
import Popular from "./assets/pages/Popular";
import TopRated from "./assets/pages/TopRated";
import DetailMovie from "./assets/pages/DetailMovie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/now_playing" element={<NowPlaying />} />
        <Route path="/movie/popular" element={<Popular />} />
        <Route path="/movie/top_rated" element={<TopRated />} />
        <Route path="/movie/:movie_id" element={<DetailMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
