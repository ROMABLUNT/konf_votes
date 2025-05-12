import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultsPageContainer from './components/ResultsPage/ResultsPageContainer';
import ConferencePageContainer from './pages/Conference/ConferencePageContainer';

const App = () => (
  <Router>
    <Routes>
      <Route path="/conference/:id" element={<ConferencePageContainer />} />
      <Route path="/results/:id" element={<ResultsPageContainer />} />
    </Routes>
  </Router>
);

export default App;
