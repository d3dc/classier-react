import config from './config'
import { mapAstToString } from './syntax'

export const classnamesWithMapper = (mapper, base) =>
  mapAstToString(node => mapper(config.mapFn(node)), base)

export const classnamesWithBase = base => mapAstToString(config.mapFn, base)

export const classnames = classnamesWithBase(undefined)

export const cx = classnames

export const cxb = classnamesWithBase

export const cxm = classnamesWithMapper

export default cx
