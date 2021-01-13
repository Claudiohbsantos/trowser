// https://ast.carlosroso.com/
// import ts from 'typescript';
import { crawl } from './lib/dispatcher.js';
import lister from './lister.js';
export {default as createSearchInstance} from './search.js';
// export { formatTypedSignature, formatSignature , formatSignatureParts} from './formatters.js';
export * from './formatters.js';

export const buildSymbolList = (declarationStr) => {
  const ast = ts.createSourceFile('', declarationStr, ts.ScriptTarget.Latest);
  const symbols = [];
  crawl(ast, symbols);
  return lister(symbols);
};

// export const createSearchInstance = (symbolList) => {
//   return indexCollection(symbolList);
// };

// log(results.map((r) => formatTypedSignature(r)));
