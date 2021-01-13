import dispatch from '../dispatcher.js';
// import ts from 'typescript';

export default function buildInterface(node, parents) {
  const itf = {};

  itf.category = 'interface';
  if (parents) itf.parents = parents

  itf.name = node.name?.escapedText;
  if (node.modifiers)
    itf.isExported = node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind['ExportKeyword']);
  if (node.jsDoc) itf.jsDoc = node.jsDoc?.[0]?.comment;

  const downstreamParents = ( parents || []).concat(itf.name)
  itf.children = node.members.map(m => dispatch(m, downstreamParents))

  // node.forEachChild((node) => {
  //   const child = dispatch(node);
  //   if (child) itf.children.push(child);
  // });

  return itf;
}
