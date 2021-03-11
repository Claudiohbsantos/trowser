// https://ast.carlosroso.com/
import { createSourceFile, ScriptTarget } from 'typescript';
import { crawl } from './lib/dispatcher.js';
import lister from './lister.js';
export { default as createSearchInstance } from './search.js';
// export { formatTypedSignature, formatSignature , formatSignatureParts} from './formatters.js';
export * from './formatters.js';

// export const dependencies = (declarationStr) => {
//   // TODO: naive implementation. assumes all kinds of dependencies are the same
//   // and all point to files in same directory

//   const refs = ts.preProcessFile(declarationStr);

//   const concatFilenames = (refArrs) =>
//     refArrs.reduce((acc, refs) => acc.concat(refs.map((r) => r.fileName)), []);

//   return concatFilenames([
//     refs.referencedFiles,
//     refs.typeReferenceDirectives,
//     refs.libReferenceDirectives,
//     refs.importedFiles,
//   ]);
// };

export const buildSymbolList = (declarationStr) => {
  const ast = createSourceFile('', declarationStr, ScriptTarget.Latest);
  const symbols = [];
  crawl(ast, symbols);
  return lister(symbols);
};

// export const createSearchInstance = (symbolList) => {
//   return indexCollection(symbolList);
// };

// log(results.map((r) => formatTypedSignature(r)));
