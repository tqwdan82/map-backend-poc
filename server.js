const Koa = require('koa');
const router = require('koa-route');
const bodyParser = require('koa-bodyparser');
const WebSocket = require('koa-websocket');
const cors = require('koa-cors');

const sim = require("./simulator");

const app = WebSocket(new Koa());
// const router = new Router();
app.use(cors());

// REST API
router.get('/api/data', (ctx) => {
  ctx.body = { message: 'Hello from the REST API!' };
});

// WebSocket API
app.ws.use((ctx, next) => {
  // You can access the WebSocket connection through `ctx.websocket`
  console.log('WebSocket connection established');
  return next(ctx);
});

let timeoutId;
function startTimeout(duration, callback) {
    // Clear the previous timeout (if any)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  
    // Set a new timeout with the specified duration
    timeoutId = setTimeout(() => {
        console.log(`Timeout executed after ${duration} milliseconds`);

        const simData = sim();
        callback(simData);
        startTimeout(simData.incidentTTL, callback);
      
    }, duration);
}

// Using routes
app.ws.use(router.all('/ws', function (ctx) {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Connected');
    ctx.websocket.on('message', function(message) {
        // do something with the message from client
        console.log(message);
    });
    const sendCallbackFn = (input) => {
        ctx.websocket.send(JSON.stringify(input));
    };
    const data = sim();
    ctx.websocket.send(JSON.stringify(data));
    startTimeout(data.incidentTTL, sendCallbackFn);
}));

app.use(bodyParser());


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
