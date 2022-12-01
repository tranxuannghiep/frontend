import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, IconButton, Paper, Stack } from "@mui/material";
import { InputField, SelectField } from "components/FormFields";
import { Product } from "models/product";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdPhotoCamera } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "redux/reducer";
import * as yup from "yup";
import "./AddEditProductForm.scss";

export interface AddEditProductFormProps {
    initialValues: Product;
    onSubmit: (product: Product) => void;
    isEdit: boolean
}

export function AddEditProductForm({ initialValues, onSubmit, isEdit }: AddEditProductFormProps) {
    const [loading, setLoading] = useState(false)
    const { categoryList } = useSelector((state: RootState) => state.categoryReducer)
    const [image, setImage] = useState('')

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        category: yup.string().required("Category is required"),
        price: yup.number().required("Price is required"),
    })

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })
    const handleFormSubmit = async (product: Product) => {
        try {
            setLoading(true)
            await onSubmit(product)
            setLoading(false)
            if (isEdit) {
                toast.success("Edit product successfully!")
            }
            else {
                toast.success("Add product successfully!")
            }
        } catch (error: any) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <Paper elevation={3}>
            <div id="AddEditProductForm">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputField name="title" control={control} label="Title" />
                    <InputField name="description" control={control} label="Description" multiline />
                    <InputField name="price" control={control} label="Price" />
                    <SelectField
                        name="category"
                        control={control}
                        label="Category"
                        options={categoryList.map((val: any) => ({ value: val._id, label: val.name }))}
                    />
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="icon-button-file" className="img-product p-4">
                            <input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0];
                                    if (selectedFile) {
                                        setValue("upload", selectedFile)
                                        setImage(URL.createObjectURL(selectedFile))

                                    }
                                }}
                            />
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <MdPhotoCamera fontSize="60px" className="icon-camera" />
                            </IconButton>
                            {
                                (image || initialValues.image) &&
                                <img src={image || (initialValues.image as string[])[(initialValues.image?.length as number) - 1]} alt="" />
                            }
                        </label>
                    </Stack>
                    {isEdit &&
                        <>
                            <InputField name="author" control={control} label="Author" readOnly />
                            <InputField name="createdAt" control={control} label="CreatedAt" readOnly disabled />
                        </>
                    }
                    <Box mt={2}>
                        <Button type="submit" variant="contained">
                            {loading && <CircularProgress size={16} color="primary" />} Save
                        </Button>
                    </Box>
                </form>
            </div>
        </Paper>
    );
}
