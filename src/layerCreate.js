import * as PIXI from 'pixi.js';
import setProps from './utils/setProps';

export default {
  bitMapText: function(props) {
    const ele = new PIXI.extras.BitmapText(props.text, props.style);
    const { children, ...rest } = props;
    setProps(ele, rest);
    return ele;
  },
  container: function(props) {
    const ele = new PIXI.Container();
    const { children, ...rest } = props;
    setProps(ele, rest);
    return ele;
  },
  circle: function(props) {
    const ele = new PIXI.Circle();
    const { children, ...rest } = props;
    setProps(ele, rest);
    return ele;
  },
  graphics: function(props) {
    const ele = new PIXI.Graphics();
    const { children, ...rest } = props;
    setProps(ele, rest);
    return ele;
  },
  particles: function(props) {
    const ele = new PIXI.particles();
    const { children, ...rest } = props;
    setProps(ele, rest);
    return ele;
  },
  sprite: function(props) {
    let ele;
    if (props.src) {
      ele = new PIXI.Sprite.from(props.src);
    } else {
      ele = new PIXI.Sprite();
    }
    const { children, ...rest } = props;
    setProps(ele, rest);
    return ele;
  },
  text: function(props) {
    const ele = new PIXI.Text(
      props.text || props.children,
      new PIXI.TextStyle(props.style),
      props.canvas,
    );
    if (
      props.text === undefined &&
      Object.prototype.toString.call(props.children) === '[object Array]'
    ) {
      if (
        typeof props.children[0] === 'string' ||
        typeof props.children[0] === 'number'
      ) {
        let str = '';
        for (let i = 0; i < props.children.length; i++) {
          str += String(props.children[i]);
        }
        ele.text = str;
      }
    }
    const { children, ...rest } = props;
    setProps(ele, rest);
    return ele;
  },
  tilingSprite: function(props) {
    const ele = new PIXI.extras.TilingSprite(
      props.texture,
      props.width,
      props.height,
    );
    const { children, ...rest } = props;
    for (let k in rest) {
      ele[k] = rest[k];
    }
    return ele;
  },
  view: function(props) {
    const ele = new PIXI.Graphics();
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
      ele.drawRoundedRect(left, top, width, height, radius);
    } else {
      ele.drawRect(left, top, width, height);
    }
    ele.endFill();
    ele.width = width;
    ele.height = height;

    setProps(ele, rest);
    return ele;
  },
};
