import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Details from './pages/Details';
import VisitingNashville from './pages/VisitingNashville';
import Registry from './pages/Registry';
import Faqs from './pages/Faqs';
import NotFound from './pages/NotFound';

// Scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Nunito Sans, sans-serif',
        headings: {
          fontFamily: 'Nunito Sans, sans-serif',
        },
      }}
    >
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/visiting-nashville" element={<VisitingNashville />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
