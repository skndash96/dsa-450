import * as reactPlugin from 'vite-plugin-react'

const config = {
  plugins: [reactPlugin],
  server: {
    historyApiFallback: true
  }
}

export default config
