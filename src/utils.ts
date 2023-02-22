interface SourceFormatterOptions {
  moduleName: string;
  mountGlobal?: boolean;
}

/**
 * 转换 import 的路径为 window 对象属性
 * @param importPath
 * @returns
 *   @sensoro/core => window.sensoro$core;
 *   @sensoro/core/es/passport => window.sensoro$core$passport;
 *   @sensoro/core/lib/passport => window.sensoro$core$passport;
 */
export function sourceFormatter(
  importPath: string,
  {
    moduleName,
    mountGlobal = true,
  }: SourceFormatterOptions
) {
  const attribute = importPath
    .replace(new RegExp(`^${moduleName}/es`), moduleName)
    .replace(new RegExp(`^${moduleName}/lib`), moduleName)
    .replace(new RegExp(`^${moduleName}/src`), moduleName)
    .replace(/\@/g, '')
    .replace(/\//g, '$')
    .replace(/\-/g, '$');

  return mountGlobal ? `window.${attribute}` : attribute;
}
