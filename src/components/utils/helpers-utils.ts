const toCapitalize = (word: string): string => {
  const lower = word.toLowerCase();

  return lower[0].toUpperCase() + lower.slice(1);
};

export {toCapitalize};
