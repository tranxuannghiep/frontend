import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import "./Layout.scss";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_PATHS } from "configs/api";
import { getCategoryList } from "modules/redux/categoryReducer";
export interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const dispatch = useDispatch()
    const getCategory = useCallback(async () => {
        const res = await axios.get(API_PATHS.getCategoryList)
        if (res.status === 200) {
            dispatch(getCategoryList(res.data.data))
        }
    }, [dispatch])
    useEffect(() => {
        getCategory()
    }, [getCategory])
    return (
        <div id="HOCLayout">
            <Header />
            <div className="main">
                <div className="main-content">
                    <SideBar />
                    <div className="main-body">{children}</div>
                </div>
            </div>
        </div>
    );
}
