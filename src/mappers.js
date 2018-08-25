import { config } from './config'

export const tailwind = ({ variant, block, modifier, value }) =>
  (variant || '') +
  ((variant && config.join.variant) || '') +
  (block || '') +
  ((block && modifier && config.join.modifier) || '') +
  (modifier || '') +
  ((value && config.join.value) || '') +
  (value || '')
