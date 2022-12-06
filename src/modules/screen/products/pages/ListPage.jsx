import { Box, Button, Container, Grid, Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { API_PATHS } from 'configs/api';
import { useEffect, useMemo, useState } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import ProductList from './../components/ProductList';
import queryString from 'query-string';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosClient from 'helpers/axiosClient';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListPage() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate()
  const { id } = useParams()
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    totalPages: 1,
    totalDocs: 8,
  });
  const [filters, setFilters] = useState({
    title: "",
    price: "",
    category: "",
    sortBy: "price",
    orderBy: "asc",
    page: 1,
    limit: 8
  });
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return params.title || ""
  }, [location.search]);

  useEffect(() => {
    setFilters(prev => ({
      ...prev, title: queryParams
    }))
  }, [queryParams])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (location.pathname.includes("/shop/products")) {
          filters.author = id
        }
        else {
          delete filters.author
        }
        const json = await axiosClient.post(API_PATHS.getProductList, filters);
        if (json.status === 200) {
          setProductList(json.data.data);
          setPagination({
            page: json.data.paginate.page,
            limit: json.data.paginate.limit,
            totalPages: json.data.paginate.totalPages,
            totalDocs: json.data.paginate.totalDocs,
          });
        }
      } catch (error) {
        console.log('Failed', error);
      }
      setLoading(false);
    })();
  }, [filters, location.pathname, id]);
  // handle
  const handlePageChange = (e, page) => {
    const newFilters = {
      ...filters,
      page,
    };
    setFilters(newFilters);
  };

  const handleSortChange = (newSortValue) => {
    const newFilters = {
      ...filters,
      orderBy: newSortValue,
    };
    setFilters(newFilters);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };
  return (
    <Box>
      <Container>
        {location.pathname.includes("/shop/products") &&
          <Button variant='contained' onClick={() => navigate("/products")}>Quay lại shop chính</Button>
        }
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={filters} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters.orderBy} onChange={handleSortChange} />
              {loading ? (
                <ProductSkeletonList length={+pagination.limit} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <Pagination
                  count={pagination.totalPages}
                  color="primary"
                  onChange={handlePageChange}
                  page={pagination.page || 1}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
