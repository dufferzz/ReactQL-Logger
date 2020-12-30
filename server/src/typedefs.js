const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Date

	type Query {
		products: [Product]
		categories: [Category]
		jobs: [Job]
		getJob(_id: String!): Job
		orders: [Order]
	}

	type Product {
		title: String
		supplier: String
		price: Int
		image: String
		description: String
		quickDescription: String
		salePrice: Int
		sku: String
		onSale: Boolean
	}

	type Category {
		title: String
		image: String
		description: String
		fullDescription: String
	}

	type Order {
		OrderID: ID
		Customerid: String
		employeeid: String
		invoiceno: String
		orderdate: String
		deliverydate: String
		info: String
		deliveryname: String
		deliveryaddress1: String
		deliveryaddress2: String
		shippingmethodid: String
	}

	type Job {
		_id: String!
		firstname: String
		lastname: String
		email: String
		city: String
		district: String
		postcode: String
		date: String
		todo: String
		done: String
		status: String
		created: Date
	}

	type Mutation {
		addProduct(title: String!): Product
		updateProduct(title: String!): Product
		deleteProduct(_id: String!): Product

		addJob(
			firstname: String
			lastname: String
			email: String
			city: String
			district: String
			postcode: String
			date: String
			todo: String
			done: String
			status: String
		): Job
		updateJob(
			firstname: String
			lastname: String
			email: String
			city: String
			district: String
			postcode: String
			date: String
			todo: String
			done: String
			status: String
		): Job
		deleteJob(_id: String): Job
	}

	type Subscription {
		addProduct: Product!
		updateProduct: Product!
		deleteProduct: Product!
		addJob: Job!
		updateJob: Job!
		deleteJob: Job!
	}
`;

module.exports = typeDefs;
