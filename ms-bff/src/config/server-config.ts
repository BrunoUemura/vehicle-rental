import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import proxy from '@src/app/create-proxy';
import errorHandler from '@src/util/error-handler';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(proxy);
app.use(errorHandler);

export default app;
