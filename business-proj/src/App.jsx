import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/dm-sans/400.css';
import HomePage from './components/HomePage';
import PortfolioPage from './components/PortfolioPage';
import OurWorksPage from './components/OurWorksPage';
import { LanguageProvider } from './i18n/LanguageContext';

function App() {
  return (
    <LanguageProvider>
<Router className="page-watermark">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/works" element={<OurWorksPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
