import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConferencePage from './pages/Conference/ConferencePage';
import ResultsPage from './components/ResultsPage/ResultsPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/conference/:id" element={<ConferencePage />} />
      <Route path="/results/:id" element={<ResultsPage />} />
    </Routes>
  </Router>
);

export default App;
