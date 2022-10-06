import { Paper } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./PaginationComponent.scss";
export interface PaginationComponentProps {
  pagination: any;
  handleChange: Function;
}

export default function PaginationComponent({
  pagination,
  handleChange,
}: PaginationComponentProps) {
  const handleChangePage = (value: any) => {
    if (handleChange) {
      handleChange({ page: value.selected + 1 });
    }
  };
  return (
    <Paper elevation={3}>
      <div id="PaginationComponent" className="d-flex align-items-center">
        <ReactPaginate
          previousLabel="«"
          nextLabel="»"
          breakLabel="..."
          pageCount={pagination.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          containerClassName="pagination mb-0 me-4"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          onPageChange={handleChangePage}
          forcePage={pagination.page - 1}
        />
        <div className="page-limit d-flex">
          <p className="mb-0">
            <strong>{pagination.totalDocs}</strong> items
          </p>
          <select
            value={pagination.limit}
            className="ms-2 me-2"
            onChange={(e) => {
              if (handleChange) {
                handleChange({ page: 1, limit: Number(e.target.value) });
              }
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          <p className="mb-0">per page</p>
        </div>
      </div>
    </Paper>
  );
}
