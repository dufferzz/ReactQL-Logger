const QueryLimiter = (reqLimit?: number) => {
	const QueryLimit = 50;
	const DefaultQuerySize = 25;

	if (!reqLimit) return DefaultQuerySize;
	let limit = reqLimit || DefaultQuerySize;
	if (limit > QueryLimit) limit = QueryLimit;
	return Number(limit);
};

export default QueryLimiter;
