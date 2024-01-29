// const Router = require('koa-router');
// const server = require('server');

// const router = new Router();

// const wsServer = new WS.Server({
//     server
// });

// const chat = ['Чат запустился))'];

// router.get('/sse', async (ctx) => {

//     wsServer.on('connection', (ws) => {

//         ws.on('message', (data) => {
//         const message = data.toString();

//         chat.push(message);

//         const eventData = JSON.stringify({ chat: [message] })

//         Array.from(wsServer.clients)
//         .filter(client => client.readyState === WS.OPEN)
//         .forEach(client => client.send(eventData));

//         });

//         ws.send(JSON.stringify({ chat }));
//     })
// });
