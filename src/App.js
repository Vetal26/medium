import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed/GlobalFeed';
import Article from './pages/Article/Article';

function App() {
  return (
    <div>
      <h3>Welcome</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalFeed />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
