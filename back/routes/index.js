const combineRouters = require('koa-combine-routers');

const sse = require('./sse');
const chat = require('./chat');

const router = combineRouters(
  sse,
  chat,
);

module.exports = router;
