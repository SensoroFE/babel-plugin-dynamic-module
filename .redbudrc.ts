import { defineConfig } from 'redbud';

export default defineConfig({
  cjs: {
    output: 'lib',
  },
  esm: {
    output: 'es',
  },
  platform: 'node',
});
