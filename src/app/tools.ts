export function getSortingDataAccessor() {
  return (item: any, property: any) => {
    if (property.includes('.')) { // @ts-ignore
      return property.split('.').reduce((o, i) => o[i], item)
    }
    // @ts-ignore
    return item[property];
  };
}
