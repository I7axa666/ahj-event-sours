const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const http = require('http');
const WS = require('ws');

const router = require('./routes');

const app = new Koa();

app.use(cors());
app.use(koaBody({
  urlencoded: true,
}));
app.use(router());

const port = process.env.PORT || 3000;
const server = http.createServer(app.callback());

const wsServer = new WS.Server({
  server,
});

// const chat = [{
//   conectionId: '1',
//   message: 'chat start'
// }]

const chat = [];

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    const chatInfo = JSON.parse(message.toString());
    chat.push(chatInfo);

    const eventData = JSON.stringify({ chat });

    Array.from(wsServer.clients)
      .filter((client) => client.readyState === WS.OPEN)
      .forEach((client) => client.send(eventData));

    // console.log(JSON.parse(message.toString()))
  });

  ws.send(JSON.stringify({ chat }));
});

server.listen(port, () => {
  console.log(`myServer is running on http://localhost:${port}`);
});
