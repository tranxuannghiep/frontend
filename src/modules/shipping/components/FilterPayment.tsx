import "./FilterPayment.scss";
import { useForm } from "react-hook-form";
import { SelectField } from "components/FormFields";
import { Button, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axiosClient from "helpers/axiosClient";
import { API_PATHS } from './../../../configs/api';
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
export interface FilterPaymentProps {
  onFilters: Function;
}
export default function FilterPayment({ onFilters }: FilterPaymentProps) {
  const { user } = useSelector((state: RootState) => state.authReducer)
  const role = user.role
  const [sellers, setSellers] = useState<any>([])
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: "",
      status: "",
    },
  });
  const handleFormSubmit = (values: any) => {
    if (onFilters) onFilters(values);
  };

  const getSellers = useCallback(async () => {
    const res = await axiosClient.get(API_PATHS.getSellers);
    setSellers(res.data.data.map((seller: any) => ({ value: seller._id, label: seller.name })))
  }, [])

  useEffect(() => {
    if (role === "admin") {
      getSellers()
    }
  }, [getSellers, role])

  return (
    <div id="FilterPayment">
      <h2 className="search-title">Search for ship</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Paper elevation={3}>
          <div className="search-conditions-box">
            <ul className="search-conditions">
              {role === "admin" &&
                <li className="inventory-condition">
                  <SelectField
                    name="id"
                    control={control}
                    options={[
                      { value: "", label: "All Seller" },
                      ...sellers,
                    ]}
                  />
                </li>
              }
              <li className="inventory-condition">
                <SelectField
                  name="status"
                  control={control}
                  options={[
                    { value: "", label: "All Status" },
                    { value: "success", label: "Success" },
                    { value: "transportation", label: "Transportation" },
                    { value: "cancel", label: "Cancel" },
                  ]}
                />
              </li>
              <li className="actions">
                <Button variant="contained" type="submit">
                  Search
                </Button>
              </li>
            </ul>
          </div>
        </Paper>
      </form>
    </div>
  );
}
