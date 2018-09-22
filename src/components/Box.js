import React from 'react'
import cx from '../transform'

/*
  Creates an element that uses its unknown props as css class names.
  Defaults to a div.
 */
export default function Box({
  style,
  className,
  onClick,
  title,
  children,
  is = 'div',
  ...propClasses
}) {
  const classes = cx(propClasses, className)

  const props = {
    title,
    style,
    onClick,
    children,
    className: classes,
    role: onClick ? 'button' : undefined
  }

  return React.createElement(is, props)
}
