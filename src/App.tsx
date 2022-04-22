import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/styles/index.scss';
import Auth from './components/Auth';
import Header from './components/elements/Header';
import MultiRoutes from './components/shared/MultiRoute';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from './configs/routes/routes';
import { useAppSelector } from './hooks/redux';

const App: React.FC = () => {
    const { isLogedIn } = useAppSelector((state) => state.auth);
    return (
        <div className="main">
            <Auth />
            <Routes>
                {isLogedIn
                    ? PROTECTED_ROUTES.map((route, i) =>
                          Array.isArray(route.path) ? (
                              route.path.map((p) => (
                                  <Route
                                      path={p}
                                      element={
                                          <div className="protected">
                                              <Header />
                                              <route.component />
                                          </div>
                                      }
                                      key={p + i}
                                  />
                              ))
                          ) : (
                              <Route
                                  path={route.path}
                                  element={
                                      <div className="protected">
                                          <Header />
                                          <route.component />
                                      </div>
                                  }
                                  key={i}
                              />
                          ),
                      )
                    : PUBLIC_ROUTES.map((route, i) =>
                          Array.isArray(route.path) ? (
                              route.path.map((p) => (
                                  <Route path={p} element={<route.component />} key={p + i} />
                              ))
                          ) : (
                              <Route path={route.path} element={<route.component />} key={i} />
                          ),
                      )}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </div>
    );
};

export default App;
