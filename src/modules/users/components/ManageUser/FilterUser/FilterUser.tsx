import "./FilterUser.scss";
import { useForm } from "react-hook-form";
import { UserFilter } from "models/user";
import { InputField, SelectField } from "components/FormFields";
import { Button, Paper } from "@mui/material";
export interface FilterUserProps {
  onFilters: Function;
}
export default function FilterUser({ onFilters }: FilterUserProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });
  const handleFormSubmit = (values: UserFilter) => {
    if (onFilters) onFilters(values);
  };
  return (
    <div id="FilterUser">
      <h2 className="search-title">Search for users</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Paper elevation={3}>
          <div className="search-conditions-box">
            <ul className="search-conditions">
              <li className="substring-condition">
                <InputField name="name" control={control} placeholder="Search name" />
              </li>
              <li className="substring-condition">
                <InputField name="email" control={control} placeholder="Search email" />
              </li>
              <li className="inventory-condition">
                <SelectField
                  name="role"
                  control={control}
                  options={[
                    { value: "", label: "Any Role" },
                    { value: "admin", label: "Admin" },
                    { value: "guest", label: "Guest" },
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
