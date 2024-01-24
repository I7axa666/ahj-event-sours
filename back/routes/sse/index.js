const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');
const chatChistory = require('../../db/db');
const { v4 } = require('uuid');
 

const router = new Router();

router.get('/sse', async (ctx) => {
    streamEvents(ctx.req, ctx.res, {
        async fetch(lastEventId) {
            console.log(lastEventId);

            return [];
        },

        async stream(sse) {
            chatChistory.listen((item) => {
                sse.sendEvent({
                    data: JSON.stringify(item)
                });
            });


            return () => {};
        }
    })
    
    ctx.respond = false;
});

module.exports = router;