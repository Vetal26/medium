import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed/GlobalFeed';
import Article from './pages/Article/Article';
import TopBar from './components/TopBar';

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<GlobalFeed />} />
        <Route path="/articles/:slug" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
