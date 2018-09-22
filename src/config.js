import * as mappers from './mappers'

export const config = {
  mapFn: mappers.tailwind,
  keepSentence: true,
  kebabCase: true,
  join: {
    variant: ':',
    block: '-',
    modifier: '-',
    value: '-',
    words: '-'
  }
}

export function configure(opts) {
  Object.assign(config, {
    ...opts,
    join: { ...config.join, ...opts.join }
  })
}

export { mappers }
export default config
