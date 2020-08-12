export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(0);
      routes.push(
        ...[
          {
            path: "/",
            component: resolve(__dirname, "pages/layout/"),
            children: [
              {
                path: "",
                name: "home",
                component: resolve(__dirname, "pages/home/"),
              },
              {
                path: "/login",
                name: "login",
                component: resolve(__dirname, "pages/login/"),
              },
              {
                path: "/register",
                name: "register",
                component: resolve(__dirname, "pages/login/"),
              },
              {
                path: "/settings",
                name: "settings",
                component: resolve(__dirname, "pages/settings/"),
              },
              {
                path: "/profile/:username",
                name: "profile",
                component: resolve(__dirname, "pages/profile/"),
              },
              {
                path: "/article/:slug",
                name: "article",
                component: resolve(__dirname, "pages/article/"),
              },
              {
                path: "/editor/",
                name: "create",
                component: resolve(__dirname, "pages/editor/"),
              },
              {
                path: "/editor/",
                name: "update",
                component: resolve(__dirname, "pages/editor/"),
              },
            ],
          },
        ]
      );
    },
  },
  plugins: ["~/plugins/request.js", "~/plugins/dayjs.js"],
  cssSourceMap: true,
};
