const http= require('http');
const app= require('./app');
const config= require('./configs/default');

const port = config.port;
const server= http.createServer(app);
server.listen(port);

console.log("Server running on localhost");
