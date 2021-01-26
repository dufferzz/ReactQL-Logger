import Part from "./part.model";
import { sendError, sendResponse } from "../../utils/responseHandlers";

const partController = {
	parts: async (args) => {
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
	getPart: async (args) => {
		return await Part.findById(args._id)
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},
	updatePart: async (args) =>
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

	deletePart: async (args) =>
		await Part.deleteOne({ _id: args._id })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	addPart: async (args) => {
		console.log(args);
		const newjob = new Part({
			partName: args.partName,
			partNumber: args.partNumber,
			price: args.partPrice,
		});
		return await newjob
			.save()
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},
};

export default partController;
