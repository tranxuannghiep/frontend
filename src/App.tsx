import { ROUTES } from 'configs/routes';
import Layout from 'Layout/Layout';
import ForgotPasswordPage from 'modules/auth/pages/ForgotPasswordPage';
import LoginPage from 'modules/auth/pages/LoginPage';
import RegisterPage from 'modules/auth/pages/RegisterPage';
import ResetPasswordPage from 'modules/auth/pages/ResetPasswordPage';
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
    </Routes>
  );
}

export default App;
