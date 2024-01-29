const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');
const { v4 } = require('uuid');
const chatChistory = require('../../db/db');

const router = new Router();

router.get('/sse', async (ctx) => {
  const conectionID = v4();

  streamEvents(ctx.req, ctx.res, {
    // async fetch(lastEventId) {
    //   // console.log(lastEventId);
    //   return [];
    // },

    async stream(sse) {
      sse.sendEvent({
        data: JSON.stringify({
          conectionID,
        }),
      });

      chatChistory.listen((item) => {
        sse.sendEvent({
          id: v4(),
          data: JSON.stringify({
            item,
          }),
        });
      });

      return () => {};
    },
  });

  ctx.req.on('close', () => chatChistory.deleteUser(conectionID));

  ctx.respond = false;
});

module.exports = router;
