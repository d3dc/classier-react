import { config } from './config'

function kebab (camel, sentenceCase) {
  // Might need to customize the separator
  // This is aZ | aXYZ
  const words = camel
    .toString()
    .split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)

  if (!sentenceCase) {
    return words.join(config.join.words).toLowerCase()
  }

  return [words[0], ...words.slice(1).map(w => w.toLowerCase())].join(
    config.join.words
  )
}

function toStyleName (modifier, value) {
  let tm = config.kebabCase ? kebab(modifier, config.keepSentence) : modifier

  if (value === true) {
    return tm
  }

  let tv = config.kebabCase ? kebab(value) : value

  return `${tm}${config.join.value}${tv}`
}

function toClassNames (name, value) {
  if (Array.isArray(value)) {
    return value.map(inner => toClassNames(name, inner))
  }

  return toStyleName(name, value)
}

function cx (props, ...extraClassNames) {
  return Object.keys(props)
    .filter(name => props[name] !== false)
    .map(name => toClassNames(name, props[name]))
    .reduce((a, b) => a.concat(b), extraClassNames)
    .join(' ')
}

export default cx
