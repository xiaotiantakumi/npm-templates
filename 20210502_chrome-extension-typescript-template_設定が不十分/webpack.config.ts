import { ConfigurationFactory } from 'webpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtensionReloader from 'webpack-extension-reloader'

const commonConfig : ConfigurationFactory = (env, argv) => {
  return {
    entry: {
      content_scripts: path.join(__dirname, 'src', 'content_scripts.ts')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
        }
      ]
    },
    resolve: {
      extensions: ['ts', 'js']
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'public', to: '.' }
      ])
    ]
  }
}

const developmentConfig : ConfigurationFactory = (env, argv) => {
  return {
      mode: 'development',
      watch: true,
      devtool: 'inline-source-map',
      plugins: [
        new ExtensionReloader({
          port: 9090,
          reloadPage: true,
          manifest: path.resolve(__dirname, 'public', 'manifest.json'),
          entries: {
            contentScript: [
              'content',
            ],
            background: [
              'background',
            ],
            extensionPage: [
              'options',
            ],
          },
        }),
      ].filter(Boolean),
}

export default commonConfig 
