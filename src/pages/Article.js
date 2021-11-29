import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import TagList from '../components/Taglist';
import ErrorMessage from '../components/ErrorMessage';
import { CurrentUserContext } from '../contexts/currentUser';

const Article = () => {
  const { slug } = useParams();
  const apiUrl = `/articles/${slug}`;
  const [
    {
      response: fetchArticleResponse,
      isLoading: fetchArticleIsLoading,
      error: fetchArticleError,
    },
    doFetch,
  ] = useFetch(apiUrl);
  const [{ response: deleteArticelResponse }, doDeleteArticle] =
    useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIssSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false;
    }

    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  const deleteActicle = () => {
    doDeleteArticle({
      method: 'DELETE',
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticelResponse) {
      return;
    }

    setIssSuccessfullDelete(true);
  }, [deleteArticelResponse]);

  if (isSuccessfullDelete) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="ion-edit"></i>
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteActicle}
                  >
                    <i className="ion-trash-a"></i>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
