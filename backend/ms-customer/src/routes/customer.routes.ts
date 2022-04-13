import { Router } from 'express';

import FindCustomerController from '@src/controller/FindCustomerController';
import CreateCustomerController from '@src/controller/CreateCustomerController';
import UpdateCustomerController from '@src/controller/UpdateCustomerController';
import DeleteCustomerController from '@src/controller/DeleteCustomerController';

import SignInCustomerController from '@src/controller/SignInCustomerController';

const routes = Router();

routes.get('/customer/:id', new FindCustomerController().handle);
routes.post('/customer', new CreateCustomerController().handle);
routes.put('/customer/:id', new UpdateCustomerController().handle);
routes.delete('/customer/:id', new DeleteCustomerController().handle);

routes.post('/customer/signin', new SignInCustomerController().handle);

export default routes;
