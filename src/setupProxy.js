const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://13.124.194.48:9000",
      pathRewrite: { "^/auth" : "" },
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    "/analyze",
    createProxyMiddleware({
      target: "http://13.124.194.48:9000",
      pathRewrite: { "^/analyze" : "" },
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    "/drinks",
    createProxyMiddleware({
      target: "http://13.124.194.48:9000",
      pathRewrite: { "^/drinks" : "" },
      changeOrigin: true,
      secure: false,
    })
  );

  // app.use(
  //   "/member",
  //   createProxyMiddleware({
  //     target: "http://141.164.49.27",
  //     changeOrigin: true,
  //     secure: false,
  //   })
  // );
};

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware("/api", {
//       target: "http://141.164.49.27",
//       // target: "http://localhost:8080", // 서버 URL
//       pathRewrite: { "^/api": "" },
//       changeOrigin: true,
//       secure: false,
//       headers: {
//         Host: "141.164.49.27", // 추가된 부분
//         "Access-Control-Allow-Origin": "*", // 모든 도메인을 허용하도록 설정합니다.
//       },
//     })
//   );

//   app.use(
//     createProxyMiddleware("/auth/login", {
//       target: "http://141.164.49.27",
//       changeOrigin: true,
//       secure: false,
//       headers: {
//         Host: "141.164.49.27",
//         "Access-Control-Allow-Origin": "*", // 모든 도메인을 허용하도록 설정합니다.
//       },
//     })
//   );
// };
