import React from 'react'

const DEFAULT_CONFIG = {
  transformCase: true,
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

function toStyleName(modifier, value) {
  const name =
    value === true ? modifier : `${modifier}${config.join.value}${value}`
  // Might need to customize the separator
  // This is aZ | aXYZ
  let style = name
    .split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)
    .join(config.join.words)

  if (config.transformCase) {
    style = style.toLowerCase()
  }

  return style
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

/*
 A wrapper that injects its children with style and className
 using shallow merging and classNameTransform
 */
export const Comp = ({ as, style, className, children, ...propClasses }) =>
  React.Children.map(
    children,
    child =>
      child
        ? React.cloneElement(child, {
            style: { ...style, ...child.props.style },
            className: cx(
              propClasses,
              className,
              child.props.className,
              as && as.__classier
            )
          })
        : null
  )

export function mapToNamespace(name, props) {
  return Object.keys(props).reduce(
    (res, key) => {
      res[`${name}${config.join.modifier}${key}`] = props[key]
      return res
    },
    { [name]: true }
  )
}

export const createBlock = name => {
  const render = props => <Box {...mapToNamespace(name, props)} />

  const proxy = new Proxy(render, {
    get(obj, nested) {
      return nested in obj
        ? obj[nested]
        : (obj[nested] = createBlock(`${name}${config.join.block}${nested}`))
    }
  })

  // Store this so we can use it in Comp
  proxy.__classier = toStyleName(name, true)

  return proxy
}
