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
			.skip(QueryPagination(args.page, args.limit))
			.limit(QueryLimiter(args.limit))
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	searchJobs: async (args: any) => {
		if (ObjectId.isValid(args.query)) {
			return await Job.find({ _id: new ObjectId(args.query) })
				.skip(QueryPagination(args.page, args.limit))

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
		Job.countDocuments({})
			.then((data) => {
				console.log("count:", data);
				return sendResponse(data);
			})
			.catch((error) => sendError(error)),

	countAssignedJobs: (args: any) =>
		Job.countDocuments({ assigned: args.user })
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

			.skip(QueryPagination(args.page, args.limit))

			.limit(QueryLimiter(args.limit))
			.then((data) => sendResponse(data))
			.catch((error) => sendError(error)),

	updateJob: async (args: any, ctx: AppContext) => {
		const updatedJob = {
			labourHours: parseInt(args.labourHours),
			modified: new Date(),
			lastModifiedBy: ctx.decoded.sub,
			...args,
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

	addJob: (args: any, ctx: AppContext) => {
		console.log(args);

		const newjob = new Job({
			labourHours: parseInt(args.labourHours),
			modified: new Date(),
			created: new Date(),
			createdBy: ctx.decoded.sub,
			lastModifiedBy: ctx.decoded.sub,
			...args,
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
