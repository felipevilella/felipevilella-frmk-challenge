import { AppError } from '@shared/errors/AppError';

import { IDescompositionNumberDTO } from '../dtos/IDescompositionNumberDTO';
import { DecompositionNumberUseCase } from './DecompositionNumberUseCase';

let decompositionNumberUseCase: DecompositionNumberUseCase;

describe('Decomposition number', () => {
  decompositionNumberUseCase = new DecompositionNumberUseCase();

  it('should be able to return divisor numbers and prime divisors', async () => {
    const decomposition: IDescompositionNumberDTO = {
      number: 45,
    };

    const result = await decompositionNumberUseCase.execute(decomposition);

    expect(result).toEqual({
      entryNumber: 45,
      dividingNumbers: [1, 3, 5, 9, 15, 45],
      primeDivisors: [1, 2, 3, 5],
    });
  });

  it('should be not able to return divisor numbers of a number negative', () => {
    expect(async () => {
      const decomposition: IDescompositionNumberDTO = {
        number: -1,
      };

      await decompositionNumberUseCase.execute(decomposition);
    }).rejects.toBeInstanceOf(AppError);
  });
});
