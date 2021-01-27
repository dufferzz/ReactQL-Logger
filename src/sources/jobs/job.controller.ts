import Job from "./job.model";

import { sendError, sendResponse } from "../../utils/responseHandlers";

const jobController = {
	jobs: () =>
		Job.find()
			.sort({ created: -1 })
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

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
					firstname: args.firstname,
					lastname: args.lastname,
					email: args.email,
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
			firstname: args.firstname,
			lastname: args.lastname,
			email: args.email,
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
			// images: args.images,
			labourHours: parseInt(args.labourHours),
			// jobNumber: args.jobNumber,
		});
		return newjob
			.save()
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error));
	},
};

export default jobController;
