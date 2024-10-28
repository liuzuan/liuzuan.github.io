// 生成柯里化函数
function curry(fn) {
  // 获取函数参数个数
  const length = fn.length;
  // 参数已全部传入，则直接执行函数
  return function curried(...args2) {
    if (args.length >= length) {
      return fn(...args);
    } else {
      // 否则返回一个函数，继续收集参数
      return curried.apply(this, args.concat(args2));
    }
  };
}
