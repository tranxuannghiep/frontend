import { User } from "models/user";
import { Table } from "react-bootstrap";
import TdTable from "../TdTableUser/TdTableUser";
// import TdTable from "../TdTableUser/TdTableUser";
import "./TableUser.scss";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
export interface TableUserProps {
  userList: User[];
  setFilters: Function;
  setParams: Function;
  params: string[];
  filters: any;
}

export default function TableUser({
  userList,
  setFilters,
  setParams,
  params,
  filters,
}: TableUserProps) {

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
    <div id="TableUser">
      <Table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  userList.length === params.length && params.length !== 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setParams(userList.map((val) => val._id));
                  } else {
                    setParams([]);
                  }
                }}
              />
            </th>
            <th
              className="cursor-pointer" onClick={() => setSort("name")}
            >
              Name
              {getArrow("name")}
            </th>
            <th
              className="cursor-pointer" onClick={() => setSort("email")}
            >
              Email
              {getArrow("email")}
            </th>
            <th
              className="cursor-pointer" onClick={() => setSort("role")}
            >
              Role
              {getArrow("role")}
            </th>
            <th className="cursor-pointer" onClick={() => setSort("age")}
            >
              Age
              {getArrow("age")}
            </th>
            <th className="cursor-pointer" onClick={() => setSort("gender")}
            >
              Gender
              {getArrow("gender")}
            </th>
            <th className="cursor-pointer" onClick={() => setSort("createdAt")}
            >
              CreatedAt
              {getArrow("createdAt")}
            </th>

          </tr>
        </thead>
        <tbody>
          {userList.map(((user) =>
          (<TdTable
            params={params}
            setParams={setParams}
            key={user._id}
            user={user}
          />)))}
        </tbody>
      </Table>
    </div>
  );
}
