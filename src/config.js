import tailwind from './mappers/tailwind'

export const config = {}

export function configure(opts) {
  Object.assign(config, {
    ...opts,
    mapFn: opts.mapFn ? opts.mapFn(config) : config.mapFn,
    join: { ...config.join, ...opts.join }
  })
}

// Default configuration
configure({
  mapFn: tailwind,
  keepSentence: true,
  kebabCase: true,
  join: {
    variant: ':',
    block: '-',
    modifier: '-',
    value: '-',
    words: '-'
  }
})

export default config
