// TODO: suggestions while typing: https://www.npmjs.com/search/suggestions?q=koa

// memoizes promise to prevent multiple network requests to same url
const memP = (promiser) => {
  const cache = new Map();

  return (param) => {
    if (!cache.has(param)) cache.set(param, promiser(param));
    return cache.get(param);
  };
};

// const getNpmData = (packageName) => {
//   const npmUrl = (packageName) => `https://registry.npmjs.org/${packageName}`;

//   // set header to receive abbreviated response
//   fetch(npmUrl, { headers: { Accept: 'application/vnd.npm.install-v1+jsonn' } })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };

// returns promise that resolves to type declaration url or rejects with an error
const getPackageData = (packageName) => {
  const packageUrl = `https://unpkg.com/${packageName}`;
  const packageJson = `${packageUrl}/package.json`;
  return fetch(packageJson)
    .then((res) => {
      if (res.status !== 200) throw new Error(`package ${packageName} not found on unpkg`);
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.types && !data.typings) throw new Error('no types key on package.json');
      return `${packageUrl}/${data.types || data.typings}`;
    });
};

// try to get declaration files from definitely typed
const getDefinitelyTyped = (packageName) => {
  const declarationUrl = `https://unpkg.com/@types/${packageName}/index.d.ts`;
  // return tentaive url and let fails be handled at App.jsx
  return declarationUrl;
};

const attemptUrlFromName = memP((packageName) =>
  getPackageData(packageName).catch((err) => getDefinitelyTyped(packageName))
);

export const getPackageTypeInfo = (packageName) => attemptUrlFromName(packageName);
