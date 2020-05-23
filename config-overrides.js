const { override, fixBabelImports, disableEsLint, addDecoratorsLegacy, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  // 禁用es语法检查
  disableEsLint(),
  // 启用装饰器语法
  addDecoratorsLegacy(),
);