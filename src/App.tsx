import { ROUTES } from "configs/routes";
import Layout from "Layout/Layout";
import LayoutProducts from "Layout/LayoutProduct";
import Main from "Layout/Main/Main";
import ForgotPasswordPage from "modules/auth/pages/ForgotPasswordPage";
import LoginPage from "modules/auth/pages/LoginPage";
import RegisterPage from "modules/auth/pages/RegisterPage";
import ResetPasswordPage from "modules/auth/pages/ResetPasswordPage";
import DashBoard from "modules/dashboard/pages/DashBoard";
import AddEditProductPage from "modules/products/pages/AddEditProductPage";
import ManageProductPage from "modules/products/pages/ManageProductPage";
import CartFeature from "modules/screen/products/pages/CartFeature";
import DetailPage from "modules/screen/products/pages/DetailPage";
import ListPage from "modules/screen/products/pages/ListPage";
import Payment from "modules/screen/products/pages/Payment";
import Shipping from "modules/shipping/pages/Shipping";
import DetailUserPage from "modules/users/pages/DetailUserPage";
import ManageUserPage from "modules/users/pages/ManageUserPage";
import PrivateRoute from "PrivateRoute/PrivateRoute";
import ProtectedRoute from "PrivateRoute/ProtectedRoute";
import SellerRoute from "PrivateRoute/SellerRoute";
import { Route, Routes } from "react-router-dom";
import store from "./redux/configureStore";
import { isEmpty } from "lodash";
import "./App.css";
import axiosClient from "helpers/axiosClient";
import { API_PATHS } from "configs/api";
import { getUser } from "modules/common/redux/authReducer";
import ChatPage from "modules/chat/pages/ChatPage";

const user = store.getState().authReducer.user;
if (isEmpty(user)) {
  (async () => {
    try {
      const json = await axiosClient.get(API_PATHS.getCurrentUser);
      store.dispatch(
        getUser({
          role: json.data.role,
          idUser: json.data.id,
        })
      );
    } catch (error) {
      console.log("error");
    }
  })();
}

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <LayoutProducts>
            <Main />
          </LayoutProducts>
        }
      />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
      <Route
        path={ROUTES.dashboard}
        element={
          <PrivateRoute>
            <Layout>
              <DashBoard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.shipping}
        element={
          <SellerRoute>
            <Layout>
              <Shipping />
            </Layout>
          </SellerRoute>
        }
      />
      <Route
        path={ROUTES.userList}
        element={
          <PrivateRoute>
            <Layout>
              <ManageUserPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={`${ROUTES.userList}/:userId`}
        element={
          <PrivateRoute>
            <Layout>
              <DetailUserPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.productList}
        element={
          <SellerRoute>
            <Layout>
              <ManageProductPage />
            </Layout>
          </SellerRoute>
        }
      />
      <Route
        path={`${ROUTES.productList}/add`}
        element={
          <SellerRoute>
            <Layout>
              <AddEditProductPage />
            </Layout>
          </SellerRoute>
        }
      />
      <Route
        path={`${ROUTES.productList}/:productId`}
        element={
          <SellerRoute>
            <Layout>
              <AddEditProductPage />
            </Layout>
          </SellerRoute>
        }
      />
      <Route
        path={ROUTES.products}
        element={
          <ProtectedRoute>
            <LayoutProducts>
              <ListPage />
            </LayoutProducts>
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.shop}/:id`}
        element={
          <ProtectedRoute>
            <LayoutProducts>
              <ListPage />
            </LayoutProducts>
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.products}/:productId`}
        element={
          <ProtectedRoute>
            <LayoutProducts>
              <DetailPage />
            </LayoutProducts>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.cart}
        element={
          <ProtectedRoute>
            <LayoutProducts>
              <CartFeature />
            </LayoutProducts>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.payment}
        element={
          <ProtectedRoute>
            <LayoutProducts>
              <Payment />
            </LayoutProducts>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.chat}
        element={
          <LayoutProducts>
            <ChatPage />
          </LayoutProducts>
        }
      />
    </Routes>
  );
}

export default App;
