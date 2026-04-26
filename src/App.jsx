import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/dm-sans/400.css';
import HomePage from './components/HomePage';
import OurWorksPage from './components/OurWorksPage';
import { LanguageProvider } from './i18n/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<OurWorksPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
