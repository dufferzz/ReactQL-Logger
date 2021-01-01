import mongoose from "mongoose";
const Schema = mongoose.Schema;
//TODO: Come back and add more specific requirements

const CategoriesSchema = new Schema(
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
		category: {
			type: String,
			required: false,
		},
		subCategories: {
			type: Array,
			required: false,
		},
		fullDescription: {
			type: String,
			required: false,
		},
		topBanner: {
			type: String,
			required: false,
		},
	},
	{
		collection: "categories",
	}
);

const categories = mongoose.connection.useDb("diaproff");
// console.log(categories)
const Categories = categories.model("Category", CategoriesSchema);
// console.log(Categories)
export default Categories;
