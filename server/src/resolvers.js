const Products = require("../models/products");
const Categories = require("../models/categories");
const { Orders } = require("../models/orders");
const Jobs = require("../models/job");
const NEW_PRODUCT = "NEW_PRODUCT";
const NEW_JOB = "NEW_JOB";

const { date } = require("./scalars");

const resolvers = {
	Date: date,

	Subscription: {
		addProduct: {
			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_PRODUCT),
		},
	},

	Query: {
		products: async () => await Products.find(),
		categories: async () => await Categories.find(),
		jobs: async () => await Jobs.find(),
		getJob: async (_, { _id }, __, _x) => await Jobs.findById(_id),
		orders: async () => await Orders.find(),
	},

	Mutation: {
		addProduct: async (_, { title }, { isAuthenticated, pubsub }) => {
			if (!isAuthenticated) {
				return "";
			}
			const newprod = {
				title,
			};
			pubsub.publish(NEW_PRODUCT, {
				addProduct: newprod,
			});
			return { title: title };
		},
		addJob: async (
			_,
			{
				firstname,
				lastname,
				email,
				city,
				district,
				postcode,
				date,
				todo,
				done,
				status,
			},
			{ isAuthenticated, pubsub }
		) => {
			if (!isAuthenticated) {
				return "";
			}
			const newjob = {
				firstname,
			};
			pubsub.publish(NEW_JOB, {
				addJob: newjob,
			});
			return { firstname: firstname };
		},
	},
};

module.exports = resolvers;
