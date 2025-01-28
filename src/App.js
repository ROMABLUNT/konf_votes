import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConferencePage from './';

const App = () => (
  <Router>
    <Routes>
      <Route path="/conference/:id" element={<ConferencePage />} />
    </Routes>
  </Router>
);

export default App;
