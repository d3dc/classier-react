import config from './config'

function mapFlat(array, fn) {
  const result = []
  for (const value of array) {
    const out = fn(value)
    if (Array.isArray(out)) {
      result.push(...out)
    } else {
      result[result.length] = out
    }
  }
  return result
}

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
    return mapFlat(value, inner => getNodes(inner, env))
  }

  if (typeof value === 'object') {
    return mapFlat(
      Object.keys(value),
      variant => getNodes(value[variant], { variant, ...env }) //overwrite with existing
    )
  }

  return {
    ...env,
    value:
      value !== true ? (config.kebabCase ? kebab(value) : value) : undefined
  }
}

/**
 * Build a list of AST nodes from props and env
 * pass it to mapper
 * join the parts to one string
 */
export const mapAstToString = (mapper, env) => (props, ...extraClassNames) => {
  const list = []

  if (env) {
    list.push(env)
  }

  for (const name of Object.keys(props)) {
    if (props[name] !== false) {
      const nodes = getNodes(props[name], {
        ...env,
        modifier: config.kebabCase ? kebab(name, config.keepSentence) : name
      })
      if (Array.isArray(nodes)) {
        list.push(...nodes)
      } else {
        list.push(nodes)
      }
    }
  }

  for (const i in list) {
    list[i] = mapper(list[i])
  }

  list.push(...extraClassNames.filter(i => i))

  return list.join(' ')
}
