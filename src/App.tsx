import { ROUTES } from 'configs/routes';
import Layout from 'Layout/Layout';
import LayoutProducts from 'Layout/LayoutProduct';
import Main from 'Layout/Main/Main';
import ForgotPasswordPage from 'modules/auth/pages/ForgotPasswordPage';
import LoginPage from 'modules/auth/pages/LoginPage';
import RegisterPage from 'modules/auth/pages/RegisterPage';
import ResetPasswordPage from 'modules/auth/pages/ResetPasswordPage';
import AddEditProductPage from 'modules/products/pages/AddEditProductPage';
import ManageProductPage from 'modules/products/pages/ManageProductPage';
import CartFeature from 'modules/screen/products/pages/CartFeature';
import DetailPage from 'modules/screen/products/pages/DetailPage';
import ListPage from 'modules/screen/products/pages/ListPage';
import DetailUserPage from 'modules/users/pages/DetailUserPage';
import ManageUserPage from 'modules/users/pages/ManageUserPage';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <LayoutProducts >
            <Main />
          </LayoutProducts>

        }
      />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
      <Route path={ROUTES.userList} element={
        <Layout>
          <ManageUserPage />
        </Layout>}
      />
      <Route path={`${ROUTES.userList}/:userId`} element={
        <Layout>
          <DetailUserPage />
        </Layout>}
      />
      <Route path={ROUTES.productList} element={
        <Layout>
          <ManageProductPage />
        </Layout>}
      />
      <Route path={`${ROUTES.productList}/add`} element={
        <Layout>
          <AddEditProductPage />
        </Layout>}
      />
      <Route path={`${ROUTES.productList}/:productId`} element={
        <Layout>
          <AddEditProductPage />
        </Layout>}
      />
      <Route path={ROUTES.products} element={
        <LayoutProducts >
          <ListPage />
        </LayoutProducts>}
      />
      <Route path={`${ROUTES.products}/:productId`} element={
        <LayoutProducts >
          <DetailPage />
        </LayoutProducts>}
      />
      <Route
        path="/cart"
        element={
          <LayoutProducts >
            <CartFeature />
          </LayoutProducts>

        }
      />

    </Routes>
  );
}

export default App;
