import Part from "./part.model";
import { sendError, sendResponse } from "../../utils/responseHandlers";

const partController = {
	parts: async (args: any) => {
		console.log(args);
		let limit = args.limit || 25;
		const query = new RegExp(args.query, "i");
		if (limit > 100) limit = 100;

		if (query) {
			return Part.find({
				$and: [{ $or: [{ partName: query }, { partNumber: query }] }],
			})
				.limit(limit)
				.then((data) => sendResponse(data))
				.catch((err) => sendError(err));
		} else {
			return Part.find()
				.limit(50)
				.then((data) => sendResponse(data));
		}
	},
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
