export const constructTableData = (page, size, data) => {
  const offset = page * size;
  const limit = size;
  const items = [...data].slice(offset, offset + limit);

  return {
    items,
    count: data.length,
  };
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};
