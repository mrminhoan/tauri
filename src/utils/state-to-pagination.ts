export function mapperStateToPagiation({ limit = 10, skip = 0 }) {
  // return `limit=${limit}&skip=${skip}`;
  return {
    limit,
    skip,
  };
}
