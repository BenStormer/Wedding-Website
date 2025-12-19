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

import './App.css';
import Details from './pages/Details';
import VisitingNashville from './pages/VisitingNashville';
import Registry from './pages/Registry';
import Faqs from './pages/Faqs';

// Scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

async function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Nunito Sans, sans-serif',
        headings: {
          fontFamily: 'Nunito Sans, sans-serif',
        },
        colors: {
          primaryGreen: [
            '#e8ede6',
            '#d1dbc9',
            '#b9c9ac',
            '#a2b78f',
            '#8ba572',
            '#74935e',
            '#566f4d',
            '#42563c',
            '#2e3d2b',
            '#1a231a',
          ],
          secondaryGreen: [
            '#f5f6f2',
            '#e9ebe3',
            '#dde0d4',
            '#d1d5c5',
            '#c5cab6',
            '#b9bfa7',
            '#b4b7a0',
            '#8e9180',
            '#686b60',
            '#424540',
          ],
          primaryBrown: [
            '#f1ede9',
            '#e3dbd3',
            '#d5c9bd',
            '#c7b7a7',
            '#b9a591',
            '#ab937b',
            '#5e4838',
            '#4a382c',
            '#362820',
            '#221814',
          ],
          secondaryBrown: [
            '#f3efeb',
            '#e7dfd7',
            '#dbcfc3',
            '#cfbfaf',
            '#c3af9b',
            '#b79f87',
            '#958375',
            '#76695d',
            '#574f45',
            '#38352d',
          ],
        },
        primaryColor: 'primaryGreen',
      }}
    >
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/visiting-nashville" element={<VisitingNashville />} />
          <Route path="/registry" element={await Registry()} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
