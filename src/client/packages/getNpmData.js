// TODO: suggestions while typing: https://www.npmjs.com/search/suggestions?q=koa

// memoizes promise to prevent multiple network requests to same url
const memP = (promiser) => {
  const cache = new Map();

  return (param) => {
    if (!cache.has(param)) cache.set(param, promiser(param));
    return cache.get(param);
  };
};

const getNpmData = (packageName) => {
  const npmUrl = (packageName) => `https://registry.npmjs.org/${packageName}`;

  // set header to receive abbreviated response
  fetch(npmUrl, { headers: { Accept: 'application/vnd.npm.install-v1+jsonn' } })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// returns promise that resolves to type declaration url or rejects with an error
const getUnpkgData = (packageName) => {
  const unpkgUrl = `https://unpkg.com/${packageName}`;
  const packageJson = `${unpkgUrl}/package.json`;
  return fetch(packageJson)
    .then((res) => {
      if (res.status !== 200) throw new Error(`package ${packageName} not found on unpkg`);
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.types) throw new Error('no types key on package.json');
      return `${unpkgUrl}/${data.types}`;
    });
};

const memGetUnpkgData = memP(getUnpkgData)

export const getPackageTypeInfo = (packageName) => memGetUnpkgData(packageName);
