import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/dm-sans/400.css';
import HomePage from './components/HomePage';
import PortfolioPage from './components/PortfolioPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
