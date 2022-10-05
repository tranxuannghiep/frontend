
import { Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { API_PATHS } from "configs/api";
import { RegisterPayload } from "models/auth";
import { RegisterForm } from "../components/RegisterForm";
import axios from 'axios';
import { ROUTES } from "configs/routes";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexFlow: "row no-wrap",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },

    box: {
        padding: theme.spacing(3)
    }

}))

export default function RegisterPage() {
    const classes = useStyles()
    const navigate = useNavigate()
    const initialValues: RegisterPayload = {
        email: '',
        name: '',
        password: '',
        repeatPassword: '',
        gender: 'male',
        age: ''
    }
    const handleRegisterFormSubmit = async (formValues: RegisterPayload) => {
        await axios.post(API_PATHS.register, formValues);
        navigate(ROUTES.login);
    }

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component='h1' align="center">Register</Typography>
                <Box mt={4}>
                    <RegisterForm initialValues={initialValues} onSubmit={handleRegisterFormSubmit} />
                </Box>
            </Paper>
        </div>
    );
}
