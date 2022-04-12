import logger from '@src/config/logger';
import RabbitmqServer from '@src/config/rabbitmq-server';
import { RabbitMQService } from '@src/service/RabbitMQService';

export async function rabbitmqConsumer() {
  console.log('BROKER URL', process.env.RABBITMQ_URL);
  console.log('BROKER URL TYPE', typeof process.env.RABBITMQ_URL);

  const broker = new RabbitmqServer(process.env.RABBITMQ_URL);
  const rabbitMQService = new RabbitMQService();
  const queues = JSON.parse(process.env.RABBITMQ_QUEUES);

  await broker.start();

  queues.forEach(async (queue: string) => {
    await broker.consume(queue, async message => {
      logger.info(`[RabbitMQ]: Successfully consumed message`);
      const object = JSON.parse(message.content.toString());
      console.log(object);

      if (queue === 'customer') {
        await rabbitMQService.handleCustomerEvent(object);
      }

      if (queue === 'vehicle') {
        await rabbitMQService.handleVehicleEvent(object);
      }
    });
  });
}
