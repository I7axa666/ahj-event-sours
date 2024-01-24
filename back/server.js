const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const WS = require('ws');
const http = require('http');

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
  server
});

const chat = ['Чат запустился))'];

wsServer.on('connection', (ws) => {

  ws.on('message', (data) => {
    const message = data.toString();

    chat.push(message);

    const eventData = JSON.stringify({ chat: [message] })

    Array.from(wsServer.clients)
    .filter(client => client.readyState === WS.OPEN)
    .forEach(client => client.send(eventData));

  });

  ws.send(JSON.stringify({ chat }));
})

server.listen(port, () => {
  console.log(`myServer is running on http://localhost:${port}`);
});
