import { Router } from 'express';
import { decompositionRoutes } from './decomposition.router';

const router = Router();

router.use("/decomposition", decompositionRoutes);

export { router };
