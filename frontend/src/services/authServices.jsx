import API from "./api";

export const login = async (payLoad) => {
  const res = await API.post("/users/login", payLoad);
  return { status: res.status, data: res.data };
};

export const register = async (payLoad) => {
  const res = await API.post("/users/register", payLoad);
  return res;
};
