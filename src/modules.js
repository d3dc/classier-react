import { classnamesWithBase, classnamesWithMapper } from './transform'
import { factory as makeBox } from './componets/Box'
import { factory as makeComp } from './componets/Comp'

export const makeElement = mapper => {
  const El = makeBox(mapper)
  El.Comp = makeComp(mapper)
  return El
}

export const createElement = block => makeElement(classnamesWithBase({ block }))

export const createModuleElement = (module, key) =>
  makeElement(
    classnamesWithMapper(name => module[name] || name, { block: key })
  )

export const boxedModule = module =>
  makeElement(classnamesWithMapper(name => module[name] || name))

export const elementModule = (module, pick) =>
  (pick || Object.keys(module)).reduce((res, key) => {
    const capped = key.charAt(0).toUpperCase() + key.substring(1)
    res[capped] = createModuleElement(module, key)
    return res
  }, {})
