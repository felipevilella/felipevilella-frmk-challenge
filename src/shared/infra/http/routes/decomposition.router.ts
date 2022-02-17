import { DecompositionNumberController } from '@modules/decomposition/useCases/DecompositionNumberController';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

const decompositionRoutes = Router();
const decompositionNumberController = new DecompositionNumberController();

decompositionRoutes.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      number: Joi.number().required()
    }),
  }),
  decompositionNumberController.handle,
);

export { decompositionRoutes };
