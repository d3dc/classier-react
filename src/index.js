import React from 'react'

function toStyleName(name, config) {
  // Might need to customize the separator
  return `${name}-${config}`
    .split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)
    .join('-')
}

function toClassNames(props) {
  return Object.keys(props)
    .filter(name => !!props[name])
    .map(name => {
      if (value === true) {
        return name
      }

      if (Array.isArray(value)) {
        return value.map(inner => toStyleName(name, inner)).join(' ')
      }

      return toStyleName(name, value)
    })
}

function cx(propClasses, ...extraClassNames) {
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
