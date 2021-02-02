import QueryLimiter from "./queryLimiter";

const QueryPagination = (page: string, limit: number | string) => {
	return Number(page) * QueryLimiter(Number(limit));
};

export default QueryPagination;
