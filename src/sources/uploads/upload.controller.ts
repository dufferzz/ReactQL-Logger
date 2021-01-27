import Upload from "./upload.model";
const uploadController = {
	uploads: async (args: any) => {
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
	getUpload: async (args: any) => {
		return await Upload.findById(args._id);
	},
	updateUpload: async (args: any) =>
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

	deleteUpload: async (args: any) => await Upload.deleteOne({ _id: args._id }),

	addUpload: async (args: any) => {
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
