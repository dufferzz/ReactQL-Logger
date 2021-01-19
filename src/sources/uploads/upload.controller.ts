import Upload from "./upload.model";
const uploadController = {
	uploads: async (args) => {
		return await Upload.find()
			.limit(50)
			.then((data) => {
				console.log(data);
				return {
					success: true,
					data: data,
					error: "none",
				};
			})
			.catch((error) => {
				return {
					success: false,
					data: null,
					error: `${JSON.stringify(error)}`,
				};
			});
	},
	getUpload: async (args) => {
		return await Upload.findById(args._id);
	},
	updateUpload: async (args) =>
		await Upload.findOneAndUpdate(
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

	deleteUpload: async (args) => await Upload.deleteOne({ _id: args._id }),

	addUpload: async (args) => {
		console.log(args);

		const newUpload = new Upload({
			title: args.title,
		});

		return newUpload
			.save()
			.then((data) => {
				console.log(data);
				return {
					success: true,
					data: data,
					error: "none",
				};
			})
			.catch((error) => {
				return {
					success: false,
					data: null,
					error: `${JSON.stringify(error)}`,
				};
			});
	},
};

export default uploadController;
