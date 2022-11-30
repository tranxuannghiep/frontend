import { LinearProgress } from '@mui/material';
import { API_PATHS } from 'configs/api';
import axiosClient from 'helpers/axiosClient';
import { UserFilter } from 'models/user';
import PaginationComponent from 'modules/common/PaginationComponent/PaginationComponent';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'redux/reducer';
import FilterUser from '../components/ManageUser/FilterUser/FilterUser';
import RemoveUser from '../components/ManageUser/RemoveUser/RemoveUser';
import TableUser from '../components/ManageUser/TableUser/TableUser';
import { getUserList } from '../redux/mangeUserReducer';
import "./ManageUserPage.scss";
export interface ManageUserPageProps {
}

export default function ManageUserPage(props: ManageUserPageProps) {

    const dispatch = useDispatch<ThunkDispatch<RootState, null, Action<string>>>()
    const { userList } = useSelector((state: RootState) => state.mangeUserReducer)
    const [params, setParams] = useState<string[]>([]);
    const [pagination, setPagination] = useState<any>({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalDocs: 10,
    });
    const [filters, setFilters] = useState<UserFilter>({
        name: "",
        email: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const getData = useCallback(async (filters: UserFilter) => {
        setLoading(true)
        const json = await axiosClient.post(API_PATHS.getUserList, filters);
        setTimeout(() => {
            setLoading(false)
        }, 500)
        dispatch(getUserList(json.data.data));
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

    const onFilters = useCallback((values: UserFilter) => {
        setFilters((prev) => ({
            ...prev,
            ...values,
        }));
    }, []);

    const handleDelete = async () => {
        const json = await axiosClient.post(API_PATHS.deleteUserList, { params });
        if (json.data.success) {
            toast.success("Delete user successfully !")
            getData(filters);
        }
    };

    return (
        <div id="ManageUserPage">
            {loading && <LinearProgress style={{ position: 'absolute', top: '8px', width: "95%", background: '#b18aff' }} />}
            <FilterUser onFilters={onFilters} />
            <TableUser
                userList={userList}
                params={params}
                setParams={setParams}
                filters={filters}
                setFilters={setFilters}
            />
            <PaginationComponent pagination={pagination} handleChange={onFilters} />
            <RemoveUser params={params} handleDelete={handleDelete} />
        </div>
    );
}
