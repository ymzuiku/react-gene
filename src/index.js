import * as PIXI from 'pixi.js';
import render from './render';
import createApp from './createApp';
PIXI.utils.sayHello = function() {
  console.log('webgl-app: init');
};

export { render, PIXI, createApp };
