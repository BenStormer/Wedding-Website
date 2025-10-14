import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import './App.css';

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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
