function formatParents(parents) {
  if (!parents) return '';
  return parents.join('.') + '.';
}

function formatTypedParameters(params) {
  return `${params
    .map(
      (p) => `${p.isRest ? '...' : ''}${p.name}${p.isOptional ? '?' : ''}: ${formatType(p.type)}`
    )
    .join(', ')}`;
}

export function formatType(type) {
  if (!type) return '---NOPE---';
  switch (type.category) {
    case 'functionType': {
      return `(${formatTypedParameters(type.parameters)}) => ${formatType(type.return)}`;
    }
    case 'union': {
      return type.types.map((t) => formatType(t)).join(' | ');
    }
    case 'intersection': {
      return type.types.map((t) => formatType(t)).join(' & ');
    }
    case 'array': {
      return `${formatType(type.elementType)}[]`;
    }
    case 'object': {
      return `{ ${type.properties.map((t) => `${t.name}: ${formatType(t.type)}`).join(' , ')} }`;
    }
    default: {
      return type?.name || type;
    }
  }
}
// parts = [parents, name, parameters, return]
// returns an array because that way order information is kept
export function formatSignatureParts(item) {
  return [
    item.parents,
    item.name,
    item.parameters.map(p => ({isRest: p.isRest,name: p.name,isOptional: p.isOptional, type:formatType(p.type)})),
    formatType(item.return)
  ]
}

export function formatTypedSignature(entry) {
  const item = entry.item;
  return `${formatParents(item.parents)}${item.name}(${formatTypedParameters(
    item.parameters
  )}) => ${item.return}`;
}

export function formatSignature(entry) {
  const item = entry.item;
  return `${formatParents(item.parents)}${item.name}(${item.parameters
    .map((p) => p.name)
    .join(', ')}) [+${entry.otherOverloads?.length}]`;
}
