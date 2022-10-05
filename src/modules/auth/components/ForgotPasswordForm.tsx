import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { InputField } from "components/FormFields";
import { ROUTES } from "configs/routes";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export interface ForgotPasswordFormProps {
    email: string;
    onSubmit: (email: string) => void;
}

export function ForgotPasswordForm({ email, onSubmit }: ForgotPasswordFormProps) {
    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().email("Please enter email").required("Email is required"),
    })

    const { control, handleSubmit } = useForm({
        defaultValues: { email },
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: { email: string }) => {
        try {
            setLoading(true)
            await onSubmit(formValues.email)
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
                <Box mt={2}>
                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                        {loading && <CircularProgress size={16} color="primary" />} Submit
                    </Button>
                </Box>
                <Box mt={2}>
                    <Link to={ROUTES.login} color="inherit" style={{ textDecoration: "none" }}>
                        <Button fullWidth variant="outlined">Already have an account. Login here</Button>
                    </Link>
                </Box>
            </form>
        </Box>
    );
}
