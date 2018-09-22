import config from './config'
import { mapAstToString } from './syntax'

export const classnamesWithMapper = (mapper, base) =>
  mapAstToString(nodes => nodes.map(config.mapFn).map(mapper), base)

export const classnamesWithBase = base =>
  mapAstToString(nodes => nodes.map(config.mapFn), base)

export const classnames = classnamesWithBase(undefined)

export const cx = classnames

export default cx
