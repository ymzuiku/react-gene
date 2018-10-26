import ReactReconciler from 'react-reconciler';
import createApp from './createApp';
import { appProps } from './props';
import layerCreate from './layerCreate';
import layerUpdate from './layerUpdate';

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
      return layerCreate.text(props);
    }
  },
  createInstance: (
    type,
    props,
    rootContainerInstance,
    _currentHostContext,
    workInProgress,
  ) => {
    return layerCreate[type](props);
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
      // parent.removeChild(child);
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
  commitUpdate(ele, updatePayload, type, oldProps, props) {
    if (oldProps === props) return;
    layerUpdate[type](ele, updatePayload, type, oldProps, props);
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
  setTimeout(() => {
    ReactReconcilerInst.updateContainer(
      reactElement,
      rootContainer,
      null,
      callback,
    );
  }, 17);
}
