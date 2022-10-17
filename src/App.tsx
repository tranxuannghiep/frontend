import { ROUTES } from 'configs/routes';
import Layout from 'Layout/Layout';
import ForgotPasswordPage from 'modules/auth/pages/ForgotPasswordPage';
import LoginPage from 'modules/auth/pages/LoginPage';
import RegisterPage from 'modules/auth/pages/RegisterPage';
import ResetPasswordPage from 'modules/auth/pages/ResetPasswordPage';
import AddEditProductPage from 'modules/products/pages/AddEditProductPage';
import ManageProductPage from 'modules/products/pages/ManageProductPage';
import DetailUserPage from 'modules/users/pages/DetailUserPage';
import ManageUserPage from 'modules/users/pages/ManageUserPage';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
