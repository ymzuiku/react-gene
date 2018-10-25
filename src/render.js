import ReactReconciler from 'react-reconciler';
import createApp from './createApp';
import { appProps } from './props';
import createSprite from './createSprite';

const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    if (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    ) {
      return createSprite.text(props);
    }
  },
  createInstance: (
    type,
    props,
    rootContainerInstance,
    _currentHostContext,
    workInProgress,
  ) => {
    const ele = createSprite[type](props);
    Object.keys(props).forEach(propName => {
      const propValue = props[propName];
      if (propName === 'children') {
        //
      } else if (propName === 'onClick') {
        ele.addEventListener('click', propValue);
      } else {
        if (typeof ele._customApplyProps === 'function') {
          ele._customApplyProps(ele, {}, props);
        } else {
          ele[propName] = propValue;
        }
      }
    });
    return ele;
  },
  createTextInstance: text => {
    return null;
    // return document.createTextNode(text);
  },
  appendInitialChild: (parent, child) => {
    if (child) {
      parent.addChild(child);
    }
  },
  appendChild(parent, child) {
    if (child) {
      // parent.addChild(child);
      parent.removeChild(child);
      parent.addChild(child);
      if (typeof child._customDidAttach === 'function') {
        child._customDidAttach(child);
      }
    }
  },
  appendChildToContainer: (parent, child) => {
    if (child) {
      parent.addChild(child);
    }
  },
  finalizeInitialChildren: (ele, type, props) => {},
  prepareUpdate(ele, oldProps, newProps) {
    return true;
  },
  commitUpdate(ele, updatePayload, type, oldProps, newProps) {
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (type === 'text' && propName === 'children') {
        if (Object.prototype.toString.call(propValue) === '[object Array]') {
          if (
            typeof propValue[0] === 'string' ||
            typeof propValue[0] === 'number'
          ) {
            let str = '';
            for (let i = 0; i < propValue.length; i++) {
              str += String(propValue[i]);
            }
            ele.text = str;
          }
        }
      } else if (propName === 'children') {
      } else {
        const propValue = newProps[propName];
        ele[propName] = propValue;
      }
    });
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },
  removeChild(parent, child) {
    if (typeof child._customWillDetach === 'function') {
      child._customWillDetach(child);
    }
    parent.removeChild(child);
    child.destroy();
  },
  // if used without React DOM
  isPrimaryRenderer: true,
  supportsMutation: true,
};

const ReactReconcilerInst = ReactReconciler(hostConfig);
let app;
let rootContainer;
export default function(reactElement, createAppOptions = appProps, callback) {
  if (!app) {
    app = createApp(createAppOptions);
    rootContainer = ReactReconcilerInst.createContainer(app.stage, false);
  }
  // update the root Container
  return ReactReconcilerInst.updateContainer(
    reactElement,
    rootContainer,
    null,
    callback,
  );
}
