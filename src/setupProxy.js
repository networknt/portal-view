const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

module.exports = function(app) {
  var corsOptions = {
    origin: 'https://devsignin.lightapi.net',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
  app.use(createProxyMiddleware('/portal/command', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/portal/query', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/oauth2/client', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/oauth2/code', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/oauth2/key', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/oauth2/refresh_token', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/oauth2/service', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/oauth2/token', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/oauth2/user', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/r/data', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/authorization', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/logout', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/config-server', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/services', { target: 'https://local.lightapi.net', secure: false }));
  app.use(createProxyMiddleware('/schedulers', { target: 'https://local.lightapi.net', secure: false }));
};
