import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import { useQuery } from 'modules/screen/hooks/useQuery';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductFilters from '../components/ProductFilters';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import ProductList from './../components/ProductList';

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
  const [, setQuery] = useQuery();

  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    console.log(params);

    return {
      ...params,
      _page: params._page || 1,
      _limit: params._limit || 8,
      _sort: params._sort || 'salePrice:ASC',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    totalPages: 1,
    totalDocs: 8,
  });
  const [filters, setFilters] = useState({
    price: "",
    category: "",
    sortBy: "price",
    orderBy: "asc",
    page: 1,
    limit: 8
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const json = await axios.post(API_PATHS.getProductList, filters);
        console.log(json)
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
  }, [filters]);
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
    console.log(newFilters);
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    setQuery(filters);
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
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
