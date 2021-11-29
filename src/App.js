import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import TagFeed from './pages/TagFeed';
import YourFeed from './pages/YourFeed';
import Article from './pages/Article';
import TopBar from './components/TopBar';
import Auth from './pages/Auth';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
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
            <Route path="/profiles">
              <Route path=":slug" element={<UserProfile />} />
              <Route path=":slug/favorites" element={<UserProfile />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/feed" element={<YourFeed />} />
            <Route path="/tags/:slug" element={<TagFeed />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/articles/:slug/edit" element={<EditArticle />} />
            <Route path="/articles/new" element={<CreateArticle />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
