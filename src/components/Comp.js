import React from 'react'
import cx from '../transform'

/*
 A wrapper that injects its children with style and className
 using shallow merging and classNameTransform
 */
export default function Comp({ style, className, children, ...propClasses }) {
  return React.Children.map(
    children,
    child =>
      child
        ? React.cloneElement(child, {
            style: { ...style, ...child.props.style },
            className: cx(propClasses, className, child.props.className)
          })
        : null
  )
}
