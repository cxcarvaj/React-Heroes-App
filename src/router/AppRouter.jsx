import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from '../auth';

import { HeroesRoutes } from '../heroes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login/*"
          element={
            <PublicRoute>
              <PublicRoutes />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
        />

        {/* <Route path="/login" element={ <LoginPage />}  />
                <Route path="/*" element={ <HeroesRoutes />}  /> */}
      </Routes>
    </>
  );
};
