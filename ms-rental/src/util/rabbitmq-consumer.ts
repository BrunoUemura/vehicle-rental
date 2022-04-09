import logger from '@src/config/logger';
import RabbitmqServer from '@src/config/rabbitmq-server';
import { RabbitMQService } from '@src/service/RabbitmqService';

export async function rabbitmqConsumer() {
  const broker = new RabbitmqServer(process.env.RABBITMQ_URL);
  const rabbitMQService = new RabbitMQService();
  const queue = process.env.RABBITMQ_QUEUE;

  await broker.start();
  await broker.consume(queue, async message => {
    logger.info(`[RabbitMQ]: Successfully consumed message`);
    const object = JSON.parse(message.content.toString());
    await rabbitMQService.handleEvent(object);
  });
}
