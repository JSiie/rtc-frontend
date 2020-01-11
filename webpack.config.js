//const path = require('/home/jonathan/Documents/ilearnenglish');
const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
   //entry: path.join(__dirname, '/src/index.js'),
   entry: path.join(__dirname, '/src/index.js'),
   output: {
       filename: 'build.js',
       path: path.join(__dirname, '/dist'), 
   },    
   module:{
       rules:[{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      },
      {
         test: /\.css$/,
         exclude: /node_modules/,
         loaders: ['style-loader', 'css-loader'],
      }
      ,
      {
         test: /\.svg$/,
         exclude: /node_modules/,
         loaders: ['style-loader', 'svg-inline-loader'],
      }
      ]
   },
   plugins:[
      new HWP(
         {template: path.join(__dirname,'/src/index.html'),
		 filename: 'index.html'}
       )
   ]
}
