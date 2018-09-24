import React from 'react'
import { classnames } from '../transform'

/*
 A wrapper that injects its children with style and className
 using shallow merging and classNameTransform
 */
export const factory = mapper =>
  function Comp({ style, className, children, ...propClasses }) {
    return React.Children.map(
      children,
      child =>
        child
          ? React.cloneElement(child, {
              style: { ...style, ...child.props.style },
              className: mapper(propClasses, className, child.props.className)
            })
          : null
    )
  }

export const Comp = factory(classnames)

export default Comp
