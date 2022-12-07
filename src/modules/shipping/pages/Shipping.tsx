import { LinearProgress } from '@mui/material';
import { API_PATHS } from 'configs/api';
import axiosClient from 'helpers/axiosClient';
import PaginationComponent from 'modules/common/PaginationComponent/PaginationComponent';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FilterPayment from '../components/FilterPayment';
import TableShip from '../components/TableShip';


export default function Shipping() {
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalDocs: 10,
  });
  const [dataShip, setDataShip] = useState<any[]>([])

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<any>({
    id: "",
    status: "",
  });

  const getDataShip = useCallback(async () => {
    setLoading(true)
    const res = await axiosClient.post(API_PATHS.ship, filters);
    setDataShip(res.data.data)
    setPagination({
      page: res.data.paginate.page,
      limit: res.data.paginate.limit,
      totalPages: res.data.paginate.totalPages,
      totalDocs: res.data.paginate.totalDocs,
    });
    setLoading(false)
  }, [filters])

  useEffect(() => {
    getDataShip()
  }, [getDataShip])

  const updateData = async (id: string, status: string) => {
    await axiosClient.post(API_PATHS.updatePayment, { id, status });
    getDataShip()
    toast.success("Update successfully !")
  }

  const onFilters = useCallback((values: any) => {
    setFilters((prev: any) => ({
      ...prev,
      ...values,
    }));
  }, []);

  return (
    <div>
      {loading && <LinearProgress style={{ position: 'absolute', top: '8px', width: "95%", background: '#b18aff' }} />}
      <FilterPayment onFilters={onFilters} />
      <TableShip dataShip={dataShip} updateData={updateData} />
      <PaginationComponent pagination={pagination} handleChange={onFilters} />
    </div>
  );
}
