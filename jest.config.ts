import { createConfig, type Config } from '@umijs/test';

const defaultConfig = createConfig({
  target: 'node'
});

const config: Config.InitialOptions = {
  ...defaultConfig,
}

export default config;
