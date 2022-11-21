import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

function ProductSkeletonList({ length = 6 }) {
  return (
    <Box>
      <Grid container>
        {Array(length)
          .fill(0)
          .map((x, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box padding={1}>
                <Skeleton variant="rect" width="100%" height={215} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
