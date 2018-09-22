import config from './config'
require('array.prototype.flatmap/auto')

function kebab(camel, sentenceCase) {
  // Might need to customize the separator
  // This is aZ | aXYZ
  return camel
    .toString()
    .match(/[A-Z]?[^A-Z]+|([A-Z](?![^A-Z]))+/g)
    .reduce(
      (result, word, index) =>
        result +
        (index //not first
          ? config.join.words + word.toLowerCase()
          : sentenceCase
            ? word
            : word.toLowerCase()),
      ''
    )
}

const getNodes = (value, env) => {
  if (Array.isArray(value)) {
    return value.flatMap(inner => getNodes(inner, env))
  }

  if (typeof value === 'object') {
    return Object.keys(value).flatMap(
      variant => getNodes(value[variant], { variant, ...env }) //overwrite with existing
    )
  }

  return {
    ...env,
    value:
      value !== true ? (config.kebabCase ? kebab(value) : value) : undefined
  }
}

const propsToNodeList = (props, env) =>
  Object.keys(props).flatMap(
    name =>
      props[name] !== false
        ? getNodes(props[name], {
            ...env,
            modifier: config.kebabCase ? kebab(name, config.keepSentence) : name
          })
        : []
  )

/**
 * Build a list of AST nodes from props and env
 * pass it to mapper
 * join the parts to one string
 */
export const mapAstToString = (mapper, env) => (props, ...extraClassNames) => {
  const nodeList = propsToNodeList(props, env)
  return extraClassNames
    .filter(i => i)
    .concat(mapper(env ? [env, ...nodeList] : nodeList))
    .join(' ')
}
