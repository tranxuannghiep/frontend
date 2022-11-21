import { Grid, Paper, Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
    },
    support: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        '& > li': {
            margin: '8px 0',
        },
    },
    icon: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        display: 'flex',
        alignItems: 'center',
        '& > li': {
            marginRight: '10px',
        },
    },
}));
export default function Footer() {
    const classes = useStyles();
    return (
        <Paper elevation={0} className={classes.root}>
            <Container>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Typography variant="h5" marginBottom={1}>
                                Hỗ trợ khách hàng
                            </Typography>
                            <ul className={classes.support}>
                                <li>
                                    <Typography variant="body1">Các câu hỏi thường gặp</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Gửi yêu cầu hỗ trợ</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Hướng dẫn đặt hàng</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Phương thức vận chuyển</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Chính sách đổi trả</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Hướng dẫn trả góp</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Chính sách hàng nhập khẩu</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Hỗ trợ khách hàng</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Báo lỗi bảo mật</Typography>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item lg={3}>
                            <Typography variant="h5" marginBottom={1}>
                                Hợp tác và liên kết
                            </Typography>
                            <ul className={classes.support}>
                                <li>
                                    <Typography variant="body1">Tuyển dụng</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Chính sách bảo mật thanh toán</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Chính sách bảo mật thông tin cá nhân</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Chính sách giải quyết khiếu nại</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Điều khoản sử dụng</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Bán hàng doanh nghiệp</Typography>
                                </li>
                                <li>
                                    <Typography variant="body1">Điều kiện vận chuyển</Typography>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item lg={3}>
                            <Typography variant="h5" marginBottom={1}>
                                Phương thức thanh toán
                            </Typography>
                            <Box>
                                <img
                                    src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/patment-icon1.png"
                                    width="95%"
                                    alt=""
                                />
                            </Box>
                            <Typography>Dịch vụ giao hàng</Typography>
                            <Box>
                                <img
                                    src="https://as2.ftcdn.net/v2/jpg/02/11/07/81/1000_F_211078107_d7jQeiFY2JfdTKUu6zC8Y5d28WhYaQP4.jpg"
                                    width="100px"
                                    alt=""
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={3}>
                            <Typography variant="h5" marginBottom={1}>
                                Kết nối với chúng tôi
                            </Typography>
                            <ul className={classes.icon}>
                                <li>
                                    <FacebookOutlinedIcon style={{ fontSize: '35px', color: 'rgb(59, 89, 152)' }} />
                                </li>
                                <li>
                                    <YouTubeIcon style={{ fontSize: '44px', color: 'rgb(255, 0, 0)' }} />
                                </li>
                                <li>
                                    <InstagramIcon style={{ fontSize: '35px', color: '#dc2743' }} />
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Paper>
    );
}
