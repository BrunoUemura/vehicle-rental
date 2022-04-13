import logger from '@src/config/logger';
import RabbitmqServer from '@src/config/rabbitmq-server';

export class RabbitMQProducer {
  private broker = new RabbitmqServer(process.env.RABBITMQ_URL);

  async sendMessage(queue: string, message: any) {
    await this.broker.start();
    await this.broker.publishInQueue(queue, JSON.stringify(message));
    logger.info('[RabbitMQ]: Successfully produced message');
    console.log(message);
  }
}
