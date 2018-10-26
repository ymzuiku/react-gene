const toString = Object.prototype.toString;
export default function(ele, props) {
  for (let k in props) {
    if (toString.call(props[k]) === '[object Array]') {
      ele[k](...props[k]);
    } else {
      if (props[k]) ele[k] = props[k];
    }
  }
}
