import dispatch, { crawl } from '../dispatcher.js';

// first attempt will treat namespaces and modules equally
export default function moduleBuilder(node, parents) {
  const mod = {};

  mod.category = 'module';
  if (parents) mod.parents = parents

  extendModName(node, mod);

  const downstreamParents = ( parents || []).concat(mod.name)
  mod.children = node.body?.statements.map(m => dispatch(m, downstreamParents))
  return mod;
}

function extendModName(modNode, modObj) {
  if (modNode.name?.escapedText) {
    modObj.name = modNode.name?.escapedText;
    return;
  }
  if (modNode.name?.text) {
    modObj.name = modNode.name?.text;
    return;
  }
}
