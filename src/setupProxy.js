const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ['/api', '/graphql'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    ['/graphql'],
    createProxyMiddleware({
      target: 'ws://localhost:5000',
      changeOrigin: true,
    })
  )
};
