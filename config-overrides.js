const { override, fixBabelImports, disableEsLint, addDecoratorsLegacy, addLessLoader } = require('customize-cra');
const white = require("./src/assets/themes/white");

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: white,
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  // 禁用es语法检查
  disableEsLint(),
  // 启用装饰器语法
  addDecoratorsLegacy(),
);