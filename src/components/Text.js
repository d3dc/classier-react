import React from 'react'
import cx from '../transform'

/*
  Creates a span element that uses its unknown props as css class names.
 */
export default function Text({ className, children, ...propClasses }) {
  return <span className={cx(propClasses, className)} children={children} />
}
