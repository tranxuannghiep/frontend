import { APIHost } from "utils/constants";

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/api/v1/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}/api/v1`;
  }

  return "";
}

export const API_PATHS = {
  login: `${getBaseUrl(APIService.auth)}/login`,
  register: `${getBaseUrl(APIService.auth)}/register`,
  forgotPassword: `${getBaseUrl(APIService.auth)}/forgotpassword`,
  resetPassword: `${getBaseUrl(APIService.auth)}/resetpassword`,
  uploadAvatar: `${getBaseUrl(APIService.auth)}/upload`,
  getUserList: `${getBaseUrl(APIService.auth)}`,
  getUserById: `${getBaseUrl(APIService.auth)}/user`,
  updateUserById: `${getBaseUrl(APIService.auth)}/user`,
  deleteUserList: `${getBaseUrl(APIService.auth)}/delete`,
  getCategoryList: `${getBaseUrl(APIService.public)}/category`,
  getProductList: `${getBaseUrl(APIService.public)}/book/all`,
  getProductById: `${getBaseUrl(APIService.public)}/book`,
  addProduct: `${getBaseUrl(APIService.public)}/book`,
  deleteProduct: `${getBaseUrl(APIService.public)}/book/delete`,
  uploadProduct: `${getBaseUrl(APIService.public)}/book/upload`,
};
