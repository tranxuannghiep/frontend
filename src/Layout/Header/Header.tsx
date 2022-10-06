import "./Header.scss";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { AUTH } from "utils/constants";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Paper } from "@mui/material";
export interface HeaderProps {
}
export default function Header(props: HeaderProps) {
  // const user = JSON.parse(localStorage.getItem("user") || ""); 
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Paper elevation={3}>
      <div id="Header">
        <div className="logo">
          <div
            className="logo-icon-menu"
          >
            <AiOutlineMenu />
          </div>
          <h3 className="title">Manage Admin</h3>
          <div className="logo-icon-bell">
            <AiOutlineBell />
          </div>
        </div>
        <div className="icon-user">
          <BiUser />
        </div>
        {openDialog && (
          <div className="dialogRemove d-flex align-items-center justify-content-center">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span className="title">Log Out</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="body">Are you sure want to log out?</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn"
                      onClick={() => {
                        setOpenDialog(false);
                        localStorage.removeItem("user");
                        localStorage.removeItem(AUTH);
                        navigate(ROUTES.login);
                      }}
                    >
                      YES
                    </button>
                    <button className="btn" onClick={() => setOpenDialog(false)}>
                      NO
                    </button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        )}
      </div>
    </Paper>
  );
}
