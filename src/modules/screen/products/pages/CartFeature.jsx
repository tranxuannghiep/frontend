import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice, THUMBNAIL_PLACEHOLDER } from 'utils';
import { removeManyToCart, removeToCart, setArrayId, updateToCart } from '../redux/cartAction';
import {
    arrayIdSelector,
    cartSelector,
    getTotalPrice
} from '../redux/selectors/selectors';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
    },
    left: {
        flex: '1 1 0',
    },
    right: {
        width: '300px',
    },
    product: {
        display: 'flex',
        alignItems: 'center',
        '& > img': {
            marginRight: '20px',
            width: "100px",
            height: "100px"
        },
    },
    quantity: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        width: 'fit-content',
        '& > .value-quantity': {
            borderLeft: '1px solid #ddd',
            padding: '10px 20px',
            borderRight: '1px solid #ddd',
        },
    },
}));

function CartFeature() {
    const carts = useSelector(cartSelector);
    const getPrice = useSelector(getTotalPrice);
    const arrayId = useSelector(arrayIdSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const columns = [
        { id: 'all', label: 'Tât cả', minWidth: 250 },
        {
            id: 'price',
            label: 'Đơn giá',
            minWidth: 100,
            format: (value) => formatPrice(value),
        },
        {
            id: 'quantity',
            label: 'Số lượng',
            minWidth: 100,
        },
        {
            id: 'totalPrice',
            label: 'Thành tiền',
            minWidth: 100,

            format: (value) => formatPrice(value),
        },
        {
            id: 'remove',
            label: '',
            minWidth: 20,
        },
    ];
    function createData(all, price, quantity, remove) {
        const totalPrice = price * quantity.quantity;
        return { all, price, quantity, totalPrice, remove };
    }

    const rows = carts.map((val) =>
        createData(
            {
                thumbnailUrl: val.image.length > 0 ? val.image[0] : THUMBNAIL_PLACEHOLDER,
                name: val.name,
                id: val._id,
            },
            val.price,
            {
                quantity: val.quantity,
                id: val._id,
            },
            val._id
        )
    );
    const handleSubQuantity = (_id, quantity) => {
        dispatch(updateToCart({ _id, quantity: +quantity - 1 }));
    };
    const handleAddQuantity = (_id, quantity) => {
        dispatch(updateToCart({ _id, quantity: +quantity + 1 }));
    };
    const [open, setOpen] = useState(false);
    const [idRemove, setIdRemove] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIdRemove(0);
    };
    const handleDeleteItem = () => {
        if (idRemove !== 0) {
            dispatch(removeToCart(idRemove));
            toast.success('Xóa sản phẩm thành công')
            if (arrayId.includes(idRemove)) {
                const newArrId = arrayId.filter((val) => val !== idRemove);
                dispatch(setArrayId(newArrId));
            }
        } else {
            dispatch(removeManyToCart(arrayId));
            toast.success('Xóa sản phẩm thành công')
            dispatch(setArrayId([]));
        }
        handleClose();
    };
    const handleClickDelete = (id) => {
        setIdRemove(id);
        handleClickOpen();
    };
    const handleDeleteAll = () => {
        if (!arrayId.length) {
            toast.info('Vui lòng chọn ít nhất 1 sản phẩm')
        } else {
            handleClickOpen();
        }
    };
    const handleCheckarrayId = (id) => {
        if (arrayId.includes(id)) {
            const newArrId = arrayId.filter((val) => val !== id);
            dispatch(setArrayId(newArrId));
        } else {
            dispatch(setArrayId([...arrayId, id]));
        }
    };
    const handleCheckAll = (e) => {
        const { checked } = e.target;
        if (!checked) {
            dispatch(setArrayId([]));
        } else {
            const newArrId = carts.map((val) => val._id);
            dispatch(setArrayId(newArrId));
        }
    };

    const handleBuy = () => {
        navigate("/payment")
    }

    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Container>
                <Typography component="h2" variant="h4" marginBottom={6}>
                    Giỏ hàng
                </Typography>
                <Grid container spacing={2.5}>
                    <Grid item className={classes.left}>
                        <Paper elevation={2}>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => {
                                                if (column.id === 'all') {
                                                    return (
                                                        <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                                            <Checkbox
                                                                checked={carts.length === arrayId.length && arrayId.length > 0}
                                                                onChange={handleCheckAll}
                                                            />
                                                            {column.label}
                                                        </TableCell>
                                                    );
                                                } else if (column.id === 'remove') {
                                                    return (
                                                        <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                                            <IconButton onClick={handleDeleteAll}>
                                                                <Delete />
                                                            </IconButton>
                                                        </TableCell>
                                                    );
                                                } else
                                                    return (
                                                        <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                                            {column.label}
                                                        </TableCell>
                                                    );
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => {
                                            return (
                                                <TableRow tabIndex={-1} key={row.remove}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        if (column.id === 'all') {
                                                            return (
                                                                <TableCell key={column.id}>
                                                                    <Box className={classes.product}>
                                                                        <Checkbox
                                                                            onChange={() => handleCheckarrayId(value.id)}
                                                                            checked={arrayId.includes(value.id)}
                                                                        />

                                                                        <img src={value.thumbnailUrl} alt="" width="100px" />
                                                                        {value.name}
                                                                    </Box>
                                                                </TableCell>
                                                            );
                                                        } else if (column.id === 'remove') {
                                                            return (
                                                                <TableCell key={column.id}>
                                                                    <IconButton onClick={() => handleClickDelete(value)}>
                                                                        <Delete />
                                                                    </IconButton>
                                                                </TableCell>
                                                            );
                                                        } else if (column.id === 'quantity') {
                                                            return (
                                                                <TableCell key={column.id}>
                                                                    <Box className={classes.quantity}>
                                                                        <Box>
                                                                            <IconButton
                                                                                onClick={() => handleSubQuantity(value.id, value.quantity)}
                                                                            >
                                                                                <RemoveIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                        <Box className="value-quantity">
                                                                            <span>{value.quantity}</span>
                                                                        </Box>
                                                                        <Box>
                                                                            <IconButton
                                                                                onClick={() => handleAddQuantity(value.id, value.quantity)}
                                                                            >
                                                                                <AddIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                    </Box>
                                                                </TableCell>
                                                            );
                                                        }
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={2} style={{ margin: '10px 0 20px' }}>
                            <Box padding={4}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2">Tổng tiền</Typography>
                                    <Typography variant="body2" color="#fe3834">
                                        {formatPrice(getPrice)}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    style={{ opacity: 0.8, fontSize: '12px', marginTop: '15px' }}
                                >
                                    * Đơn hàng đã bao gồm thuế VAT nếu có.
                                </Typography>
                                <Button fullWidth variant="contained" onClick={handleBuy} style={{ marginTop: "16px" }} disabled={carts.length === 0}>
                                    Mua hàng
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={open}
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={(_, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
            >
                <Box padding={1.5}>
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
                        <WarningAmberOutlinedIcon style={{ marginRight: '10px', color: '#f1c40f' }} />{' '}
                        <Typography>Xóa sản phẩm</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn có muốn xóa sản phẩm đang chọn?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleDeleteItem}>
                            Xác nhận
                        </Button>
                        <Button variant="contained" onClick={handleClose} autoFocus>
                            Hủy
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}

export default CartFeature;
