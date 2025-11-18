import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import './App.css';
import Details from './pages/Details';
import VisitingNashville from './pages/VisitingNashville';
import Registry from './pages/Registry';
import Faqs from './pages/Faqs';

async function App() {
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
