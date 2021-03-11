import dispatch from '../dispatcher.js';
import { SyntaxKind } from 'typescript';

export default function buildClass(node, parents) {
  const cl = {};

  cl.category = 'class';
  if (parents) cl.parents = parents;

  cl.name = node.name?.escapedText;

  if (node.modifiers)
    cl.isExported = node.modifiers?.some((mod) => mod.kin === SyntaxKind['ExportKeyword']);
  if (node.jsDoc) cl.jsDoc = node.jsDoc?.[0]?.comment;

  const downstreamParents = ( parents || []).concat(cl.name)
  cl.children = node.members.map((m) => dispatch(m, downstreamParents));

  return cl;
}
