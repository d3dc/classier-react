import React from 'react'

const DEFAULT_CONFIG = {
  keepSentence: true,
  kebabCase: true,
  join: {
    block: '-',
    modifier: '-',
    value: '-',
    words: '-'
  }
}

let config = DEFAULT_CONFIG

export function configure(opts) {
  config = {
    ...DEFAULT_CONFIG,
    ...opts,
    join: { ...DEFAULT_CONFIG.join, ...opts.join }
  }
}

function kebab(camel, sentenceCase) {
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

function toStyleName(modifier, value) {
  let tm = config.kebabCase ? kebab(modifier, config.keepSentence) : modifier

  if (value === true) {
    return tm
  }

  let tv = config.kebabCase ? kebab(value) : value

  return `${tm}${config.join.value}${tv}`
}

function toClassNames(props) {
  return Object.keys(props)
    .filter(name => props[name] !== false)
    .map(name => {
      if (Array.isArray(props[name])) {
        return props[name].map(inner => toStyleName(name, inner)).join(' ')
      }

      return toStyleName(name, props[name])
    })
}

export function cx(propClasses, ...extraClassNames) {
  return [...toClassNames(propClasses), ...extraClassNames].join(' ')
}

/*
  A structural div that uses its unknown props as css class names
 */
export const Box = ({
  style,
  className,
  onClick,
  title,
  children,
  is = 'div',
  ...propClasses
}) => {
  const classes = cx(propClasses, className)
  const Tag = is

  const props = {
    title,
    style,
    onClick,
    className: classes,
    role: onClick ? 'button' : undefined
  }

  return <Tag {...props}>{children}</Tag>
}

export const Text = ({ className, ...propClasses }) => (
  <span className={cx(propClasses, className)} />
)

/*
 A wrapper that injects its children with style and className
 using shallow merging and classNameTransform
 */
export const Comp = ({ style, className, children, ...propClasses }) =>
  React.Children.map(
    children,
    child =>
      child
        ? React.cloneElement(child, {
            style: { ...style, ...child.props.style },
            className: cx(propClasses, className, child.props.className)
          })
        : null
  )
