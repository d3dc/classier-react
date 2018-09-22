import React from 'react'

/*
  A text span that uses its unknown props as css class names
 */
export const makeText = mapper => ({ className, children, ...propClasses }) => (
  <span className={mapper(propClasses, className)} children={children} />
)

/*
  A structural div that uses its unknown props as css class names
 */
export const makeBox = mapper => ({
  title,
  style,
  onClick,
  className,
  children,
  is = 'div',
  ...propClasses
}) => {
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

/*
 A wrapper that injects its children with style and className
 using shallow merging and mapper
 */
export const makeComposer = mapper => ({
  style,
  className,
  children,
  ...propClasses
}) =>
  React.Children.map(
    children,
    child =>
      child
        ? React.cloneElement(child, {
            style: { ...style, ...child.props.style },
            className: mapper(propClasses, className, child.props.className)
          })
        : null
  )

/*
A group of components with an element-specific mapper
 */
export const makeElement = mapper => {
  const El = makeBox(mapper)
  El.Comp = makeComposer(mapper)
  return El
}
