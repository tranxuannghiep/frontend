import "./SideBar.scss";
import { TbUsers } from "react-icons/tb";
import { FiTag } from "react-icons/fi";
import { FaShippingFast } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
export interface SideBarProps { }

export default function SideBar(props: SideBarProps) {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.authReducer)
  const role = user.role
  return (
    <Paper elevation={3}>
      <div id="SideBar">
        <ul>
          <li
            onClick={() => {
              navigate(ROUTES.dashboard);
            }}
            hidden={role !== "admin"}
          >
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center">
                <MdDashboard />
                <span>Dashboard</span>
              </div>
            </div>
          </li>
          <li
            onClick={() => {
              navigate(ROUTES.productList);
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <FiTag />
                <span>Products</span>
              </div>
            </div>
          </li>
          <li
            onClick={() => {
              navigate(ROUTES.userList);
            }}
            hidden={role !== "admin"}
          >
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center">
                <TbUsers />
                <span>Users</span>
              </div>
            </div>
          </li>
          <li
            onClick={() => {
              navigate(ROUTES.shipping);
            }}
          // hidden={role !== "admin"}
          >
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center">
                <FaShippingFast />
                <span>Order</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Paper>
  );
}
