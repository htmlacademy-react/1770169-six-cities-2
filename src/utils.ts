const trimRoutPath = (path: string): string | void => path.split('/', 2).at(-1);

export {trimRoutPath};
