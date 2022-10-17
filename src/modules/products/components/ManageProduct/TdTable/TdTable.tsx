import { ROUTES } from "configs/routes";
import { Product } from "models/product";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils";

export interface TdTableProps {
  product: Product;
  params: string[];
  setParams: Function;
}

const checkItemRemove = (params: string[], product: Product) => {
  return params.findIndex((val) => val === product._id) !== -1;
};

export default function TdTable({ product, params, setParams }: TdTableProps) {
  const navigate = useNavigate()
  return (
    <tr className={checkItemRemove(params, product) ? "item-remove" : ""}>
      <td className="w-60">
        <div className="dash-right">
          <input
            type="checkbox"
            checked={params.includes(product._id as string)}
            onChange={(e) => {
              if (!checkItemRemove(params, product)) {
                setParams([...params, product._id]);
              } else {
                setParams(params.filter((val) => val !== product._id));
              }
            }}
          />
        </div>
      </td>
      <td className="link" onClick={() => navigate(`${ROUTES.productList}/${product._id}`)}>{product.title}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        {product.author.name}
      </td>
      <td>
        {product.category.name}
      </td>
      <td >{formatDate(product.createdAt as Date)}</td>
      <td className="w-60">
        <div className="dash-left">
          <div className="delete"
            onClick={(e) => {
              if (!checkItemRemove(params, product)) {
                setParams([...params, product._id]);
              } else {
                setParams(params.filter((val) => val !== product._id));
              }
            }}
          >
            <MdDelete />
          </div>
        </div>
      </td>
    </tr>
  );
}
