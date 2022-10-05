import { User } from "models/user";
import { MdDelete } from "react-icons/md";
import { capitalizeString, formatDate } from "utils";

export interface TdTableProps {
  user: User;
  params: string[];
  setParams: Function;
}

const checkItemRemove = (params: string[], user: User) => {
  return params.findIndex((val) => val === user._id) !== -1;
};

export default function TdTable({ user, params, setParams }: TdTableProps) {

  return (
    <tr className={checkItemRemove(params, user) ? "item-remove" : ""}>
      <td className="w-60">
        <div className="dash-right">
          <input
            type="checkbox"
            checked={params.includes(user._id)}
            onChange={(e) => {
              if (!checkItemRemove(params, user)) {
                setParams([...params, user._id]);
              } else {
                setParams(params.filter((val) => val !== user._id));
              }
            }}
          />
        </div>
      </td>
      <td className="link">{user.name}</td>
      <td>{user.email}</td>
      <td>{capitalizeString(user.role)}</td>
      <td
        className="link"
      >
        {user.age}
      </td>
      <td className="link">{capitalizeString(user.gender)}</td>
      <td className="link">{formatDate(user.createdAt)}</td>
      <td className="w-60">
        <div className="dash-left">
          <div className="delete"
            onClick={(e) => {
              if (!checkItemRemove(params, user)) {
                setParams([...params, user._id]);
              } else {
                setParams(params.filter((val) => val !== user._id));
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
