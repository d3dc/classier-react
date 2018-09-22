import React from 'react'
import { classnames } from '../transform'

/*
  Creates a span element that uses its unknown props as css class names.
 */
export const factory = mapper =>
  function Text({ className, children, ...propClasses }) {
    return (
      <span className={mapper(propClasses, className)} children={children} />
    )
  }

export const Text = factory(classnames)

export default Text
