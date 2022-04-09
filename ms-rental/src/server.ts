import 'dotenv/config';
import './config/module-alias';
import server from '@src/config/server-config';
import logger from '@src/config/logger';

const PORT = process.env.PORT || 5002;

server.listen(PORT, () => {
  logger.info(`Order API running on port ${PORT}`);
});
