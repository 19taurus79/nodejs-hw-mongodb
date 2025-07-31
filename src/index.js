import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoConnection.js';
// setupServer();
const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
