import * as PIXI from 'pixi.js';

export default {
  bitMapText: function(props) {
    return new PIXI.extras.BitmapText(props.text, props.style);
  },
  container: function(props) {
    return new PIXI.Container();
  },
  graphics: function(props) {
    return new PIXI.Graphics();
  },
  particleContainer: function(props) {
    return new PIXI.Container();
  },
  sprite: function(props) {
    return new PIXI.Sprite(props.texture);
  },
  view: function(props) {
    return new PIXI.Sprite(props.texture);
  },
  text: function(props) {
    const ele = new PIXI.Text(
      props.text || props.children,
      props.style,
      props.canvas,
    );
    if (props.children) {
    }
    if (Object.prototype.toString.call(props.children) === '[object Array]') {
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
    return ele;
  },
  tilingSprite: function(props) {
    return new PIXI.extras.TilingSprite(
      props.texture,
      props.width,
      props.height,
    );
  },
};
