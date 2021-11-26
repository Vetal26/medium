import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUser';

const EditArticle = () => {
  const slug = useParams().slug;
  const [currentUserState] = useContext(CurrentUserContext);
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchActicle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateActicle,
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const handleSubmit = (article) => {
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
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Navigate to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Navigate to={`/articles/${slug}`} />;
  }

  console.log(updateArticleError);

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
