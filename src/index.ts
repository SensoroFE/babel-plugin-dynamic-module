import * as BabelCore from '@babel/core';
import { sourceFormatter } from './utils';

import type { State } from './types';

const defaultModules = [
  '@sensoro/core',
  '@sensoro/layout',
  '@sensoro/library'
];

export default function ({ template }: typeof BabelCore) {
  return {
    name: 'babel-plugin-dynamic-module',
    visitor: {
      ImportDeclaration(path: any, state: State) {
        const { node } = path;
        const { opts } = state;
        const { modules = defaultModules } = opts;

        // path maybe removed by prev instances.
        const moduleName = modules.find((module) =>
          node.source.value.startsWith(module),
        );
        if (!moduleName || !node) return;

        const source = sourceFormatter(node.source.value, {
          moduleName,
        });

        // 导出的默认
        let defaultNameSpaceExport;
        // @ts-ignore
        let exports = [];
        // @ts-ignore
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            if (
              specifier.imported.name === 'default' &&
              specifier.imported.name !== specifier.local.name
            ) {
              // defaultExport = specifier.local.name;
              // @ts-ignore
              exports.push({
                imported: 'default',
                local: specifier.local.name,
              });
            } else if (specifier.imported.name !== specifier.local.name) {
              // @ts-ignore
              exports.push({
                imported: specifier.imported.name,
                local: specifier.local.name,
              });
            } else {
              // @ts-ignore
              exports.push(specifier.local.name);
            }
          } else if (specifier.type === 'ImportDefaultSpecifier') {
            // defaultExport = specifier.local.name;
            // @ts-ignore
            exports.push({
              imported: 'default',
              local: specifier.local.name,
            });
          } else if (specifier.type === 'ImportNamespaceSpecifier') {
            // exports.push(specifier.local.name);
            defaultNameSpaceExport = specifier.local.name;
          }
        });

        let sourceString = '';
        if (defaultNameSpaceExport) {
          sourceString = `const ${defaultNameSpaceExport} = ${source};`;
        }
        if (exports.length > 0) {
          sourceString += `const {`;
          // @ts-ignore
          exports.forEach((element) => {
            if (typeof element === 'object') {
              // @ts-ignore
              sourceString += `${element.imported}:${element.local},`;
            } else {
              sourceString += `${element},`;
            }
          });
          sourceString += `} = ${source}`;
        }
        const ast = template.ast(sourceString);

        // @ts-ignore
        path.replaceWithMultiple(ast);
      },
    },
  };
}

export { sourceFormatter } from './utils';
