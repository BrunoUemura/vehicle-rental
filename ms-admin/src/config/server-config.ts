import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { rabbitmqConsumer } from '@src/util/rabbitmq-consumer';
import routes from '@src/routes';
import errorHandler from '@src/util/error-handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// rabbitmqConsumer();
app.use(routes);
app.use(errorHandler);

export default app;
