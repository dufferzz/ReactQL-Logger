import { gql } from "@apollo/client";

const ADD_PART_MUTATION = gql`
	query AddPart(
		$partName: String!
		$partNumber: String!
		$price: String!
		$Location: String!
		$description: String!
		$SKU: String!
		$supplier: String!
		$thumbnail: String!
	) {
		addPart(
			partName: $partName
			partNumber: $partNumber
			price: $price
			Location: $Location
			description: $description
			SKU: $SKU
			supplier: $supplier
			thumbnail: $string
		) {
			success
			error
			data {
				_id
				partName
				partNumber
				price
				Location
				description
				SKU
				supplier
				thumbnail
			}
		}
	}
`;
export default ADD_PART_MUTATION;
