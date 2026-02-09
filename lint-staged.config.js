module.exports = {
  '*': (files) => [
    'pnpm test',
    `pnpm format --ignore-unknown ${files.join(' ')}`,
    'tsc --noEmit',
  ],
}
