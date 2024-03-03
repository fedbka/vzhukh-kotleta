import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.ts';
import { ConstructorPage } from '../../pages/constructor-page/constructor-page.tsx';
import { FeedPage } from '../../pages/feed-page/feed-page.tsx';
import { PasswordRecoveryPage } from '../../pages/forgot-password-page/forgot-password-page.tsx';
import { LoginPage } from '../../pages/login-page/login-page.tsx';
import { LogoutPage } from '../../pages/logout-page/logout-page.tsx';
import { OrderPage } from '../../pages/order-page/order-page.tsx';
import { ProfileOrdersPage } from '../../pages/profile-orders-page/profile-orders-page.tsx';
import { ProfilePage } from '../../pages/profile-page/profile-page.tsx';
import { RegistrationPage } from '../../pages/registration-page/registration-page.tsx';
import { PasswordResetPage } from '../../pages/reset-password-page/reset-password-page.tsx';
import { useGetUserQuery, useRefreshTokenMutation } from '../../services/api/auth.ts';
import { selectIsAuthenticated } from '../../services/store/user.ts';
import { Header } from '../header/header.tsx';
import { IngredientInfo } from '../ingredient-info/ingredient-info.tsx';
import { Modal } from '../modal/modal.tsx';
import { ProtectedRoute } from '../protected-route/protected-route.tsx';
import './vzhukh-kotleta.module.css';

const VzhukhKotleta = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const onCloseHandler = useCallback(() => navigate(-1), [navigate]);

  const [tokenRefreshed, setTokenRefreshed] = useState<boolean>(false);
  const userIsAuthenticated = useAppSelector(state => selectIsAuthenticated(state));
  const { refetch: refetchGetUserQuery, isError: userAuthIsError, isFetching: userAuthIsFetching, isSuccess: userAuthIsSuccess } = useGetUserQuery(null);

  const [refreshToken, { isSuccess: refreshTokenIsSuccess }] = useRefreshTokenMutation();

  useEffect(() => {
    if (userIsAuthenticated || userAuthIsSuccess) return;

    if (userAuthIsError && !tokenRefreshed) {
      setTokenRefreshed(true);
      refreshToken(null);
    }
  }, [userIsAuthenticated, userAuthIsSuccess, userAuthIsError, tokenRefreshed]);

  useEffect(() => {
    if (userAuthIsSuccess) return;
    if (refreshTokenIsSuccess && !userAuthIsFetching) refetchGetUserQuery();

  }, [userIsAuthenticated, userAuthIsSuccess, refreshTokenIsSuccess, userAuthIsFetching]);

  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path="/feed" element={<FeedPage />} />
        <Route path='/feed/:orderNumber' element={<OrderPage />} />
        <Route path="/ingredients/:id" element={<IngredientInfo />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute anonymous={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute anonymous={false}>
              <ProfileOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/:orderNumber"
          element={
            <ProtectedRoute anonymous={false}>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous={true}>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute anonymous={true}>
              <PasswordRecoveryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute anonymous={true}>
              <PasswordResetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute anonymous={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute anonymous={false}>
              <LogoutPage />
            </ProtectedRoute>
          }
        />

      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onCloseHandler={onCloseHandler}>
                <IngredientInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:orderNumber"
            element={
              <Modal onCloseHandler={onCloseHandler}>
                <OrderPage />
              </Modal>
            }
          />
          <Route
            path="/feed/:orderNumber"
            element={
              <Modal onCloseHandler={onCloseHandler}>
                <OrderPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
};

export default VzhukhKotleta;
