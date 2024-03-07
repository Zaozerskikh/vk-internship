// the fields were chosen based on the initial UserCard component
// if needed its possible to add the remaining fields provided by api
export interface UserInfo {
  id: string;
  image: string,
  lastName: string,
  firstName: string,
  address: {
    city: string
  }
}