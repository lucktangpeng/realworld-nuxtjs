import request from "../request/index.js";

export const login = function(data) {
  return request({
    method: "post",
    url: "/api/users/login",
    data,
  });
};

export const register = function(data) {
  return request({
    method: "post",
    url: "/api/users",
    data,
  });
};
