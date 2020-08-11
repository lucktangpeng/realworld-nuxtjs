import { request } from "../plugins/request.js";

export const getProfiles = function(username) {
  return request({
    method: "get",
    url: `api/profiles/${username}`,
  });
};

export const addFollow = function(username) {
  return request({
    method: "post",
    url: `/api/profiles/${username}/follow`,
  });
};

export const deleteFollow = function(username) {
  return request({
    method: "delete",
    url: `/api/profiles/${username}/follow`,
  });
};
