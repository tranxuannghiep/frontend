import { Box, Button, LinearProgress } from "@mui/material";
import axios from "axios";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import { User } from "models/user";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailUserForm } from "../components/DetailUser/DetailUserForm";
import "./DetailUserPage.scss";

export interface DetailUserPageProps {
}

export default function DetailUserPage(props: DetailUserPageProps) {
    const [initialValues, setInitialValues] = useState<User | null>(null)
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate()

    const getUserDetailById = useCallback(
        async (id: string) => {
            try {
                setLoading(true);
                const json = await axios.get(`${API_PATHS.getUserById}/${id}`)
                setInitialValues(json.data.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }

        },
        []
    );

    useEffect(() => {
        getUserDetailById(userId as string)
    }, [getUserDetailById, userId])


    const handleUserFormSubmit = async (user: User) => {
        await axios.patch(`${API_PATHS.updateUserById}/${user._id}`, user)
        navigate(ROUTES.userList)
    }
    return (
        <div id="DetailUserPage">
            {loading && <LinearProgress style={{ position: 'absolute', top: '8px', width: "95%", background: '#b18aff' }} />}
            <Box mb={2}>
                <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
            </Box>
            <h4 className="title">{initialValues?.name}</h4>
            <Box mt={4}>
                {initialValues &&
                    <DetailUserForm initialValues={initialValues} onSubmit={handleUserFormSubmit} />
                }
            </Box>
        </div>
    );
}
