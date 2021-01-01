const { jobResolver } = require("./sources/job");

// const Products = require("../models/products");
// const Categories = require("../models/categories");
// const { Orders } = require("../models/orders");
// const Jobs = require("../models/job");

// const NEW_JOB = "NEW_JOB";
// const UPDATE_JOB = "UPDATE_JOB";
// const DELETE_JOB = "DELETE_JOB";

// const NEW_PRODUCT = "NEW_PRODUCT";
// const UPDATE_PRODUCT = "UPDATE_PRODUCT";
// const DELETE_PRODUCT = "DELETE_PRODUCT";

// const { date } = require("./scalars");

// const resolvers = {
// 	Date: date,

// 	Subscription: {
// 		addProduct: {
// 			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_PRODUCT),
// 		},
// 		updateProduct: {
// 			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(UPDATE_PRODUCT),
// 		},
// 		deleteProduct: {
// 			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(DELETE_PRODUCT),
// 		},
// 		addJob: {
// 			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_JOB),
// 		},
// 		updateJob: {
// 			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(UPDATE_JOB),
// 		},
// 		deleteJob: {
// 			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(DELETE_JOB),
// 		},
// 	},

// 	Query: {
// 		products: async () => await Products.find(),
// 		categories: async () => await Categories.find(),
// 		jobs: async () => await Jobs.find(),
// 		getJob: async (_, { _id }, __, _x) => await Jobs.findById(_id),
// 		orders: async () => await Orders.find(),
// 	},

// 	Mutation: {
// 		addProduct: async (_, args, { isAuthenticated, pubsub }) => {
// 			if (!isAuthenticated) return "";
// 			console.log(args);
// 			pubsub.publish(NEW_PRODUCT, {
// 				addProduct: args,
// 			});
// 			return args;
// 		},
// 		updateProduct: async (_, args, { isAuthenticated, pubsub }) => {
// 			if (!isAuthenticated) return "";
// 			console.log(args);
// 			pubsub.publish(UPDATE_PRODUCT, {
// 				updateProduct: args,
// 			});
// 			return args;
// 		},
// 		deleteProduct: async (_, args, { isAuthenticated, pubsub }) => {
// 			if (!isAuthenticated) return "";
// 			console.log(args);
// 			pubsub.publish(DELETE_PRODUCT, {
// 				deleteProduct: args,
// 			});
// 			return args;
// 		},
// 		// ======
// 		addJob: async (_, args, { isAuthenticated, pubsub }) => {
// 			if (!isAuthenticated) return "";
// 			pubsub.publish(NEW_JOB, {
// 				addJob: args,
// 			});
// 			return args;
// 		},
// 		updateJob: async (_, args, { isAuthenticated, pubsub }) => {
// 			if (!isAuthenticated) return "";
// 			pubsub.publish(UPDATE_JOB, {
// 				updateJob: args,
// 			});
// 			return args;
// 		},
// 		deleteJob: async (_, args, { isAuthenticated, pubsub }) => {
// 			if (!isAuthenticated) return "";
// 			pubsub.publish(DELETE_JOB, {
// 				deleteJob: args,
// 			});
// 			return args;
// 		},
// 	},
// };

// module.exports = resolvers;

const resolvers = [jobResolver, jobResolver];

module.exports = resolvers;
