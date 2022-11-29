import "./SideBar.scss";
import { TbUsers } from "react-icons/tb";
import { FiTag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { Paper } from "@mui/material";
export interface SideBarProps { }

export default function SideBar(props: SideBarProps) {
  const navigate = useNavigate();
  return (
    <Paper elevation={3}>
      <div id="SideBar">
        <ul>
          <li
            onClick={() => {
              navigate(ROUTES.dashboard);
            }}
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
          >
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center">
                <TbUsers />
                <span>Users</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Paper>
  );
}
