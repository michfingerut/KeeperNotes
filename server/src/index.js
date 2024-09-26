//run files
import './dotenv.config.js';
import './db/index.js';

//external modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//internal modules
import logger from './logger.js';
import router from './routes.js';
import { handlerMissedRoutes, errorHandler } from './utils/index.js';

const serverPort = process.env.SERVER_PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Keeper notes!');
});

app.use(express.static(join(__dirname, 'build')));

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.all('*', handlerMissedRoutes);
app.use((err, req, res, next) => {
  errorHandler(err, res);
});

app.listen(serverPort, () => {
  logger.info(`server is running on port ${serverPort}`);
});
