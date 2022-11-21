import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { alpha, Badge, ClickAwayListener, styled, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { getTotalProduct } from 'modules/screen/products/redux/selectors/selectors';
import { closeToolTipCart } from 'modules/screen/products/redux/visibleAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlertAddCart from './AlertAddCart';
import Footer from './FooterProducts';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

const useStyle = makeStyles((theme) => ({
    root: {},
    closeButton: {
        position: 'absolute !important',
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    minWidth: '500px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    color: '#fff',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export default function LayoutProducts({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyle();
    const totalProduct = useSelector(getTotalProduct);
    const location = useLocation();
    const showToolTipCart = useSelector((state) => state.visibleReducer.showToolTipCart);
    const refSearch = useRef()
    const handleSearch = () => {
        const params = queryString.parse(location.search);
        const queryParmas = {
            ...params,
            title: refSearch.current.value,
        };
        navigate(`/products?${queryString.stringify(queryParmas)}`);
    };
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ marginBottom: "20px" }}>
                <Toolbar className={classes.toolbar}>
                    <Box>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button onClick={() => navigate('/')}>
                                <img
                                    src="https://as2.ftcdn.net/v2/jpg/02/11/07/81/1000_F_211078107_d7jQeiFY2JfdTKUu6zC8Y5d28WhYaQP4.jpg"
                                    alt=""
                                    style={{ height: '60px' }}
                                />
                            </Button>
                        </Typography>
                    </Box>

                    <Search>
                        <SearchIconWrapper onClick={handleSearch}>
                            <SearchIcon />
                        </SearchIconWrapper>

                        <StyledInputBase
                            inputRef={refSearch}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box>
                        <ClickAwayListener onClickAway={() => dispatch(closeToolTipCart())}>
                            <Box component="span">
                                <Tooltip
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                position: 'relative',
                                                bgcolor: '#fff',
                                                color: '#000',
                                                borderRadius: '6px',
                                                boxShadow: '1px 1px 15px #b3b3b3',
                                                padding: '16px',
                                                '& .MuiTooltip-arrow': {
                                                    color: '#fff',
                                                    width: '18px',
                                                    height: '12px',
                                                    left: '-3px !important',
                                                    marginTop: '-1.1em !important',
                                                },
                                            },
                                        },
                                    }}
                                    arrow
                                    placement="bottom-end"
                                    onClose={() => dispatch(closeToolTipCart())}
                                    open={showToolTipCart}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={<AlertAddCart />}
                                >
                                    <IconButton onClick={() => navigate('/cart')}>
                                        <Badge badgeContent={totalProduct} color="warning">
                                            <ShoppingCartOutlinedIcon style={{ color: '#fff' }} />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </ClickAwayListener>
                    </Box>
                </Toolbar>
            </AppBar>
            {children}
            <Footer />
        </Box>

    );
}
