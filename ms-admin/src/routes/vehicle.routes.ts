import { Router } from 'express';

import FindVehicleController from '@src/controller/FindVehicleController';
import CreateVehicleController from '@src/controller/CreateVehicleController';
import UpdateVehicleController from '@src/controller/UpdateVehicleController';
import DeleteVehicleController from '@src/controller/DeleteVehicleController';

const routes = Router();

routes.get('/vehicle', new FindVehicleController().handle);
routes.post('/vehicle', new CreateVehicleController().handle);
routes.put('/vehicle/:id', new UpdateVehicleController().handle);
routes.delete('/vehicle/:id', new DeleteVehicleController().handle);

export default routes;
