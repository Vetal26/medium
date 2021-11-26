import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import { CurrentUserContext } from '../contexts/currentUser';
import BackendErrorMessages from '../components/BackendErrorMessages';

const Auth = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descriptionLink = isLogin ? '/register' : '/login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isSuccessfullSubmit, setSuccessfullSubmit] = useState(false);
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage('token');
  const [, setCurrentUserState] = useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = isLogin
      ? { email, password }
      : { email, password, username: userName };

    doFetch({
      method: 'POST',
      data: { user },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setToken(response.user.token);
    setSuccessfullSubmit(true);
    setCurrentUserState((prev) => ({
      ...prev,
      isloggedIn: true,
      isLoading: false,
      currentUserState: response.user,
    }));
  }, [response, setCurrentUserState, setToken]);

  if (isSuccessfullSubmit) return <Navigate to="/" replace={true} />;

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages backendErrors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;