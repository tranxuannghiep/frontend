import { API_PATHS } from 'configs/api';
import axiosClient from 'helpers/axiosClient';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await axiosClient.get(`${API_PATHS.getProductById}/${productId}`)
        setProduct(result.data.data);
      } catch (error) {
        console.log('Failed', error);
      }
      setLoading(false);
    })();
  }, [productId]);
  return { product, loading };
}
