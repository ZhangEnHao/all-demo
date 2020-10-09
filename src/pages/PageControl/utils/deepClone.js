export const deepClone =(source) => {
  // 对参数做检验
  if (!source && typeof source !== 'object') {
      return;
  }
  let target = Object.prototype.toString.call(source) === '[object Array]' ? [] : {};
  for (let key in source) {
      if (source[key] && typeof source[key] === 'object') {
          target[key] = deepClone(source[key]);
      } else {
          target[key] = source[key];
      }
  }
  return target;
}