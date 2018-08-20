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

export const createModuleElement = (module, key) =>
  factories.makeElement(
    classnamesWithMapper(name => module[name] || name, { block: key })
  )

export const boxedModule = module =>
  factories.makeElement(classnamesWithMapper(name => module[name] || name))

export const elementModule = (module, pick) =>
  (pick || Object.keys(module)).reduce((res, key) => {
    const capped = key.charAt(0).toUpperCase() + key.substring(1)
    res[capped] = createModuleElement(module, key)
    return res
  }, {})
