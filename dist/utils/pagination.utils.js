"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination = (page, limit, total) => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = page;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    const skip = (currentPage - 1) * limit;
    return { totalPages, currentPage, hasNextPage, hasPreviousPage, skip };
};
exports.default = pagination;
//# sourceMappingURL=pagination.utils.js.map