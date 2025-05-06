function fetchUserDetailsWithAxios() {
  const userId = localStorage.getItem('uId')
    ? localStorage.getItem('uId')
    : null;
  return axios.get(
    `../api/task/fetchUserDetails/${userId}`,
  );
}
function fetchUserDetailsAndTransactionInfosWithAxios() {
  const userId = localStorage.getItem('uId')
    ? localStorage.getItem('uId')
    : null;
  return axios.get(
    `../api/task/fetchUserDetailsWithTransInfo/${userId}`,
  );
}
