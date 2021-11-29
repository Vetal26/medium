import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUser';

const EditArticle = () => {
  const { slug } = useParams();
  const apiUrl = `/articles/${slug}`;
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateActicle,
  ] = useFetch(apiUrl);
  const [{ response: fetchArticleResponse }, doFetchActicle] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [initialValues, setInitialValues] = useState(null);

  const onSubmit = (article) => {
    doUpdateActicle({
      method: 'PUT',
      data: { article },
    });
  };

  useEffect(() => {
    doFetchActicle();
  }, [doFetchActicle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList.join(' '),
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === null) {
    return;
  }

  if (currentUserState.isLoggedIn === false) {
    return <Navigate to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Navigate to={`/articles/${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={onSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
