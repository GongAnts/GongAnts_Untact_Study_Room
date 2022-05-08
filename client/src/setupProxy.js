const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://3.34.139.191:4000/',
      changeOrigin: true
    })
  );
};