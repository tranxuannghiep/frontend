import { Paper } from "@mui/material";
import { Product } from "models/product";
import { Table } from "react-bootstrap";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import TdTable from "../TdTable/TdTable";
import "./TableProduct.scss";
export interface TableProductProps {
  productList: Product[];
  setFilters: Function;
  setParams: Function;
  params: string[];
  filters: any;
}

export default function TableProduct({
  productList,
  setFilters,
  setParams,
  params,
  filters,
}: TableProductProps) {

  const setSort = (value: string) => {
    return setFilters((prev: any) => ({
      ...prev,
      sortBy: value,
      orderBy: prev.orderBy ? (prev.orderBy === "asc" ? "desc" : "asc") : "asc",
    }));
  };
  const getArrow = (value: string) => {
    return filters.sortBy === value ? (
      filters.orderBy === "desc" ? (
        <IoIosArrowRoundDown fontSize="20px" />
      ) : (
        <IoIosArrowRoundUp fontSize="20px" />
      )
    ) : (
      true
    );
  };

  return (
    <Paper elevation={3}>
      <div id="TableProduct">
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    productList.length === params.length && params.length !== 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setParams(productList.map((val) => val._id));
                    } else {
                      setParams([]);
                    }
                  }}
                />
              </th>
              <th
                className="cursor-pointer" onClick={() => setSort("title")}
              >
                Title
                {getArrow("title")}
              </th>
              <th
                className="cursor-pointer" onClick={() => setSort("description")}
              >
                Description
                {getArrow("description")}
              </th>
              <th
                className="cursor-pointer" onClick={() => setSort("price")}
              >
                Price
                {getArrow("price")}
              </th>
              <th>
                Author
              </th>
              <th>
                Category
              </th>
              <th className="cursor-pointer" onClick={() => setSort("createdAt")}
              >
                CreatedAt
                {getArrow("createdAt")}
              </th>

            </tr>
          </thead>
          <tbody>
            {productList.map(((product) =>
            (<TdTable
              params={params}
              setParams={setParams}
              key={product._id}
              product={product}
            />)))}
          </tbody>
        </Table>
      </div>
    </Paper>
  );
}
