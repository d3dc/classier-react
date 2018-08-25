import { config } from './config'

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

function toStyleName(modifier, value) {
  let tm = config.kebabCase ? kebab(modifier, config.keepSentence) : modifier

  if (value === true) {
    return tm
  }

  let tv = config.kebabCase ? kebab(value) : value

  return `${tm}${config.join.value}${tv}`
}

function toClassNames(name, value) {
  if (Array.isArray(value)) {
    return value.map(inner => toClassNames(name, inner))
  }

  if (typeof value === 'object') {
    return Object.keys(value).map(variant =>
      toClassNames(`${variant}${config.join.variant}${name}`, value[variant])
    )
  }

  return toStyleName(name, value)
}

function cx(props, ...extraClassNames) {
  return Object.keys(props)
    .reduce(
      (classes, name) =>
        props[name] !== false
          ? classes.concat(toClassNames(name, props[name]))
          : classes,
      extraClassNames
    )
    .join(' ')
}

export default cx
