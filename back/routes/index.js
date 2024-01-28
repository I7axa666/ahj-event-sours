const combineRouters = require('koa-combine-routers');

const sse = require('./sse');
const chat = require('./chat');
const ws = require('./ws');

const router = combineRouters(
    sse,
    chat,
    // ws,
);

module.exports = router;