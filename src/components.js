import React from 'react'
import cx from './transform'

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
