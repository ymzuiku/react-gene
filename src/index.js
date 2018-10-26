import * as _pixi from 'pixi.js';
import render from './render';
import createApp from './createApp';
_pixi.utils.sayHello = function() {
  console.log('webgl-app: init');
};

export { render, _pixi, createApp };
