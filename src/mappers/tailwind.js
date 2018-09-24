export default function tailwind(config) {
  return ({ variant, block, modifier, value }) =>
    (variant || '') +
    ((variant && config.join.variant) || '') +
    (block || '') +
    ((block && modifier && config.join.modifier) || '') +
    (modifier || '') +
    ((value && config.join.value) || '') +
    (value || '')
}
