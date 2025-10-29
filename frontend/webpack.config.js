import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

export default {
  mode: "development",
  entry: "./js/script.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/js"),
  },
  watch: true,
  devtool: "source-map",
  module: {}
}