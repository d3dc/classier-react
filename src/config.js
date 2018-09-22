import tailwind from './mappers/tailwind'

export const config = {}

export function configure(opts) {
  Object.assign(config, {
    ...opts,
    mapFn: config.mapFn || opts.mapFn(config),
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
