import * as babel from '@babel/core';
import plugin from '../src';

describe('plugin test', () => {
  it('test case 1', () => {
    const code = `import { usePassport, useSocket, request } from '@sensoro/core';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`const {
  usePassport,
  useSocket,
  request
} = window.sensoro$core;`);
  });

  it('test case 2', () => {
    const code = `import * as Core from '@sensoro/core';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`const Core = window.sensoro$core;`);
  });

  it('test case 3', () => {
    const code = `import Core from '@sensoro/core';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`const {
  default: Core
} = window.sensoro$core;`);
  });

  it('test case 4', () => {
    const code = `import { usePassport } from '@sensoro/core/es/passport';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`const {
  usePassport
} = window.sensoro$core$passport;`);
  });

  it('test case 5', () => {
    const code = `import {  default as A, B } from '@sensoro/core';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`const {
  default: A,
  B
} = window.sensoro$core;`);
  });

  it('test case 6', () => {
    const code = `import C, { D } from '@sensoro/core';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`const {
  default: C,
  D
} = window.sensoro$core;`);
  });

  it('test case 7', () => {
    const code = `import {A as B} from '@sensoro/core';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`const {
  A: B
} = window.sensoro$core;`);
  });

  it('test case 8', () => {
    const code = `import { get } from 'lodash';`;
    const result = babel.transform(code, {
      plugins: [plugin],
    });
    expect(result?.code).toBe(`import { get } from 'lodash';`);
  });

  it('test case 9', () => {
    const code = `import { get } from 'lodash';`;
    const result = babel.transform(code, {
      plugins: [[plugin, { modules: ['lodash'] }]],
    });
    expect(result?.code).toBe(`const {
  get
} = window.lodash;`);
  });
});
