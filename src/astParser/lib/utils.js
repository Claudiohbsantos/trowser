import util from 'util';

export const log = (x, depth = null) => console.log(util.inspect(x, {depth, colors:true, maxArrayLength: null}));

export const sep = (title) => {
  console.log(
    `\n-------------------------------- ${title.toUpperCase()} --------------------------------\n`
  );
};
