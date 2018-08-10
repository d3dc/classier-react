export const config = {
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

export function configure (opts) {
  Object.assign(config, {
    ...opts,
    join: { ...config.join, ...opts.join }
  })
}
