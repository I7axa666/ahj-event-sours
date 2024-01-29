const Router = require('koa-router');
const chatChistory = require('../../db/db');

const router = new Router();

router.post('/chat', ((ctx) => {
  // console.log(ctx.body);

  const { conectionID, chatName } = ctx.request.body;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  chatChistory.addUser(conectionID, chatName);
  ctx.body = chatChistory.users;
}));

router.get('/', ((ctx) => {
  ctx.body = JSON.stringify(chatChistory.users);
}));

module.exports = router;
