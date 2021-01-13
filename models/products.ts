import mongoose from "mongoose";
const Schema = mongoose.Schema;
//TODO: Come back and add more specific requirements

const ProductsSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		quickDescription: {
			type: String,
			required: false,
		},
		category: {
			type: String,
			required: true,
		},
		subCategorys: {
			type: Array,
			required: false,
		},
		salePrice: {
			type: Number,
			required: false,
		},
		supplier: {
			type: String,
			required: false,
		},
		sku: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
		},
		onSale: {
			type: Boolean,
			required: false,
			default: false,
		},
		specs: {
			type: Array,
			required: false,
		},
		reviews: {
			type: Array,
			required: false,
		},
		video: {
			type: String,
			required: false,
		},
		images: {
			type: Array,
			required: false,
		},
		stripeID: {
			type: String,
			required: false,
		},
		stripePriceID: {
			type: String,
			required: false,
		},
		stripeSKUID: {
			type: String,
			required: false,
		},
	},
	{
		collection: "products",
	}
);

const products = mongoose.connection.useDb("diaproff");
const Products = products.model("Products", ProductsSchema);
export default Products;
