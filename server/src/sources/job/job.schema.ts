import {
	addMockFunctionsToSchema,
	makeExecutableSchema,
} from "apollo-server-express";
import { jobType, jobQuery, jobMutation, jobSubscription } from "./schema";

const jobSchema = makeExecutableSchema({
	typeDefs: [jobType, jobQuery, jobMutation, jobSubscription],
});
addMockFunctionsToSchema({ schema: jobSchema });

export default jobSchema;
