module.exports = {
  '*': (files) => [
    `pnpm format --ignore-unknown ${files.join(' ')}`,
    'tsc --noEmit',
    'pnpm test',
  ],
}
