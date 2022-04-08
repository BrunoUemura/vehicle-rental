import { Connection, Channel, connect, Message } from 'amqplib';
import logger from '@src/config/logger';
import BrokerConnectionError from '@src/util/error/BrokerConnectionError';

export default class RabbitmqServer {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    try {
      this.conn = await connect(this.uri);
      this.channel = await this.conn.createChannel();
      logger.info('RabbitMQ: OK');
    } catch (error) {
      logger.error('RabbitMQ: Error connecting to Broker');
      throw new BrokerConnectionError();
    }
  }

  async publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(queue: string, callback: (message: Message) => void) {
    return this.channel.consume(queue, message => {
      callback(message);
      this.channel.ack(message);
    });
  }
}