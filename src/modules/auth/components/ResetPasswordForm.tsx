import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { InputField } from "components/FormFields";
import { ResetPasswordPayload } from "models/auth";
import queryString from 'query-string';
import { useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export interface ResetPasswordFormProps {
    initialValues: ResetPasswordPayload;
    onSubmit: (formValues: ResetPasswordPayload) => void;
}

export function ResetPasswordForm({ initialValues, onSubmit }: ResetPasswordFormProps) {

    const location = useLocation();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);

        return params
    }, [location.search]);

    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        password: yup
            .string()
            .min(4, "Min password is 4 characters")
            .required("Password is required"),
        repeatPassword: yup
            .string()
            .required("RepeatPassword is required")
            .oneOf([yup.ref("password")], "RepeatPassword not matched"),
    })

    const { control, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: ResetPasswordPayload) => {
        const { token, id } = queryParams;
        try {
            setLoading(true)
            await onSubmit({
                ...formValues,
                token: (token as string),
                userId: (id as string)
            })
            setLoading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="password" control={control} label="New password" type="password" />
                <InputField name="repeatPassword" control={control} label="Confirm password" type="password" />
                <Box mt={2}>
                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                        {loading && <CircularProgress size={16} color="primary" />} Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
