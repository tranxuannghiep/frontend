import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { InputField, RadioGroupField } from "components/FormFields";
import { User } from "models/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import "./DetailUserForm.scss";

export interface DetailUserFormProps {
    initialValues: User;
    onSubmit: (user: User) => void;
}

export function DetailUserForm({ initialValues, onSubmit }: DetailUserFormProps) {
    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().email("Please enter email").required("Email is required"),
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
    const handleFormSubmit = async (user: User) => {
        try {
            setLoading(true)
            await onSubmit(user)
            setLoading(false)
            toast.success("Register user successfully!")
        } catch (error: any) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <Paper elevation={3}>
            <div id="DetailUserForm">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputField name="name" control={control} label="Name" />
                    <InputField name="email" control={control} label="Email" />
                    <InputField name="age" control={control} label="Age" typeInput="positive" />
                    <RadioGroupField name="gender" control={control} label="Gender" options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ]} />
                    <InputField name="createdAt" control={control} label="CreatedAt" readOnly disabled />
                    <Box mt={2}>
                        <Button type="submit" variant="contained">
                            {loading && <CircularProgress size={16} color="primary" />}Edit user
                        </Button>
                    </Box>
                </form>
            </div>
        </Paper>
    );
}
