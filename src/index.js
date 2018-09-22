import {
  classnames,
  classnamesWithBase,
  classnamesWithMapper
} from './transform'
import * as factories from './factories'

export * from './transform'
export * from './config'

// Components
export const Box = factories.makeBox(classnames)
export const Text = factories.makeText(classnames)
export const Comp = factories.makeComposer(classnames)

export const createElement = block =>
  factories.makeElement(classnamesWithBase({ block }))

export const createModuleElement = (block, module) =>
  factories.makeElement(
    classnamesWithMapper(name => module[name] || name, { block })
  )

export const wrapModule = module =>
  Object.keys(module).reduce((res, key) => {
    res[key.charAt(0).toUpperCase() + key.substring(1)] = createModuleElement(
      key,
      module
    )
    return res
  }, {})
