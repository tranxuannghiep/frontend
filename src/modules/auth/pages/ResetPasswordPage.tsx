import { Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import axiosClient from "helpers/axiosClient";
import { ResetPasswordPayload } from "models/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

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

export default function ResetPasswordPage() {
    const classes = useStyles()
    const navigate = useNavigate()

    const handleLoginFormSubmit = async (formValues: ResetPasswordPayload) => {
        console.log(formValues)
        const json = await axiosClient.post(API_PATHS.resetPassword, formValues);
        toast.success(json.data.message)
        setTimeout(() => {
            navigate(ROUTES.login);
        }, 200);
    }

    const initialValues: ResetPasswordPayload = {
        userId: '',
        token: '',
        password: '',
        repeatPassword: ''
    }

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component='h1' align="center">Reset Password</Typography>
                <Box mt={4}>
                    <ResetPasswordForm initialValues={initialValues} onSubmit={handleLoginFormSubmit} />
                </Box>
            </Paper>
        </div>
    );
}
