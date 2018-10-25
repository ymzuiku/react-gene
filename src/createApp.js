import { Application } from 'pixi.js';
import { appProps } from './props';

export default function(props = appProps) {
  const { full, ...options } = { ...appProps, ...props };
  const app = new Application(options);
  if (full) {
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }
  document.body.appendChild(app.view);
  return app;
}
