import { Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import { setAuthToken } from "helpers/axiosClient";
import { LoginPayload } from "models/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { AUTH, ID_USER, ROLE } from "utils/constants";
import { LoginForm } from "../components/LoginForm";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexFlow: "row no-wrap",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    box: {
        padding: theme.spacing(3)
    }

}))

export default function LoginPage() {
    const classes = useStyles()
    const navigate = useNavigate()
    const initialValues: LoginPayload = {
        email: '',
        password: ''
    }

    const handleLoginFormSubmit = async (auth: LoginPayload) => {
        const json = await axios.post(API_PATHS.login, auth);
        localStorage.setItem(AUTH, json.data.token);
        localStorage.setItem(ROLE, json.data.role);
        localStorage.setItem(ID_USER, json.data.id);
        setAuthToken(json.data.token)
        setTimeout(() => {
            if (json.data.role === "admin") navigate(ROUTES.dashboard);
            else navigate("/");
        }, 200);
    }

    const isLogin = Boolean(localStorage.getItem(AUTH))
    if (isLogin) return <Navigate to={ROUTES.userList} />;
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component='h1' align="center">Login</Typography>
                <Box mt={4}>
                    <LoginForm initialValues={initialValues} onSubmit={handleLoginFormSubmit} />
                </Box>
            </Paper>
        </div>
    );
}
