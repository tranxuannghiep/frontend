import { Box, Button, LinearProgress } from "@mui/material";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import axiosClient from "helpers/axiosClient";
import { Product } from "models/product";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AUTH } from "utils/constants";
import { AddEditProductForm } from "../components/AddEditProduct/AddEditProductForm";
import "./AddEditProductPage.scss";

export interface AddEditProductPageProps {
}

export default function AddEditProductPage(props: AddEditProductPageProps) {
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState(false);
    const { productId } = useParams();
    const isEdit = Boolean(productId)
    const navigate = useNavigate()

    const getUserDetailById = useCallback(
        async (id: string) => {
            try {
                setLoading(true);
                const json = await axiosClient.get(`${API_PATHS.getProductById}/${id}`)
                setProduct({
                    ...json.data.data,
                    author: json.data.data.author.name,
                    category: json.data.data.category._id
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        },
        []
    );

    useEffect(() => {
        if (!productId) return;
        getUserDetailById(productId as string)
    }, [getUserDetailById, productId])


    const handleUserFormSubmit = async (product: Product) => {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem(AUTH) || "",
            },
        };

        if (isEdit) {
            const data = await axiosClient.patch(`${API_PATHS.getProductById}/${product._id}`, product, config)
            if (data.data.success) {
                if (product.upload) {
                    const formData = new FormData()
                    formData.append("id", product._id as string)
                    formData.append("image", product.upload as File)
                    await axiosClient.post(API_PATHS.uploadProduct, formData, config)
                }
            }
        }
        else {
            const data = await axiosClient.post(API_PATHS.addProduct, product, config)
            if (data.data.success) {
                if (product.upload) {
                    const formData = new FormData()
                    formData.append("id", data.data.data._id as string)
                    formData.append("image", product.upload as File)
                    await axiosClient.post(API_PATHS.uploadProduct, formData, config)
                }
            }
        }
        navigate(ROUTES.productList)
    }
    const initialValues = {
        title: '',
        description: '',
        category: '',
        price: '',
        image: [],
        upload: null,
        ...product
    }
    return (
        <div id="AddEditProductPage">
            {loading && <LinearProgress style={{ position: 'absolute', top: '8px', width: "95%", background: '#b18aff' }} />}
            <Box mb={2}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
            </Box>
            <h4 className="title">{isEdit ? "Edit product" : "Add product"}</h4>
            <Box mt={4}>
                {(!isEdit || Boolean(product)) &&
                    <AddEditProductForm isEdit={isEdit} initialValues={initialValues} onSubmit={handleUserFormSubmit} />
                }
            </Box>
        </div>
    );
}
