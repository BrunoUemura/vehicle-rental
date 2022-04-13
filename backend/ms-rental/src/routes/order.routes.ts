import { Router } from 'express';

import FindOrdersController from '@src/controller/FindOrdersController';
import CreateOrderController from '@src/controller/CreateOrderController';
import UpdateOrderController from '@src/controller/UpdateOrderController';
import DeleteOrderController from '@src/controller/DeleteOrderController';

const routes = Router();

routes.get('/order', new FindOrdersController().handle);
routes.post('/order', new CreateOrderController().handle);
routes.put('/order/:id', new UpdateOrderController().handle);
routes.delete('/order/:id', new DeleteOrderController().handle);

export default routes;
