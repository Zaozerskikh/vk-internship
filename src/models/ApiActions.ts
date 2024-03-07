import {ApiResponse} from "../types/ApiResponse.ts";
import {UserInfo} from "../types/UserInfo.ts";
import {API_ENDPOINT} from "../env/EnviromentVariablesResolver.tsx";

export const fetchUsers = (searchQuery: string, limit: number): Promise<UserInfo[]> => {
  // query optimization - only necessary fields are fetched
  const targetFields = 'id,image,lastName,firstName,address'

  // For the optimization purposes, pagination could be implemented, but judging by the documentation
  // [https://dummyjson.com/docs], server supports only formally.
  // It's possible to fetch only selected amount of entities, not all of them,
  // but a next page token for further loading cannot be obtained from the server in any form.

  return fetch(`${API_ENDPOINT}?q=${searchQuery}&select=${targetFields}&limit=${limit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response?.statusText);
      }
      return response.json();
    })
    .then(data => (data as ApiResponse).users)
};