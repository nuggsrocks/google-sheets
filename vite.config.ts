import { type UserConfig } from 'vite'

export default {
  build: {
    lib: {
      entry: './index.ts',
      fileName: 'index',
      formats: ['cjs'],
    },
  },
} satisfies UserConfig
