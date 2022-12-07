import { Table } from "react-bootstrap";
import "./TableShip.scss";
import { Paper } from "@mui/material";
import TdTable from "./TdTable";
export interface TableShipProps {
  dataShip: any[];
  updateData: (id: string, status: string) => void
}

export default function TableShip({ dataShip, updateData }: TableShipProps) {

  return (
    <Paper elevation={3}>
      <div id="TableShip">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {dataShip.map((data, index) => <TdTable key={data._id} index={index} data={data} updateData={updateData} />)}
          </tbody>
        </Table>
      </div>
    </Paper>
  );
}
