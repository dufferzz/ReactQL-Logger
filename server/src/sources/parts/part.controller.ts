import Part from "./part.model";

const partController = {
	parts: async () => await Part.find({}).limit(100),
	getPart: async (args) => await Part.findById(args._id),
	updatePart: async (args) =>
		await Part.findOneAndUpdate(
			{
				_id: args._id,
			},
			{
				$set: {
					partName: args.partName,
					partNumber: args.partNumber,
					partPrice: args.partPrice,
				},
			}
		),

	deletePart: async (args) => await Part.deleteOne({ _id: args._id }),

	addPart: async (args) => {
		console.log(args);
		const newjob = new Part({
			partName: args.partName,
			partNumber: args.partNumber,
			partPrice: args.partPrice,
		});
		return await newjob.save();
	},
};

export default partController;
