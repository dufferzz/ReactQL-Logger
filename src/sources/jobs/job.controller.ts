import Job from "./job.model";

import { sendError, sendResponse } from "../../utils/responseHandlers";
import { ObjectId } from "mongodb";

const jobController = {
	jobs: () =>
		Job.find()
			.sort({ created: -1 })
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	searchJobs: async (args: any) => {
		console.log(args);
		let limit = args.limit || 25;
		const query = args.query;
		if (limit > 100) limit = 100;

		if (ObjectId.isValid(query)) {
			return await Job.find({ _id: new ObjectId(query) })
				.limit(limit)
				.then((data) => sendResponse(data))
				.catch((err) => sendError(err));
		} else {
			const query = new RegExp(args.query, "i");

			return await Job.find({
				$and: [
					{
						$or: [{ customername: query }],
					},
				],
			})
				.limit(limit)
				.then((data) => sendResponse(data))
				.catch((err) => sendError(err));
		}
	},
	getJob: (args: any) =>
		Job.findById(args._id)
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	getAssignedJobs: (args: any) =>
		Job.find({ assigned: args.user })
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	updateJob: async (args: any) =>
		Job.findOneAndUpdate(
			{
				_id: args._id,
			},
			{
				$set: {
					customername: args.customername,
					email: args.email,
					address1: args.address1,
					address2: args.address2,
					city: args.city,
					district: args.district,
					parts: args.parts,
					postcode: args.postcode,
					done: args.done,
					todo: args.todo,
					date: args.date,
					status: args.status,
					model: args.model,
					make: args.make,
					year: args.year,
					serial: args.serial,
					assigned: args.assigned,
					labourHours: args.labourHours,
					modified: new Date(),
				},
			}
		)
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	deleteJob: (args: any) =>
		Job.deleteOne({ _id: args._id })
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	addJob: (args: any) => {
		console.log(args);
		const newjob = new Job({
			customername: args.customername,
			email: args.email,
			address1: args.address1,
			address2: args.address2,
			city: args.city,
			district: args.district,
			postcode: args.postcode,
			date: args.date,
			todo: args.todo,
			done: args.done,
			modified: new Date(),
			created: new Date(),
			status: args.status,
			model: args.model,
			make: args.make,
			year: args.year,
			serial: args.serial,
			assigned: args.assigned,
			parts: args.parts,
			labourHours: parseInt(args.labourHours),
			// images: args.images,
		});
		return newjob
			.save()
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error));
	},
};

export default jobController;
