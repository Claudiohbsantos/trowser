import Fuse from 'fuse.js';

const getReturnTypeName = (returnType) => {
  if (typeof returnType === 'string') return returnType;
  if (returnType.name) return returnType.name;
  if (returnType.elementType) return getReturnTypeName(returnType.elementType);
  // TODO: needs implementation for unions, intersections, ....
  return '';
};

const returnMatcher = (obj) => getReturnTypeName(obj.return);

const fuseOptions = {
  getFn: (obj, path) => {
    if (path.includes('return')) return returnMatcher(obj);
    return Fuse.config.getFn(obj, path);
  },
  useExtendedSearch: true,
  findAllMatches: true,
  includeScore: true,
  threshold: 0.4,
  keys: [
    { name: 'name', weight: 2 },
    { name: 'parents', weight: 1.5 },
    { name: 'parameters.name', weight: 1.5 },
    'parameters.type',
    // 'return',
  ],
};

const safeKey = item => `_key_${item?.parents.join('') + item.name}`

const collapseOverloads = (results) => {
  const mostRelevantResults = results.reduce((acc, entry) => {
    if (!acc[safeKey(entry.item)]) acc[safeKey(entry.item)] = Object.assign(entry, { otherOverloads: [] });
    else acc[safeKey(entry.item)].otherOverloads.push(entry.item)

    return acc;
  }, {});

  return Object.values(mostRelevantResults);
};

// looks for custom query constructs to build logical queries. if none, return query string
const buildFuseQuery = (query) => {
  const targets = {
    p: 'parameters.name',
    r: 'return',
    n: 'name',
    // TODO: t should match paremeter types or return types
    t: 'parameters.type',
  };

  const hasTarget = new RegExp(`[${Object.keys(targets).join('')}]=\\S`);
  if (!hasTarget.test(query)) return query;

  const logicalQueries = [];
  const rgx = new RegExp(`(?:(?<target>[${Object.keys(targets).join('')}])(?==))?=?(?<query>\\S+)`, 'g')
  for (const match of query.matchAll(rgx)) {
    if (match.groups.target && match.groups.query)
      logicalQueries.push({
        $path: [targets[match.groups.target]],
        $val: match.groups.query,
      });

    // If this match doesnt have target specified it should apply to all keys
    else
      logicalQueries.push({
        // reverse operators need to match all keys. all others need to match only one key
        [match[0] === '!' ? '$and' : '$or']: fuseOptions.keys.reduce(
          (acc, key) =>
            acc.concat({
              $path: [key.name ?? key],
              $val: match[0],
            }),
          []
        ),
      });
  }

  return { $and: logicalQueries };
};

export default (collection) => {
  const fuse = new Fuse(collection, fuseOptions);
  return (query) => {
    if (!query) return collapseOverloads(collection.map((item) => ({ item: item })));

    const fuseQuery = buildFuseQuery(query);
    
    return collapseOverloads(fuse.search(fuseQuery));
  };
};
