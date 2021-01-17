import Part from "./part.model";
const partController = {
	parts: async (args) => {
		console.log(args);
		let limit = args.limit || 25;
		const query = new RegExp(args.query, "i");
		if (limit > 100) limit = 100;
		if (query)
			return await Part.find({
				$and: [{ $or: [{ partName: query }, { partNumber: query }] }],
			}).limit(limit);

		return await Part.find().limit(50);
	},
	getPart: async (args) => {
		return await Part.findById(args._id);
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
		),

	deletePart: async (args) => await Part.deleteOne({ _id: args._id }),

	addPart: async (args) => {
		console.log(args);
		const newjob = new Part({
			partName: args.partName,
			partNumber: args.partNumber,
			price: args.partPrice,
		});
		return await newjob.save();
	},
};

export default partController;
