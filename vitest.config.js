import path from 'path'

export default {
  plugins: [],
  test: {},
  resolve: {
    alias: {
      '@dbComm': path.resolve(__dirname, './')
    },
  },
}