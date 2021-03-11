import { SyntaxKind } from 'typescript';

import buildFunction from './builders/function.js';
import buildParameter from './builders/parameter.js';
import buildProperty from './builders/property.js';
import buildInterface from './builders/interface.js';
import moduleBuilder from './builders/module.js';
import classBuilder from './builders/class.js';

const basicTypesHandlers = {
  BooleanKeyword: () => 'boolean',
  StringKeyword: () => 'string',
  NumberKeyword: () => 'number',
  UnknownKeyword: () => 'unknown',
  AnyKeyword: () => 'any',
  VoidKeyword: () => 'void',
  UndefinedKeyword: () => 'undefined',
  NullKeyword: () => 'null',
  NeverKeyword: () => 'never',
  SymbolKeyword: () => 'symbol',
  ObjectKeyword: () => 'object',
  ThisType: () => 'this',
  TrueKeyword: () => 'true',
  FalseKeyword: () => 'false',
};

const typeLiteralHandler = (node) => ({
  category: 'object',
  properties: node.members.map((member) => dispatch(member)),
});

const literalHandler = (node) => node.literal?.text || dispatch(node.literal);

const typeRefHandler = (node) => ({ category: 'reference', name: node.typeName?.escapedText });
const arrayTypeHandler = (node) => ({ category: 'array', elementType: dispatch(node.elementType) });

const aliasHandler = (node) => ({
  category: 'alias',
  name: node.name?.escapedText,
  type: dispatch(node.type),
});

const unionTypeBuilder = (node) => ({ category: 'union', types: node.types.map(dispatch) });

const intersectionTypeBuilder = (node) => ({
  category: 'intersection',
  types: node.types.map(dispatch),
});

const handlers = {
  ...basicTypesHandlers,
  FunctionDeclaration: buildFunction('function'),
  MethodSignature: buildFunction('method'),
  FunctionType: buildFunction('functionType'),
  Parameter: buildParameter,
  TypeLiteral: typeLiteralHandler,
  LiteralType: literalHandler,
  PropertySignature: buildProperty('property'),
  PropertyDeclaration: buildProperty('classProperty'),
  MethodDeclaration: buildFunction('classMethod'),
  TypeReference: typeRefHandler,
  ArrayType: arrayTypeHandler,
  InterfaceDeclaration: buildInterface,
  TypeAliasDeclaration: aliasHandler,
  UnionType: unionTypeBuilder,
  IntersectionType: intersectionTypeBuilder,
  ModuleDeclaration: moduleBuilder,
  ClassDeclaration: classBuilder,
};

const dispatch = (node, parents) => {
  const nodeKind = SyntaxKind[node.kind];
  if (handlers[nodeKind]) return handlers[nodeKind](node, parents);
};

// TODO: DRY array vs node entrance
export const crawl = (node, accumulator) => {
  node.forEachChild((n) => {
    const symbol = dispatch(n);
    if (symbol) accumulator.push(symbol);
    else crawl(n, accumulator);
  });
};

export default dispatch;
