import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from '@mui/material/styles';
import { API_PATHS } from "configs/api";
import { useCallback, useEffect, useState } from "react";
import ProductRankingList from "../components/ProductRankingList";
import Widget from "../components/Widget";
import StatisticItem from "../components/StatisticItem";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AiOutlineDollarCircle } from "react-icons/ai";
import { TbBrandProducthunt } from "react-icons/tb";
import axiosClient from "helpers/axiosClient";
import { formatPrice } from "utils";


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: '100%'
  }
}))

export default function DashBoard() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [bestSeller, setBestSeller] = useState([]);
  const [totalPriceList, setTotalPriceList] = useState([]);
  const [highPriceList, setHighPriceList] = useState([]);
  const [lowPriceList, setLowPriceList] = useState([]);
  const getData = useCallback(async () => {
    setLoading(true)
    const res = await axiosClient.get(API_PATHS.payment);
    if (res.data.success) {
      const { topSeller, topPrice, highPriceList, lowPriceList, maxQuantity, highPrice, lowPrice, totalProduct } = res.data.data
      setBestSeller(topSeller)
      setTotalPriceList(topPrice)
      setHighPriceList(highPriceList)
      setLowPriceList(lowPriceList)
      setQuantity(maxQuantity)
      setTotalProduct(totalProduct)
      setHighPrice(highPrice)
      setLowPrice(lowPrice)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, []);
  useEffect(() => {
    getData()
  }, [getData])
  return (
    <Box className={classes.root}>
      {loading &&
        <Box className={classes.loading}>
          <LinearProgress />
        </Box>
      }
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem icon={<AiOutlineDollarCircle fontSize='large' color="primary" />} label="Quantity" value={quantity} />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem icon={<TbBrandProducthunt fontSize='large' color="primary" />} label="Total price" value={formatPrice(totalProduct)} />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem icon={<ArrowUpwardIcon fontSize='large' color="primary" />} label="Highest price" value={formatPrice(highPrice)} />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem icon={<ArrowDownwardIcon fontSize='large' color="primary" />} label="Lowest price" value={formatPrice(lowPrice)} />
        </Grid>
      </Grid>
      <Box my={4}>
        <Typography variant='h4'>All Products</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Widget title='Product with best seller'>
                <ProductRankingList productList={bestSeller} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget title='Product with highest total price'>
                <ProductRankingList productList={totalPriceList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget title='Product with highest price'>
                <ProductRankingList productList={highPriceList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget title='Product with lowest price'>
                <ProductRankingList productList={lowPriceList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
