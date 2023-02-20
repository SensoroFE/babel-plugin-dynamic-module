import { NodePath } from '@babel/traverse';

type BabelTransformationFile = {
  opts: {
    filename: string
    babelrc: boolean
    configFile: boolean
    passPerPreset: boolean
    envName: string
    cwd: string
    root: string
    plugins: unknown[]
    presets: unknown[]
    parserOpts: object
    generatorOpts: object
  }
  declarations: {}
  path: NodePath | null
  ast: {}
  scope: unknown
  metadata: {}
  code: string
  inputMap: object | null
}

export interface Options {
  modules?: string[]
}

export type State = {
  file: BabelTransformationFile
  opts: Options
}
