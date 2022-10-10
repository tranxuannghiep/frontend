import { LinearProgress } from '@mui/material';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import { ProductFilter } from 'models/product';
import PaginationComponent from 'modules/common/PaginationComponent/PaginationComponent';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'redux/reducer';
import FilterProduct from '../components/ManageProduct/FilterProduct/FilterProduct';
import RemoveProduct from '../components/ManageProduct/RemoveProduct/RemoveProduct';
import TableProduct from '../components/ManageProduct/TableProduct/TableProduct';
import { getProductList } from '../redux/mangeProductReducer';
import "./ManageProductPage.scss";
export interface ManageProductPageProps {
}

export default function ManageProductPage(props: ManageProductPageProps) {

    const dispatch = useDispatch<ThunkDispatch<RootState, null, Action<string>>>()
    const { productList } = useSelector((state: RootState) => state.mangeProductReducer)
    const [params, setParams] = useState<string[]>([]);
    const [pagination, setPagination] = useState<any>({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalDocs: 10,
    });
    const [filters, setFilters] = useState<ProductFilter>({
        title: "",
        author: "",
        category: ""
    });
    const [loading, setLoading] = useState(false);
    const getData = useCallback(async (filters: ProductFilter) => {
        setLoading(true)
        const json = await axios.post(API_PATHS.getProductList, filters);
        setTimeout(() => {
            setLoading(false)
        }, 500)
        dispatch(getProductList(json.data.data));
        setPagination({
            page: json.data.paginate.page,
            limit: json.data.paginate.limit,
            totalPages: json.data.paginate.totalPages,
            totalDocs: json.data.paginate.totalDocs,
        });
    }, [dispatch]);

    useEffect(() => {
        getData(filters)
    }, [getData, filters])

    const onFilters = useCallback((values: ProductFilter) => {
        setFilters((prev) => ({
            ...prev,
            ...values,
        }));
    }, []);

    const handleDelete = async () => {
        const json = await axios.post(API_PATHS.deleteUserList, { params });
        if (json.data.success) {
            toast.success("Delete user successfully !")
            getData(filters);
        }
    };

    return (
        <div id="ManageProductPage">
            {loading && <LinearProgress style={{ position: 'absolute', top: '8px', width: "95%", background: '#b18aff' }} />}
            <FilterProduct onFilters={onFilters} />
            <TableProduct
                productList={productList}
                params={params}
                setParams={setParams}
                filters={filters}
                setFilters={setFilters}
            />
            <PaginationComponent pagination={pagination} handleChange={onFilters} />
            <RemoveProduct params={params} handleDelete={handleDelete} />
        </div>
    );
}