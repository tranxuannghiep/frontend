import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { InputField, RadioGroupField } from "components/FormFields";
import { ROUTES } from "configs/routes";
import { RegisterPayload } from "models/auth";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export interface RegisterFormProps {
    initialValues?: RegisterPayload;
    onSubmit: (user: RegisterPayload) => void;
}

export function RegisterForm({ initialValues, onSubmit }: RegisterFormProps) {

    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().email("Please enter email").required("Email is required"),
        password: yup
            .string()
            .min(4, "Min password is 4 characters")
            .required("Password is required"),
        repeatPassword: yup
            .string()
            .required("RepeatPassword is required")
            .oneOf([yup.ref("password")], "RepeatPassword not matched"),
        name: yup
            .string()
            .required("Name is required")
            .test("two words", "Name too short", (value = "") => {
                return value.trim().split(" ").length >= 2;
            }),
        gender: yup.string().required("Gender is required"),
        age: yup.number().required("Region is required"),
    })

    const { control, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: RegisterPayload) => {
        try {
            setLoading(true)
            await onSubmit(formValues)
            setLoading(false)
            toast.success("Register user successfully!")
        } catch (error: any) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="email" control={control} label="Email" />
                <InputField name="name" control={control} label="Name" />
                <InputField name="password" control={control} label="Password" type="password" />
                <InputField name="repeatPassword" control={control} label="Repeat password" type="password" />
                <InputField name="age" control={control} label="Age" typeInput="positive" />
                <RadioGroupField name="gender" control={control} label="Gender" options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                ]} />
                <Box mt={2}>
                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                        {loading && <CircularProgress size={16} color="primary" />} Register
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
