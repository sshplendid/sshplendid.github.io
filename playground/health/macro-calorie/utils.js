// _.js
((window) => {

  const get = function(obj, prop) {
    if(!obj || !prop) return undefined;
    const val = obj[prop] || undefined;
    return val;
  };
  const set = function(obj, prop, val) {
    if(!obj || !prop ) return undefined;
    obj[prop] = val;
    return val;
  };
  
  const forEach = function(arr, fn) {
    const newArr = [];
    for(i in arr) {
      newArr.push(fn(arr[i]));
    }
    return newArr;
  };
  const map = function(arr, mapper) {
    return forEach(arr, mapper);
  };
  const filter = function(arr, predicate) {
    return forEach(arr, predicate);
  };
  const reduce = function(arr, accumulate) {
    return forEach(arr, accumulate);
  };
  
  const getElement = function(id) {
    return document.getElementById(id);
  };
  
  const parse = (query, joiner, separator) => {
    return query.split(joiner)
    .map(q => {
      const key = q.split(separator)[0];
      const val = q.split(separator)[1];
      const obj = {};
      obj[key] = val;
      return obj;
    })
    .reduce((a, b) => Object.assign(a, b));
  };

  const _ = {
    get: get,
    set: set,
    forEach: forEach,
    map: map,
    filter: filter,
    reduce: reduce,
    getElement: getElement,
    parse: parse
  };

  window._ = _;
})(window);
  
  