import {
  getDividers,
  getPrimeDivisors,
} from '@shared/container/providers/DividerProvider';
import { getRedis } from '@shared/container/providers/RedisProvider';
import { AppError } from '@shared/errors/AppError';

import { IDescompositionNumberDTO } from '../dtos/IDescompositionNumberDTO';

class DecompositionNumberUseCase {
  async execute({ number }: IDescompositionNumberDTO): Promise<any> {
    if (number < 1) {
      throw new AppError('Number cannot be negative', 400);
    }

    let primersDivisors = await getRedis(
      `${number.toString()}-primersDivisors`,
    );
    let dividerNumbers = await getRedis(`${number.toString()}-dividerNumbers`);

    if (primersDivisors !== null) {
      primersDivisors = JSON.parse(primersDivisors);
    } else {
      primersDivisors = await getPrimeDivisors({ number });
    }

    if (dividerNumbers !== null) {
      dividerNumbers = JSON.parse(dividerNumbers);
    } else {
      dividerNumbers = await getDividers({ number });
    }

    const data = {
      entryNumber: number,
      dividingNumbers: dividerNumbers,
      primeDivisors: primersDivisors,
    };

    return data;
  }
}

export { DecompositionNumberUseCase };
