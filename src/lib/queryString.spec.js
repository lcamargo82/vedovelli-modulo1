import { queryString, parse } from './queryString';

//Agrupa casos de testes dentro de uma mesma test suite utilizando describe
describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Leandro',
      profession: 'developer',
    };

    //o toBe funciona quando voce tem algo muito exato, um inteiro

    expect(queryString(obj)).toBe('name=Leandro&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Leandro',
      abilities: ['JS', 'TDO'],
    };

    expect(queryString(obj)).toBe('name=Leandro&abilities=JS,TDO');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Leandro',
      abilities: {
        first: 'JS',
        second: 'TDO',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Leandro&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Leandro',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Leandro';

    expect(parse(qs)).toEqual({
      name: 'Leandro',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Leandro&abilities=JS,TDO';

    expect(parse(qs)).toEqual({
      name: 'Leandro',
      abilities: ['JS', 'TDO'],
    });
  });
});
