import { Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import axiosClient from "helpers/axiosClient";
import { LoginPayload } from "models/auth";
import { getUser } from "modules/common/redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "redux/reducer";
import { LoginForm } from "../components/LoginForm";
import { isEmpty } from "lodash";

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
    const location = useLocation();
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.authReducer)
    const initialValues: LoginPayload = {
        email: '',
        password: ''
    }

    const handleLoginFormSubmit = async (auth: LoginPayload) => {
        const json = await axiosClient.post(API_PATHS.login, auth);
        dispatch(getUser({
            role: json.data.role,
            idUser: json.data.id
        }))
        setTimeout(() => {
            if (json.data.role === "admin")
                navigate(ROUTES.userList);
            else navigate("/");
        }, 200);
    }
    const isLogin = !isEmpty(user)
    if (isLogin) {
        const from = location.state?.from
        if (user.role === "admin") {
            return <Navigate to={from ?? ROUTES.userList} />;
        }
        else if (user.role === "seller") {
            return <Navigate to={from ?? ROUTES.productList} />;
        }
        return <Navigate to={from ?? "/"} />;
    }


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
