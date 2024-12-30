export const generateWildcardSearch = (searchTerm: string) => {
  if (!searchTerm) {
    return "";
  }

  return `%${searchTerm}%`;
};
