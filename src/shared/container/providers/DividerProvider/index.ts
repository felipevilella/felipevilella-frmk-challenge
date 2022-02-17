import { stringify } from 'uuid';

import { setRedis } from '../RedisProvider';
import { IDividerProviderDTO } from './dtos/IDividerProviderDTO';

async function getDividers({ number }: IDividerProviderDTO): Promise<any> {
  const listNumbers = [];
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      listNumbers.push(i);
    }
  }

  setRedis(`${number.toString()}-dividerNumbers`, JSON.stringify(listNumbers));

  return listNumbers;
}

async function getPrimeDivisors({
  number,
  numbersPrime,
  divider,
}: IDividerProviderDTO): Promise<any> {
  if (!numbersPrime) {
    numbersPrime = [1];
  }

  if (!divider) {
    divider = 2;
  }

  if (number % divider === 0) {
    number /= divider;

    if (
      numbersPrime.filter(numerPrime => numerPrime === divider).length === 0
    ) {
      numbersPrime.push(divider);
    }
  } else {
    divider += 1;
  }

  if (number > 1) {
    await getPrimeDivisors({ number, numbersPrime, divider });
  }

  setRedis(
    `${number.toString()}-primersDivisors`,
    JSON.stringify(numbersPrime),
  );

  return numbersPrime;
}

export { getDividers, getPrimeDivisors };
