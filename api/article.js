import { request } from "../plugins/request.js";

export const getArticles = function(params) {
  return request({
    method: "get",
    url: "/api/articles",
    params,
  });
};

export const getTags = function(params) {
  return request({
    method: "get",
    url: "/api/tags",
    params,
  });
};

export const getArticlesFeed = function(params) {
  return request({
    method: "get",
    url: "/api/articles/feed",
    params,
  });
};

export const getArticle = function(slug) {
  return request({
    method: "get",
    url: `/api/articles/${slug}`,
  });
};
// /api/articles/:slug/comments

export const getComments = function(slug) {
  return request({
    method: "get",
    url: `/api/articles/${slug}/comments`,
  });
};

export const addComments = function(slug, data) {
  return request({
    method: "post",
    url: `/api/articles/${slug}/comments`,
    data,
  });
};

export const addFavorite = function(slug) {
  return request({
    method: "post",
    url: `/api/articles/${slug}/favorite`,
  });
};

export const deleteFavorite = function(slug) {
  return request({
    method: "delete",
    url: `/api/articles/${slug}/favorite`,
  });
};

export const addArticle = function(data) {
  return request({
    method: "post",
    url: `/api/articles`,
    data,
  });
};

export const updateArticle = function(slug, data) {
  return request({
    method: "put",
    url: `/api/articles/${slug}`,
    data,
  });
};
// /api/articles/:slug

export const deleteArticle = function(slug) {
  return request({
    method: "delete",
    url: `/api/articles/${slug}`,
  });
};
