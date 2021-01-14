import dispatch from '../dispatcher.js';
import ts from '../../tsImporter.js';

const buildFunction = category => (functionNode, parents) => {
  const func = {};
  func.category = category;
  if (parents) func.parents = parents

  if (functionNode.name?.escapedText) func.name = functionNode.name?.escapedText;
  func.parameters = functionNode.parameters.map(dispatch);
  func.return = dispatch(functionNode.type);

  // TODO: jsdoc on overloaded functions sometimes is above topmost declaration only
  if (functionNode.jsDoc?.[0]?.comment) func.description = functionNode.jsDoc[0].comment;

  functionNode.jsDoc?.[0]?.tags
    ?.filter((tag) => tag.kind === ts.SyntaxKind['JSDocParameterTag'])
    ?.forEach((tag) => extendParametersWithJsDoc(func.parameters, tag));

  // func.isExported = functionNode.modifiers?.some(mod => mod.kind === kindLookup['ExportKeyword'])
  return func;
};
export default buildFunction

function extendParametersWithJsDoc(parameters, tag) {
  // mutates parameters object.
  parameters.forEach((p) => {
    if (p.name === tag.name?.escapedText) p.description = tag.comment;
  });
}
