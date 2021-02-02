import Job from "./job.model";

import { sendError, sendResponse } from "../../utils/responseHandlers";
import { ObjectId } from "mongodb";

import JobFormValidator from "./job.validator";

import QueryLimiter from "../../utils/queryLimiter";
import QueryPagination from "../../utils/queryPagination";

const jobController = {
	jobs: (args: any) =>
		Job.find()
			.sort({ created: -1 })
			.skip(QueryPagination(args.limit, args.page))
			.limit(QueryLimiter(args.limit))
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	searchJobs: async (args: any) => {
		if (ObjectId.isValid(args.query)) {
			return await Job.find({ _id: new ObjectId(args.query) })
				.skip(QueryPagination(args.limit, args.page))

				.limit(QueryLimiter(args.limit))
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
				.limit(QueryLimiter(args.limit))
				.then((data) => sendResponse(data))
				.catch((err) => sendError(err));
		}
	},
	countJobs: (args: any) =>
		Job.count({})
			.then((data) => {
				console.log("count:", data);
				return sendResponse(data);
			})
			.catch((error) => sendError(error)),

	countAssignedJobs: (args: any) =>
		Job.count({ assigned: args.user })
			.then((data) => {
				console.log("count:", data);
				return sendResponse(data);
			})
			.catch((error) => sendError(error)),

	getJob: (args: any) =>
		Job.findById(args._id)
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	getAssignedJobs: (args: any) =>
		Job.find({ assigned: args.user })
			.sort({ created: -1 })

			.skip(QueryPagination(args.limit, args.page))

			.limit(QueryLimiter(args.limit))
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	updateJob: async (args: any) => {
		const updatedJob = {
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
			labourHours: parseInt(args.labourHours),
			modified: new Date(),
		};

		return JobFormValidator.isValid(updatedJob)
			.then((isValid) => {
				if (isValid) {
					return Job.findOneAndUpdate(
						{
							_id: args._id,
						},
						{
							$set: updatedJob,
						}
					)
						.then((data) => sendResponse(data))
						.catch((error) => sendError(error));
				} else {
					return sendError("Server: Form Validation Failed");
				}
			})
			.catch((error) => {
				return sendError(error);
			});
	},

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

		return JobFormValidator.isValid(newjob)
			.then((isValid) => {
				console.log(isValid);
				if (isValid) {
					return newjob
						.save()
						.then((data) => sendResponse(data))
						.catch((error) => sendError(error));
				} else {
					return sendError("Server: Form Validation Failed");
				}
			})
			.catch((error) => {
				return sendError(error);
			});
	},
};

export default jobController;
