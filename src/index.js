import React from 'react'

let JOIN_MODIFIERS = '-'
let JOIN_WORDS = '-'
let TRANSFORM_CASE = true

export function configure(opts) {
  JOIN_MODIFIERS = (opts.join && opts.join.modifiers) || JOIN_MODIFIERS
  JOIN_WORDS = (opts.join && opts.join.words) || JOIN_WORDS
  TRANSFORM_CASE = opts.hasOwnProperty('transformCase')
    ? Boolean(opts['transformCase'])
    : TRANSFORM_CASE
}

function transformName(name) {
  // Might need to customize the separator
  // This is aZ | aXYZ
  let style = name
    .split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)
    .join(JOIN_WORDS)

  if (TRANSFORM_CASE) {
    style = style[0] + style.substring(1).toLowerCase()
  }

  return style
}

function toStyleName(name, modifiers) {
  return transformName(
    modifiers ? `${name}${JOIN_MODIFIERS}${modifiers}` : name
  )
}

function toClassNames(props) {
  return Object.keys(props)
    .filter(name => !!props[name])
    .map(name => {
      if (Array.isArray(props[name])) {
        return props[name].map(inner => toStyleName(name, inner)).join(' ')
      }

      return toStyleName(name, props[name] === true ? undefined : props[name])
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
