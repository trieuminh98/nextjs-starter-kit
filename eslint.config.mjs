import next from 'eslint-config-next';
import pluginQuery from '@tanstack/eslint-plugin-query';

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...next,
  ...pluginQuery.configs['flat/recommended'],
];

export default eslintConfig;
