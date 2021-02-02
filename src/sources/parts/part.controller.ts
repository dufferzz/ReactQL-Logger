import Part from "./part.model";
import { sendError, sendResponse } from "../../utils/responseHandlers";
import QueryLimiter from "../../utils/queryLimiter";
import QueryPagination from "../../utils/queryPagination";

const partController = {
	parts: async (args: any) => {
		console.log(args);
		const query = new RegExp(args.query, "i");

		if (query) {
			return Part.find({
				$and: [{ $or: [{ partName: query }, { partNumber: query }] }],
			})
				.skip(QueryPagination(args.limit, args.page))
				.limit(QueryLimiter(args.limit))

				.then((data) => sendResponse(data))
				.catch((err) => sendError(err));
		} else {
			return Part.find()
				.limit(QueryLimiter(args.limit))

				.then((data) => sendResponse(data));
		}
	},
	countParts: (args: any) =>
		Part.count({})
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	getPart: async (args: any) => {
		return await Part.findById(args._id)
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},
	updatePart: async (args: any) =>
		await Part.findOneAndUpdate(
			{
				_id: args._id,
			},
			{
				$set: {
					partName: args.partName,
					partNumber: args.partNumber,
					price: args.partPrice,
				},
			}
		)
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	deletePart: async (args: any) =>
		await Part.deleteOne({ _id: args._id })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	addPart: async (args: any, ctx: AppContext) => {
		console.log(args);
		const newjob = new Part({
			partName: args.partName,
			partNumber: args.partNumber,
			price: args.price,
			Location: args.location,
			SKU: args.sku,
			supplier: args.supplier,
			modified: new Date(),
			dateAdded: new Date(),
			addedBy: ctx.decoded.sub,
		});
		return await newjob
			.save()
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},
};

export default partController;
