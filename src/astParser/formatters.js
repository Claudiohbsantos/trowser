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
      return `{ ${type.properties.map((t) => `${t?.name}: ${formatType(t?.type)}`).join(' , ')} }`;
    }
    default: {
      if (type?.name) return type.name
      if (typeof type === 'string') return type
      return '---FAIL---'
    }
  }
}
// parts = [parents, name, parameters, return]
// returns an array because that way order information is kept
export function formatSignatureParts(item) {
  try {
    const parts = [
      item.parents,
      item.name,
      item.parameters.map((p) => ({
        isRest: p?.isRest,
        name: p?.name,
        isOptional: p?.isOptional,
        type: formatType(p?.type),
      })),
      formatType(item?.return),
    ];
    return parts;
  } catch(err) {console.log(item,err)}
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
