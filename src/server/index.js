import express from 'express';
import handleRender from './handleRender';

const port = 8000;
const server = express();

server.use(express.static('public'));
server.get('/*', handleRender);

server.listen(port, () => {
  console.info(`Express listening on port ${port}`);
});
