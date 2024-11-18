import { BASE_API_URL } from "@/contanst";
import { mapperStateToPagiation, mapperStateToSortBy } from "@/utils";
import { mapperStateToFilter } from "@/utils/state-to-filter";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import axios from "./axios.service";
type IPayload = {
  sorting: SortingState | undefined;
  pagination: {
    limit: number;
    skip: number;
  };
  filter: ColumnFiltersState;
};
export class UserService {
  static getListUser(payload: IPayload) {
    const sorting = mapperStateToSortBy(payload?.sorting);
    const pagination = mapperStateToPagiation(payload?.pagination);
    // const query = mapperStateToFilter(payload?.filter);


    return axios
      .get("users", {
        params: {
          ...sorting,
          ...pagination
        },
      })
      .then((res) => Promise.resolve(res.data));
  }
}
