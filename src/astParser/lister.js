// const searcheables = ['function', 'interface'];
const searcheables = ['method', 'function', 'classMethod'];

export default function lister(symbols) {
  const list = [];

  const traverseSymbols = obj => {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        if (searcheables.includes(obj[key].category) && obj[key].name) list.push(obj[key])
        traverseSymbols(obj[key])
      }
    }
  }

  traverseSymbols(symbols)
  return list
}