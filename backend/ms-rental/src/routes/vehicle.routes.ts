import { Router } from 'express';

import FindVehiclesController from '@src/controller/FindVehiclesController';

const routes = Router();

routes.get('/vehicle', new FindVehiclesController().handle);

export default routes;
