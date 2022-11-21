import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/system';
import './main.scss';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';
const Main = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    speed: 500,
  };
  const SlickArrowLeft = ({ className, onClick }) => (
    <div className={className} onClick={onClick}>
      <ChevronLeftIcon />
    </div>
  );
  const SlickArrowRight = ({ className, onClick }) => (
    <div className={className} onClick={onClick}>
      <ChevronRightIcon />
    </div>
  );
  return (
    <div id="Main">
      <Container>
        <Box paddingTop={6} paddingBottom={6}>
          <Slider {...settings} prevArrow={<SlickArrowLeft />} nextArrow={<SlickArrowRight />}>
            <Link to="/products">
              <Box>
                <img
                  src="https://mockuptree.com/wp-content/uploads/edd/2018/08/Book-Cover-Mockup-Free-PSD-Template-Cover.jpg"
                  alt=""
                  width="100%"
                  className="img-slider"
                />
              </Box>
            </Link>
            <Link to="/products">
              <Box>
                <img
                  src="https://covervault.com/wp-content/uploads/2016/03/038-6x9-Paperback-Book-Front-Back-Template-Mockup-Pre1.jpg"
                  alt=""
                  width="100%"
                  className="img-slider"
                />
              </Box>
            </Link>
            <Link to="/products">
              <Box>
                <img
                  src="https://static01.nyt.com/images/2022/07/07/books/06BOOKABDELMAHMOUD/06BOOKABDELMAHMOUD-jumbo-v3.png"
                  alt=""
                  width="100%"
                  className="img-slider"
                />
              </Box>
            </Link>
            <Link to="/products">
              <Box>
                <img
                  src="https://cdn.newsapi.com.au/image/v1/8791f511b22d3b0abb8b52c575bff083?width=650"
                  alt=""
                  width="100%"
                  className="img-slider"
                />
              </Box>
            </Link>
            <Link to="/products">
              <Box>
                <img
                  src="https://img.freepik.com/free-psd/mockup-half-open-book-standing-light-background_125540-1471.jpg?w=2000"
                  alt=""
                  width="100%"
                  className="img-slider"
                />
              </Box>
            </Link>
            <Link to="/products">
              <Box>
                <img
                  src="https://hiu.vn/wp-content/uploads/2020/06/used-books-store-2.jpg"
                  alt=""
                  width="100%"
                  className="img-slider"
                />
              </Box>
            </Link>
          </Slider>
        </Box>
        <Box>
          <Paper elevation={0}>
            <Typography variant="h5" padding={2}>
              Gợi Ý Hôm Nay
            </Typography>
          </Paper>
          <Grid container spacing={1} marginTop={0.5}>
            <Grid item lg={3}>
              <Paper elevation={0}>
                <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
                  <Link to="/products">
                    <img
                      src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                      width="100px"
                      alt=""
                    />
                  </Link>
                  <Typography marginTop={1}>Dành cho bạn</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item lg={3}>
              <Paper elevation={0}>
                <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
                  <Link to="/products">
                    <img
                      src="https://salt.tikicdn.com/cache/w100/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png.webp"
                      width="100px"
                      alt=""
                    />
                  </Link>
                  <Typography marginTop={1}>Deal Siêu Hot</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item lg={3}>
              <Paper elevation={0}>
                <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
                  <Link to="/products">
                    <img
                      src="https://salt.tikicdn.com/cache/w100/ts/personalish/0f/59/9d/215fa18ef72e430eefcbfe5355cab8e2.png.webp"
                      width="100px"
                      alt=""
                    />
                  </Link>
                  <Typography marginTop={1}>Rẻ vô đối</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item lg={3}>
              <Paper elevation={0}>
                <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
                  <Link to="/products">
                    <img
                      src="https://salt.tikicdn.com/cache/w100/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png.webp"
                      width="100px"
                      alt=""
                    />
                  </Link>
                  <Typography marginTop={1}>Hàng mới</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Main;
