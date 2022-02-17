import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DecompositionNumberUseCase } from './DecompositionNumberUseCase';

class DecompositionNumberController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { number } = request.body;

    const decompositionNumberUseCase = container.resolve(
      DecompositionNumberUseCase,
    );

    const decomposition = await decompositionNumberUseCase.execute({ number });

    return response.send(decomposition);
  }
}

export { DecompositionNumberController };
