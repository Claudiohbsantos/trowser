import dispatch from '../dispatcher.js';
import { SyntaxKind } from 'typescript';

const buildProperty = (category) => (node, parents) => {
  const prop = {};
  prop.category = category; 
  if (parents) prop.parents = parents;

  prop.name = node.name?.escapedText;
  prop.type = dispatch(node.type);

  if (node.modifiers)
    prop.isReadOnly = node.modifiers.some((mod) => mod.kind === SyntaxKind['ReadonlyKeyword']);

  if (node.jsDoc?.[0]?.comment) prop.description = node.jsDoc?.[0]?.comment;
  return prop;
};
export default buildProperty;
