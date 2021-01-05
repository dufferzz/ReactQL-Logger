import Job from "./job.model";

const jobController = {
	jobs: () => Job.find({}).sort({ created: -1 }),
	getJob: (args) => Job.findById(args._id),
	getAssignedJobs: (args) => Job.find({ assigned: args.user }),
	updateJob: (args) =>
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
		),

	deleteJob: (args) => Job.deleteOne({ _id: args._id }),

	addJob: (args) => {
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
		return newjob.save();
	},
};

export default jobController;
