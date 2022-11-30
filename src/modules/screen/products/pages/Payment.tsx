import { Paper, Typography, Box, Button, CircularProgress } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { InputField } from "components/FormFields";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { API_PATHS } from "configs/api";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, getTotalPrice } from "../redux/selectors/selectors";
import { clearCart } from "../redux/cartAction";
import axiosClient from "helpers/axiosClient";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexFlow: "row no-wrap",
        justifyContent: 'center',
        alignItems: 'center',
        margin: "40px"
    },

    box: {
        padding: theme.spacing(3)
    }

}))

export default function Payment() {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const carts = useSelector(cartSelector);
    const totalPrice = useSelector(getTotalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const initialValues = {
        name: '',
        address: '',
        phone: '',

    }
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address is required"),
        phone: yup.string().min(10, "Phone are 10 numbers").max(10, "Phone are 10 numbers").required("Phone is required")
    })

    const { control, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (form: any) => {
        const listProducts = carts.map((cart: any) => ({
            cartId: cart._id,
            title: cart.title,
            quantity: cart.quantity,
            price: cart.price,
            image: cart.image[0],
            author: cart.author._id,
            category: cart.category._id
        }))
        dispatch(clearCart())
        setLoading(true)
        await axiosClient.post(API_PATHS.payment, { ...form, listProducts, totalPrice });
        setLoading(false)
        toast.success("Buy success!")
        navigate("/");
    }

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.box}>
                <Typography variant="h5" component='h1' align="center">Thanh toán</Typography>
                <Box mt={4} >
                    <Box maxWidth={600}>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <InputField name="name" control={control} label="Name" />
                            <InputField name="address" control={control} label="Address" multiline={true} minRows={4} />
                            <InputField name="phone" control={control} label="Phone" typeInput="positive" />
                            <Box mt={2}>
                                <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading || carts.length === 0}>
                                    {loading && <CircularProgress size={16} color="primary" />} Mua ngay
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}
