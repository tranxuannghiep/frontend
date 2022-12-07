import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { formatPrice } from "utils";

export interface TdTableProps {
  data: any;
  index: number;
  updateData: (id: string, status: string) => void
}


export default function TdTable({ data, index, updateData }: TdTableProps) {
  const [status, setStatus] = useState(data.status)
  const handleChange = (e: SelectChangeEvent<any>) => {
    setStatus(e.target.value)
    updateData(data._id, e.target.value)
  }
  return (
    <tr >
      <td>{index}</td>
      <td>{data.name}</td>
      <td>{data.phone}</td>
      <td style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 200 }}>{data.address}</td>
      <td style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 200 }}>{data.product.title}</td>
      <td>{data.product.quantity}</td>
      <td>{formatPrice(data.product.price)}</td>
      <td>{data.purchaseDate}</td>
      <td>{data.deliveryDate || "--"}</td>
      <td>
        <Select value={status} size="small" onChange={(e) => handleChange(e)}>
          <MenuItem value={"success"}>Success</MenuItem>
          <MenuItem value={"transportation"}>Transportation</MenuItem>
          <MenuItem value={"cancel"}>Cancel</MenuItem>
        </Select>
      </td>
    </tr>
  );
}
