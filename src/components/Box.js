import React from 'react'
import { classnames } from '../transform'

/*
  Creates an element that uses its unknown props as css class names.
  Defaults to a div.
 */
export const factory = mapper =>
  function Box({
    title,
    style,
    onClick,
    className,
    children,
    is = 'div',
    ...propClasses
  }) {
    const classes = mapper(propClasses, className)
    const Tag = is

    const props = {
      title,
      style,
      onClick,
      children,
      className: classes,
      role: onClick ? 'button' : undefined
    }

    return <Tag {...props} />
  }

export const Box = factory(classnames)

export default Box
