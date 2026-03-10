import { camelCase, snakeCase } from 'change-case/keys';

const DEEP_LEVEL = Number.POSITIVE_INFINITY;

export const toSnakeCaseDeep = <T>(value: T): T => {
  return snakeCase(value, DEEP_LEVEL) as T;
};

export const toCamelCaseDeep = <T>(value: T): T => {
  return camelCase(value, DEEP_LEVEL) as T;
};
