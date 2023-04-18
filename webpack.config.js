const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rulesForCss = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}

const rulesForJavascript = {
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-react',
        // esto sirve para no poner en los los import react from react en cada archivo, lo detecta cuando lo necesita y lo hace por detras
        {
          runtime: 'automatic' // clasico
        }
      ]
    ]
  }
}

const rules = [
  rulesForJavascript,
  rulesForCss,
]

module.exports = (env, argv) => {

  // vemos si es produccion o no segun el mode q saca del package.json con mode. Sirve para hashear el build, esto es importantisimo para q quede registro de todos los builds, ya q cada vez genera uno distinto y no pisa el anterior
  const { mode } = argv;
  const isProduccion = mode === 'production';
  return {
    // entry: './src/index.js',  ---> por defecto ya es ese
    output: {
      filename: isProduccion ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'build') // esto es para cambiarle la salida de la carpeta dist a build
    },
    // funcionalidades que le agregamos a webpack. Este sirve para generar el html en la carpeta de build y inyectarle el js
    plugins: [
      new HtmlWebpackPlugin({templace: './src/index.html'})
    ],
    // para q entienda jsx hay q agregarle un loader. el loader es una biblioteca que transforma mi codigo y va a hacer q webpack lo entienda y lo transforme a algo q pueda entender el navegador. Es como un preprocesador. El loader q usamos para react es Babel. ts-loader es para typescript
    module: {
      rules
    },
    devServer:{
      open: true,  // abre navegador automaticamente
      port: 3000
    }
  }
}