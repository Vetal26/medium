import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed/GlobalFeed';
import Article from './pages/Article/Article';
import TopBar from './components/TopBar';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<GlobalFeed />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
