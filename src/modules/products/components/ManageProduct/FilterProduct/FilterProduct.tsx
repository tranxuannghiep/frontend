import "./FilterProduct.scss";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "components/FormFields";
import { Button, Paper } from "@mui/material";
import { ProductFilter } from "models/product";
import { useSelector } from "react-redux";
import { RootState } from 'redux/reducer';
export interface FilterProductProps {
  onFilters: Function;
}
export default function FilterProduct({ onFilters }: FilterProductProps) {
  const { categoryList } = useSelector((state: RootState) => state.categoryReducer)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      author: "",
      category: "",
    },
  });
  const handleFormSubmit = (values: ProductFilter) => {
    if (onFilters) onFilters(values);
  };
  return (
    <div id="FilterProduct">
      <h2 className="search-title">Search for users</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Paper elevation={3}>
          <div className="search-conditions-box">
            <ul className="search-conditions">
              <li className="substring-condition">
                <InputField name="title" control={control} placeholder="Search title" />
              </li>
              <li className="substring-condition">
                <InputField name="author" control={control} placeholder="Search author" />
              </li>
              <li className="inventory-condition">
                <SelectField
                  name="category"
                  control={control}
                  options={[
                    { value: "", label: "All Category" },
                    ...categoryList.map(val => ({ value: val._id, label: val.name }))
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
