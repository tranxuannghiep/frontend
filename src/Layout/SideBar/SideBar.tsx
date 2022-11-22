import "./SideBar.scss";
import { TbUsers } from "react-icons/tb";
import { AiOutlineLeft } from "react-icons/ai";
import { FiTag } from "react-icons/fi";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { Paper } from "@mui/material";
export interface SideBarProps { }

export default function SideBar(props: SideBarProps) {
  const navigate = useNavigate();
  const [openCatalog, setOpenCatalog] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  return (
    <Paper elevation={3}>
      <div id="SideBar">
        <ul>
          <li
            onClick={() => setOpenCatalog(!openCatalog)}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <FiTag />
                <span>Catalog</span>
              </div>
              <AiOutlineLeft className={openCatalog ? "rotate-90" : ""} />
            </div>
          </li>
          <Collapse in={openCatalog}>
            <ul>
              <li
                onClick={() => {
                  navigate(ROUTES.productList);
                }}
              >
                Product
              </li>
            </ul>
          </Collapse>
          <li
            onClick={() => setOpenUser(!openUser)}
          >
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center">
                <TbUsers />
                <span>User</span>
              </div>
              <AiOutlineLeft className={openUser ? "rotate-90" : ""} />
            </div>
          </li>
          <Collapse in={openUser}>
            <ul>
              <li
                onClick={() => {
                  navigate(ROUTES.userList);
                }}
              >
                User list
              </li>
            </ul>
          </Collapse>
        </ul>
      </div>
    </Paper>
  );
}
