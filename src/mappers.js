import { config } from './config'

export function tailwind(node) {
  return [
    node.variant && `${node.variant}${config.join.variant}`,
    node.block,
    node.block && node.modifier && config.join.modifier,
    node.modifier,
    node.value && `${config.join.value}${node.value}`
  ].join('')
}
