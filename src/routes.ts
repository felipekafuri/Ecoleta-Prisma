import express from 'express';

import PointsController from './controllers/PointsController';

const routes = express.Router();
const pointsController = new PointsController();

routes.post('/points', pointsController.create);

export default routes;
