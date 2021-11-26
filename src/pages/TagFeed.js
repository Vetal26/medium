import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { stringify } from 'query-string';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/useFetch';
import { getPaginator, limit } from '../utils';
import PopularTags from '../components/PopularTags';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FeedToogler from '../components/FeedToogler';

const TagFeed = () => {
  const { search, pathname } = useLocation();
  const tagName = useParams().slug;
  const { offset, currentPage } = getPaginator(search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToogler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={pathname}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagFeed;
