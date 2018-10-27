import * as PIXI from 'pixi.js';
import setProps from './utils/setProps';

export default {
  bitMapText: function(ele, updatePayload, type, oldProps, props) {
    const { children, ...rest } = props;
    setProps(ele, rest);
  },
  container: function(ele, updatePayload, type, oldProps, props) {
    const { children, ...rest } = props;
    setProps(ele, rest);
  },
  graphics: function(ele, updatePayload, type, oldProps, props) {
    const { children, ...rest } = props;
    setProps(ele, rest);
  },
  particleContainer: function(ele, updatePayload, type, oldProps, props) {
    const { children, ...rest } = props;
    setProps(ele, rest);
  },
  tilingSprite: function(ele, updatePayload, type, oldProps, props) {
    const { children, ...rest } = props;
    setProps(ele, rest);
  },
  sprite: function(ele, updatePayload, type, oldProps, props) {
    const { children, src, ...rest } = props;
    setProps(ele, rest);
  },
  text: function(ele, updatePayload, type, oldProps, props) {
    const { children, ...rest } = props;
    if (props.text === undefined) {
      if (typeof children[0] === 'string' || typeof children[0] === 'number') {
        ele.text = children;
      }
      if (Object.prototype.toString.call(children) === '[object Array]') {
        let str = '';
        for (let i = 0; i < children.length; i++) {
          if (typeof children[i] === 'string') {
            str += children;
          } else if (typeof children[i] === 'number') {
            str += String(children[i]);
          }
        }
        ele.text = str;
      }
    }
    setProps(ele, rest);
  },
  view: function(ele, updatePayload, type, oldProps, props) {
    const {
      left = 0,
      top = 0,
      width = 44,
      height = 44,
      fill = 0xff0000,
      radius,
      path,
      lineStyle,
      moveTo,
      lineTo,
      children,
      draw,
      ...rest
    } = props;
    if (
      oldProps.left !== left ||
      oldProps.top !== top ||
      oldProps.width !== width ||
      oldProps.height !== height ||
      oldProps.fill !== fill ||
      oldProps.radius !== radius ||
      JSON.stringify(oldProps.path) !== JSON.stringify(path) ||
      JSON.stringify(oldProps.lineStyle) !== JSON.stringify(lineStyle) ||
      JSON.stringify(oldProps.moveTo) !== JSON.stringify(moveTo) ||
      JSON.stringify(oldProps.lineTo) !== JSON.stringify(lineTo)
    ) {
      ele.clear();
      ele.beginFill(fill);
      if (lineStyle) {
        ele.lineStyle(...lineStyle);
      }
      if (moveTo) {
        ele.moveTo(...moveTo);
      }
      if (lineTo) {
        ele.lineTo(...lineTo);
      }
      if (draw === 'ploy') {
        ele.drawPolygon(path);
      } else if (draw === 'ellipse') {
        ele.drawCircle(left, top, radius);
      } else if (draw === 'ellipse') {
        ele.drawCircle(left, top, radius);
      } else if (radius !== undefined) {
        // let mix = width > height ? height : width;
        // radius = radius > mix / 2 ? mix / 2 : radius;
        ele.drawRoundedRect(left, top, width, height, radius);
      } else {
        ele.drawRect(left, top, width, height);
      }
      ele.endFill();
      ele.width = width;
      ele.height = height;
    }
    setProps(ele, rest);
  },
};
