export default function shallowClone<T = any>(obj: T): T {
  var clone = Object.create(Object.getPrototypeOf(obj));

  var props = Object.getOwnPropertyNames(obj);
  props.forEach(function (key) {
    var desc = Object.getOwnPropertyDescriptor(obj, key);
    // Object.defineProperty(clone, key, desc ?? {});
    Object.defineProperty(clone, key, desc);
  });

  return clone;
}
