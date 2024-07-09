const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "https://sunjoo-sand.vercel.app",
      pathRewrite: { "^/auth" : "" },
      changeOrigin: true,
      secure: true,
    })
  );

  app.use(
    "/analyze",
    createProxyMiddleware({
      target: "https://sunjoo-sand.vercel.app",
      pathRewrite: { "^/analyze" : "" },
      changeOrigin: true,
      secure: true,
    })
  );

  app.use(
    "/drinks",
    createProxyMiddleware({
      target: "https://sunjoo-sand.vercel.app",
      pathRewrite: { "^/drinks" : "" },
      changeOrigin: true,
      secure: true,
    })
  );

};
