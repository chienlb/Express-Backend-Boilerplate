const pagination = (page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = page;
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const skip = (currentPage - 1) * limit;
  return { totalPages, currentPage, hasNextPage, hasPreviousPage, skip };
};

export default pagination;
