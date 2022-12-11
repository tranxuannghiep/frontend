import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { InputField } from "components/FormFields";
import { ROUTES } from "configs/routes";
import { LoginPayload } from "models/auth";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export interface LoginFormProps {
    initialValues?: LoginPayload;
    onSubmit: (auth: LoginPayload) => void;
}

export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().email("Please enter email").required("Email is required"),
        password: yup.string().min(6, "Min length is 6 characters").required("Password is required")
    })

    const { control, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: LoginPayload) => {
        try {
            setLoading(true)
            await onSubmit(formValues)
            setLoading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="email" control={control} label="Email" />
                <InputField name="password" control={control} label="Password" type="password" />
                <Box mt={2}>
                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                        {loading && <CircularProgress size={16} color="primary" />} login
                    </Button>
                </Box>
                <Box mt={2} display="flex" justifyContent="end">
                    <Link to={ROUTES.forgotPassword} color="inherit" style={{ textDecoration: "none" }}>
                        <Button fullWidth variant="text">Forgot password ?</Button>
                    </Link>
                </Box>
                <Box mt={2}>
                    <Link to={ROUTES.register} color="inherit" style={{ textDecoration: "none" }}>
                        <Button fullWidth variant="outlined">Don&apos;t have an account. Register here</Button>
                    </Link>
                </Box>
            </form>
        </Box>
    );
}
