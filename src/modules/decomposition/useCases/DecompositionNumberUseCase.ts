import {
  getDividers,
  getPrimeDivisors,
} from '@shared/container/providers/DividerProvider';
import { getRedis } from '@shared/container/providers/RedisProvider';

import { IDescompositionNumberDTO } from '../dtos/IDescompositionNumberDTO';

class DecompositionNumberUseCase {
  async execute({ number }: IDescompositionNumberDTO): Promise<any> {
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
