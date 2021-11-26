import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import TagFeed from './pages/TagFeed';
import Article from './pages/Article';
import TopBar from './components/TopBar';
import Auth from './pages/Auth';
import { CurrentUserProvider } from './contexts/currentUser';
import CurrentUserChecker from './components/CurrentUserChecker';

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <Routes>
            <Route path="/" element={<GlobalFeed />} />
            <Route path="/tags/:slug" element={<TagFeed />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
